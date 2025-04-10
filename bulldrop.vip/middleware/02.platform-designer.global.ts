import type { PlatformName } from "~/types";
import { useAppColor } from "~/composables/app/useAppColor";

export default defineNuxtRouteMiddleware(() => {
  const platform = usePlatform();
  useAppColor({ mainColor: platform.mainColor });
  if (isServer()) {
    useHead({
      bodyAttrs: {
        class: platform.className,
      },
    });
  } else {
    if (document.body.classList.contains(platform.className)) return;
    for (const platformName in platform.ALL_PLATFORMS_DATA) {
      const platfromData =
        platform.ALL_PLATFORMS_DATA[platformName as PlatformName];
      if (document.body.classList.contains(platfromData.className)) {
        document.body.classList.remove(platfromData.className);
      }
    }
    document.body.classList.add(platform.className);
  }
});
