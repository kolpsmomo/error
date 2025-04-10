import type { PlatformName } from "~/types";

export default defineNuxtRouteMiddleware((to, from) => {
  const cookie = useMonthCookie("platform");
  const platformStore = usePlatformStore();
  const coreStore = useCoreStore();

  if (!platformStore.isPlatformUrlParamValid(to.params.platform)) {
    return showError({
      statusCode: 404,
    });
  }

  if (!to.params.platform && !cookie.value) coreStore.showPlatformSwitcher();

  platformStore.currentPlatform = (() => {
    if (to.params.platform) return to.params.platform as PlatformName;
    if (cookie.value && platformStore.isPlatformValid(cookie.value))
      return cookie.value;
    return platformStore.DEFAULT_PLATFORM;
  })();

  // Выставляет значение платформы в куку, при явном переходе на новую платформу
  cookie.value = platformStore.currentPlatform;

  // Нужно для того, чтобы платформа не терялась при редиректах через navigateTo.
  // Данная мидлварь подменяет урл в ссылках
  if (!to.params.platform && from.params.platform) {
    return navigateTo({
      params: { platform: from.params.platform },
      query: to.query,
      hash: to.hash,
      name: to.name,
    });
  }
});
