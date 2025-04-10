import { v4 as uuidv4 } from "uuid";
import { type IConfig, UnleashClient } from "@unleash/proxy-client-vue";
import { joinURL } from "ufo";
import { useYearCookie } from "~/utils/cookie";
import { isServer } from "~/utils/isServer";

export default defineNuxtPlugin(() => {
  class UnleashManager {
    protected unleashClient: UnleashClient;
    protected appName = "bulldrop";
    protected clientKey = "bulldrop-unleash-proxy";
    protected proxyPath = "proxy";
    protected refreshInterval = 15;
    protected disableMetrics = true;
    protected userIdCookieName = "unleash:userId";
    protected sessionIdCookieName = "unleash:sessionId";

    constructor() {
      this.unleashClient = new UnleashClient(this.getConfig());
    }

    protected getConfig(): IConfig {
      return {
        context: this.getContext(),
        appName: this.appName,
        clientKey: this.clientKey,
        url: this.getUrl(),
        refreshInterval: this.refreshInterval,
        disableMetrics: this.disableMetrics,
        disableRefresh: this.getDisableRefresh(),
        fetch: this.getFetch(),
      };
    }

    protected getContext() {
      const userIdCookie = useYearCookie(this.userIdCookieName).value;
      const sessionIdCookie = useYearCookie(this.sessionIdCookieName).value;

      if (userIdCookie && sessionIdCookie) {
        return {
          userId: userIdCookie,
          sessionId: sessionIdCookie,
        };
      } else if (userIdCookie) {
        return {
          userId: userIdCookie,
          sessionId: undefined,
        };
      } else if (sessionIdCookie) {
        return {
          userId: undefined,
          sessionId: sessionIdCookie,
        };
      } else {
        return {
          userId: undefined,
          sessionId: this.getSessionId(),
        };
      }
    }

    getSessionId() {
      const sessionIdCookie = useYearCookie(this.sessionIdCookieName).value;
      if (sessionIdCookie) {
        return sessionIdCookie;
      } else {
        const rndValue = uuidv4();
        useYearCookie(this.sessionIdCookieName).value = rndValue;
        return rndValue;
      }
    }

    getUserId() {
      return useYearCookie(this.userIdCookieName).value;
    }

    protected getUrl() {
      const runtimeConfig = useRuntimeConfig();
      const unleashProxyBase = isServer()
        ? runtimeConfig.public.unleashProxyBase
        : runtimeConfig.public.clientApiBase || window.location.origin;

      if (!unleashProxyBase) {
        console.warn("[Unleash] unleashProxyBase is not defined");
        return `http:localhost/${this.proxyPath}`;
      }

      return joinURL(unleashProxyBase, this.proxyPath);
    }

    protected getDisableRefresh() {
      // return isServer() ? true : false;
      return true;
    }

    protected getFetch() {
      const extraHeaders: Record<string, string> = {};

      if (isServer()) {
        const CF_ACCESS_CLIENT_ID = process.env.CF_ACCESS_CLIENT_ID;
        const CF_ACCESS_CLIENT_SECRET = process.env.CF_ACCESS_CLIENT_SECRET;

        if (CF_ACCESS_CLIENT_ID && CF_ACCESS_CLIENT_SECRET) {
          extraHeaders["CF-Access-Client-Id"] = CF_ACCESS_CLIENT_ID;
          extraHeaders["CF-Access-Client-Secret"] = CF_ACCESS_CLIENT_SECRET;
        }
      }

      return (url: string) =>
        fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            authorization: this.clientKey,
            accept: "application/json",
            "content-type": "application/json",
            ...extraHeaders,
          },
        });
    }

    useUnleashClient() {
      return this.unleashClient;
    }

    useUserId(userId: string) {
      const sessionId = this.getSessionId();
      useYearCookie(this.userIdCookieName).value = userId;
      this.unleashClient.updateContext({ userId, sessionId });
    }

    useSessionId() {
      const sessionId = this.getSessionId();
      useYearCookie(this.userIdCookieName).value = null;
      this.unleashClient.updateContext({ sessionId, userId: undefined });
    }
  }

  return {
    provide: {
      unleashManager: new UnleashManager(),
    },
  };
});
