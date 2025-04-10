import { getAccess } from "~/utils/tokens/getAccess";
import { isClient } from "~/utils/isClient";

export const useWebsocket = (path: string): WebSocket => {
  const config = useRuntimeConfig();
  const apiBase = config.public.clientApiBase || window.location.origin;
  const platform = usePlatform().code;
  const proto = apiBase.startsWith("https") ? "wss:" : "ws:";
  const { hostname, port } = new URL(apiBase);
  const token = `Bearer ${isClient() ? getAccess() : ""}`;
  const lang = useCookie("django_language").value || "";
  const url = `${proto}//${hostname}:${port}${path}?token=${token}&platform=${platform}&lang=${lang}`;
  return new WebSocket(url);
};
