import { withoutTrailingSlash } from "ufo";
import {
  Configuration,
  ResponseError,
  type RequestContext,
  type ResponseContext,
  type ErrorContext,
} from "~/api_gen/runtime";
import type { TokenPair } from "~/api_gen/models";
import { Api } from "~/api_gen/apis";
import { UserApi } from "~/api_gen/apis/UserApi";
import { isServer } from "~/utils/isServer";
import { getRefresh } from "~/utils/tokens/getRefresh";
import { getAccess } from "~/utils/tokens/getAccess";
import { setTokens } from "~/utils/tokens/setTokens";
import { pause } from "~/utils/pause";

export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp();
  const coreStore = useCoreStore();

  class ApiGenManager extends Api {
    protected mutex: Promise<void> | undefined = undefined;
    protected tokenPair: TokenPair | undefined = undefined;
    protected timeouts: Record<string, ReturnType<typeof setTimeout>> = {};
    protected ABORT_TIME_MS = 30000;
    protected retries: Record<string, number> = {};
    protected MAX_RETRY_NUMBER = 2;

    protected override getConfig() {
      const basePath = this.getBasePath();
      const accessToken = this.getAccessToken.bind(this);
      const headers = this.getDefaultHeaders();
      const credentials = "include";
      const middleware = [
        {
          pre: this.handlePlatformChange.bind(this),
        },
        {
          pre: this.handleAbortController.bind(this),
        },
        {
          post: this.handleUserCountryHeader.bind(this),
        },
        {
          post: this.handleAbortControllerCleanUp.bind(this),
        },
        {
          post: this.handle401ResponseStatus.bind(this),
        },
        {
          post: this.handleNoAccessResponse.bind(this),
        },
        {
          post: this.handleRetryAttempt.bind(this),
        },
        {
          onError: this.handleFetchError.bind(this),
        },
      ];
      return new Configuration({
        basePath,
        accessToken,
        headers,
        credentials,
        middleware,
      });
    }

    protected getAccessToken() {
      if (isServer()) {
        return (
          this.tokenPair?.access ||
          nuxtApp.runWithContext(() => getAccess() || "")
        );
      } else {
        return nuxtApp.runWithContext(() => getAccess() || "");
      }
    }

    protected getRefreshToken() {
      if (isServer()) {
        return (
          this.tokenPair?.refresh ||
          nuxtApp.runWithContext(() => getRefresh() || "")
        );
      } else {
        return nuxtApp.runWithContext(() => getRefresh() || "");
      }
    }

    protected setTokenPair(tokenPair: TokenPair) {
      this.tokenPair = tokenPair;
    }

    protected getBasePath() {
      const runtimeConfig = useRuntimeConfig();
      if (isServer()) {
        const { serverApiBase } = runtimeConfig.public;
        if (serverApiBase) {
          return withoutTrailingSlash(serverApiBase);
        } else {
          console.warn("API_GEN: serverApiBase is not defined");
          return "http://localhost";
        }
      } else {
        const { clientApiBase } = runtimeConfig.public;
        if (clientApiBase) {
          return withoutTrailingSlash(clientApiBase);
        } else {
          return withoutTrailingSlash(window.location.origin);
        }
      }
    }

    protected getDefaultHeaders() {
      let headers: Record<string, string> = {
        "X-Platform":
          useCookie("platform").value ||
          useRoute().params.platform.toString() ||
          usePlatformStore().DEFAULT_PLATFORM,
      };
      if (isServer()) {
        headers = Object.assign(headers, useRequestHeaders());
        if (!headers["X-Forwarded-For"] && !headers["x-forwarded-for"]) {
          const ip = useRequestEvent()?.node.req.socket.remoteAddress;
          if (ip) headers["X-Forwarded-For"] = ip;
        }
        if (headers["accept"]) {
          delete headers["accept"];
        } else if (headers["Accept"]) {
          delete headers["Accept"];
        }
        if (headers["content-type"]) {
          delete headers["content-type"];
        } else if (headers["Content-Type"]) {
          delete headers["Content-Type"];
        }
        if (headers["accept-encoding"]) {
          delete headers["accept-encoding"];
        } else if (headers["Accept-Encoding"]) {
          delete headers["Accept-Encoding"];
        }
        if (
          process.env.CF_ACCESS_CLIENT_ID &&
          process.env.CF_ACCESS_CLIENT_SECRET
        ) {
          headers["CF-Access-Client-Id"] = process.env.CF_ACCESS_CLIENT_ID;
          headers["CF-Access-Client-Secret"] =
            process.env.CF_ACCESS_CLIENT_SECRET;
        }
      }
      return headers;
    }

    protected async handlePlatformChange({ url, init }: RequestContext) {
      const { code } = usePlatform();
      if (
        this.configuration.headers &&
        this.configuration.headers["X-Platform"] !== code
      ) {
        this.configuration.headers["X-Platform"] = code;
      }

      if (
        init.headers &&
        "X-Platform" in init.headers &&
        init.headers["X-Platform"] !== code
      ) {
        const newInit = this.updateInitHeader("X-Platform", code, init);
        return {
          url,
          init: newInit,
        };
      }
    }

    protected async handleAbortController({ url, init }: RequestContext) {
      if (!isServer()) {
        this.removeTimeoutData(url);

        const abortController = new AbortController();
        const signal = abortController.signal;
        const newInit = Object.assign({ signal }, init);

        this.timeouts[url] = setTimeout(() => {
          abortController.abort(
            `The duration of the request exceeded ${this.ABORT_TIME_MS} ms`,
          );
        }, this.ABORT_TIME_MS);

        return {
          url,
          init: newInit,
        };
      }
    }

    protected async handleAbortControllerCleanUp({
      url,
      response,
    }: ResponseContext) {
      this.removeTimeoutData(url);
      return Promise.resolve(response);
    }

    protected removeTimeoutData(url: string) {
      if (this.timeouts[url]) {
        clearTimeout(this.timeouts[url]);
        delete this.timeouts[url];
      }
    }

    protected async handle401ResponseStatus({
      fetch,
      url,
      init,
      response,
    }: ResponseContext) {
      const refresh = await this.getRefreshToken();
      if (response && response.status === 401 && refresh) {
        if (!this.mutex) {
          this.mutex = this.tryToRefreshTokens(refresh, init);
        }
        try {
          await this.mutex;
        } catch (error) {
          return response;
        } finally {
          this.mutex = undefined;
        }
        try {
          const access = this.getAccessToken();
          if (!access)
            throw new Error(
              "There is no access token available to handle 401 status code",
            );
          const newInit = this.updateInitHeader(
            "Authorization",
            `Bearer ${access}`,
            init,
          );
          return await fetch(url, newInit);
        } catch (error) {
          return response;
        }
      } else {
        return response;
      }
    }

    protected async handleNoAccessResponse({ response }: ResponseContext) {
      if (response) {
        try {
          const json = await response.clone().json();
          if (
            "code" in json &&
            "detail" in json &&
            json.code === "no_access" &&
            typeof json.detail === "string"
          ) {
            this.handleNoAccess(json.detail);
          }
        } catch (error) {
          // 201, 204 коды ответа... в данном случае ответа нет
        }
      }
      return Promise.resolve(response);
    }

    protected async handleRetryAttempt({
      fetch,
      url,
      init,
      response,
    }: ResponseContext) {
      if (response.status === 503 && init.method?.toUpperCase() === "GET") {
        const curRetry = this.retries[url] || 0;
        if (curRetry < this.MAX_RETRY_NUMBER) {
          this.retries[url] = curRetry + 1;
          await pause(curRetry * 1000 + 1000);
          return await fetch(url, init);
        } else {
          delete this.retries[url];
        }
      }
      return Promise.resolve(response);
    }

    protected handleFetchError({ url, response, init }: ErrorContext) {
      if (this.timeouts[url] && init.signal?.aborted) {
        this.removeTimeoutData(url);
        const altResponse = new Response(JSON.stringify({}), {
          status: 408,
          statusText: "[Client] Request Timeout",
        });
        return Promise.resolve(altResponse);
      } else if (response === undefined) {
        const altResponse = new Response(JSON.stringify({}), {
          status: 503,
          statusText: "[Client] Service Unavailable",
        });
        return Promise.resolve(altResponse);
      } else {
        return Promise.resolve(response);
      }
    }

    protected handleNoAccess(reason: string = "No access") {
      const userStore = useUserStore();
      userStore.logout();
      if (reason && !isServer()) {
        const notify = useNotify();
        notify({
          type: "error",
          text: reason,
        });
      }
    }

    protected updateInitHeader(
      header: string,
      value: string,
      init: RequestInit,
    ): RequestInit {
      const newInit = Object.assign({}, init);
      if (!newInit.headers) {
        throw new Error('There is no "headers" field in "init" object');
      }
      if (newInit.headers instanceof Headers) {
        newInit.headers.append(header, value);
      } else if (Array.isArray(newInit.headers)) {
        newInit.headers.push([header, value]);
      } else {
        newInit.headers[header] = value;
      }
      return newInit;
    }

    protected async tryToRefreshTokens(refresh: string, init: RequestInit) {
      let lastError;
      const userApiConfig = new Configuration({
        basePath: this.configuration.basePath,
      });
      const userApiInitOverrides = {
        credentials: this.configuration.credentials,
        headers: this.formRefreshRequestHeaders(init.headers),
      };
      const tokenRefreshArg = {
        tokenRefreshRequest: {
          refresh,
        },
      };
      const userApi = new UserApi(userApiConfig);
      for (let i = 0; i < 5; i++) {
        try {
          const { access, refresh } = await userApi.tokenRefresh(
            tokenRefreshArg,
            userApiInitOverrides,
          );
          this.setTokenPair({ access, refresh });
          setTokens({ access, refresh });
          return;
        } catch (error: any) {
          lastError = error;
          if (error instanceof ResponseError && error.response.status === 400) {
            this.handleNoAccess();
            break;
          }
        }
      }
      throw lastError;
    }

    protected headersToObjectLiteral(headers?: HeadersInit) {
      if (!headers) {
        return {};
      }
      const result: Record<string, string> = {};
      if (headers instanceof Headers) {
        for (const [header, value] of headers.entries()) {
          result[header] = value;
        }
        return result;
      } else if (Array.isArray(headers)) {
        for (let i = 0; i < headers.length; i++) {
          const [header, value] = headers[i];
          result[header] = value;
        }
        return result;
      } else {
        return headers;
      }
    }

    protected formRefreshRequestHeaders(headers?: HeadersInit) {
      const result = this.headersToObjectLiteral(headers);
      const jsonMime = "application/json";
      if (!result["content-type"] && !result["Content-Type"]) {
        result["content-type"] = jsonMime;
      } else if (
        "content-type" in result &&
        result["content-type"] !== jsonMime
      ) {
        result["content-type"] = jsonMime;
      } else if (
        "Content-Type" in result &&
        result["Content-Type"] !== jsonMime
      ) {
        result["Content-Type"] = jsonMime;
      }
      if (!result["accept"] && !result["Accept"]) {
        result["accept"] = "*/*";
      }
      if ("Authorization" in result) {
        delete result["Authorization"];
      } else if ("authorization" in result) {
        delete result["authorization"];
      }
      return result;
    }

    protected async handleUserCountryHeader({ response }: ResponseContext) {
      if (response && !coreStore.userCountry) {
        coreStore.userCountry = response.headers.get("X-User-Country");
        // coreStore.userCountry = "IN";
      }
    }
  }

  return {
    provide: {
      apiGenManager: new ApiGenManager(),
    },
  };
});
