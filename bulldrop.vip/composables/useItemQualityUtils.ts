import type { PlatformName } from "~/types";

type ThemeItemType = {
  worth: number;
  className: string;
};

type ThemeType = {
  [K in PlatformName]: {
    [key: string]: ThemeItemType;
  };
};

export const ThemeSkinOptions: ThemeType = {
  standoff: {
    d09232: {
      worth: 6,
      className: "gold",
    },
    "98171b": {
      worth: 5,
      className: "red",
    },
    "9d177a": {
      worth: 4,
      className: "pink",
    },
    "67099f": {
      worth: 3,
      className: "violet",
    },
    "0f3580": {
      worth: 2,
      className: "blue",
    },
    "126695": {
      worth: 1,
      className: "light-blue",
    },
    "5c676b": {
      worth: 0,
      className: "grey",
    },
  },
  roblox: {
    ffc430: {
      worth: 5,
      className: "gold",
    },
    ff3358: {
      worth: 4,
      className: "red",
    },
    ed65fc: {
      worth: 3,
      className: "pink",
    },
    a869ff: {
      worth: 2,
      className: "violet",
    },
    "6ec0ff": {
      worth: 1,
      className: "blue",
    },
    aaaaaa: {
      worth: 0,
      className: "grey",
    },
  },
  pubg: {
    ffc259: {
      worth: 6,
      className: "gold",
    },
    e52a5b: {
      worth: 5,
      className: "red",
    },
    d766ed: {
      worth: 4,
      className: "pink",
    },
    "8a5ce5": {
      worth: 3,
      className: "violet",
    },
    "667fff": {
      worth: 2,
      className: "blue",
    },
    "56bf8f": {
      worth: 1,
      className: "green",
    },
    aaaaaa: {
      worth: 0,
      className: "grey",
    },
  },
  bgmi: {
    ffc259: {
      worth: 6,
      className: "gold",
    },
    e52a5b: {
      worth: 5,
      className: "red",
    },
    d766ed: {
      worth: 4,
      className: "pink",
    },
    "8a5ce5": {
      worth: 3,
      className: "violet",
    },
    "667fff": {
      worth: 2,
      className: "blue",
    },
    "56bf8f": {
      worth: 1,
      className: "green",
    },
    aaaaaa: {
      worth: 0,
      className: "grey",
    },
  },
  genshin: {
    e9ae3c: {
      worth: 4,
      className: "gold",
    },
    c67ae5: {
      worth: 3,
      className: "violet",
    },
    "46ace3": {
      worth: 2,
      className: "blue",
    },
    "56bf8f": {
      worth: 1,
      className: "green",
    },
    "84868c": {
      worth: 0,
      className: "grey",
    },
  },
  cs2: {
    ffc259: {
      worth: 6,
      className: "gold",
    },
    fe3852: {
      worth: 5,
      className: "red",
    },
    d64bf3: {
      worth: 4,
      className: "pink",
    },
    "9059ff": {
      worth: 3,
      className: "violet",
    },
    "4867ff": {
      worth: 2,
      className: "blue",
    },
    "71aeec": {
      worth: 1,
      className: "light-blue",
    },
    aaa: {
      worth: 0,
      className: "grey",
    },
  },
};

export const useItemQualityUtils = (manualPlatform?: PlatformName) => ({
  getItemQualityClass(qualitycolor: string) {
    const platform = manualPlatform || usePlatform().code;
    if (platform) {
      const themeData = ThemeSkinOptions[platform][qualitycolor];
      if (themeData) {
        return themeData.className;
      }
    }

    return "grey";
  },
  getItemWorth(qualitycolor: string) {
    const platform = usePlatform();
    if (platform) {
      const themeData = ThemeSkinOptions[platform.code][qualitycolor];
      if (themeData) return themeData.worth;
    }
    return 0;
  },
});
