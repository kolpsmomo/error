import type { PlatformName, PlatformData } from "~/types";
import type { RouteParamValue } from "vue-router";

export const usePlatformStore = defineStore("platformStore", () => {
  const DEFAULT_LANGUAGE = "ru";
  const DEFAULT_PLATFORM: PlatformName = "standoff";
  const ALL_PLATFORMS_DATA = {
    standoff: {
      title: "Standoff 2",
      code: "standoff",
      className: "bdrop-theme-standoff",
      img: "standoff",
      tg: "https://t.me/bulldron",
      cypherTapTg: "https://t.me/cyphertap",
      mainColor: "#1C193D",
      basePath: "/",
    },
    cs2: {
      title: "CS2",
      code: "cs2",
      className: "bdrop-theme-cs2",
      img: "cs2",
      tg: "https://t.me/bulldrop_cs2",
      cypherTapTg: "https://t.me/cyphertap",
      mainColor: "#0A0A0A",
      basePath: "/cs2",
    },
    pubg: {
      title: "PUBGM",
      code: "pubg",
      className: "bdrop-theme-pubg",
      img: "pubg",
      tg: "https://t.me/bulldrop_pubg",
      cypherTapTg: "https://t.me/cyphertap",
      mainColor: "#1A1B1F",
      basePath: "/pubg",
    },
    bgmi: {
      title: "BGMI",
      code: "pubg",
      className: "bdrop-theme-pubg",
      img: "pubg",
      tg: "https://t.me/bulldrop_bgmi",
      insta:
        "https://www.instagram.com/bulldrop.india?igsh=cHJzZ3UxMHV3MnZs&utm_source=qr",
      cypherTapTg: "https://t.me/cyphertap",
      mainColor: "#1A1B1F",
      basePath: "/bgmi",
    },
    roblox: {
      title: "Roblox",
      code: "roblox",
      className: "bdrop-theme-roblox",
      img: "roblox",
      tg: "https://t.me/bulldroproblox",
      cypherTapTg: "https://t.me/cyphertap",
      mainColor: "#1A1B1F",
      basePath: "/roblox",
    },
    genshin: {
      title: "Genshin Impact",
      code: "genshin",
      className: "bdrop-theme-genshinImpact",
      img: "genshin",
      tg: "https://t.me/bulldrop_genshin",
      cypherTapTg: "https://t.me/cyphertap",
      mainColor: "#1f2733",
      basePath: "/genshin",
    },
  } as const satisfies Record<PlatformName, PlatformData>;
  const currentPlatform = ref<PlatformName>(DEFAULT_PLATFORM);

  const changePlatform = (to: PlatformName) => {
    const route = useRoute();
    navigateTo({
      params: { platform: to },
      query: route.query,
      hash: route.hash,
    });
  };

  const getActiveness = (name: PlatformName) => {
    const activeness: Record<PlatformName, boolean> = {
      standoff: false,
      genshin: false,
      pubg: false,
      bgmi: false,
      roblox: false,
      cs2: false,
    };
    activeness[name] = true;
    return activeness;
  };

  const aggregatedPlatformData = computed(() => ({
    ...ALL_PLATFORMS_DATA[currentPlatform.value],
    is: {
      ...getActiveness(currentPlatform.value),
      default: currentPlatform.value === DEFAULT_PLATFORM,
    },
    ALL_PLATFORMS_DATA,
    DEFAULT_PLATFORM,
    change: changePlatform,
  }));

  const isPlatformValid = (name: string): name is PlatformName =>
    name in ALL_PLATFORMS_DATA;
  const isPlatformUrlParamValid = (
    param: RouteParamValue | RouteParamValue[],
  ) => {
    if (typeof param === "undefined") return true;
    if (typeof param === "string")
      return isPlatformValid(param) || param === "";
    return false;
  };

  const getPlatformData = (platform: string) => {
    if (!isPlatformValid(platform)) return null;
    return ALL_PLATFORMS_DATA[platform as PlatformName] as PlatformData;
  };

  return {
    DEFAULT_LANGUAGE,
    DEFAULT_PLATFORM,
    ALL_PLATFORMS_DATA,
    aggregatedPlatformData,
    currentPlatform,
    changePlatform,
    isPlatformValid,
    isPlatformUrlParamValid,
    getPlatformData,
  };
});
