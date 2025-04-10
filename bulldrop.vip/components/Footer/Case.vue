<template>
  <div :key="platform.code">
    <div :class="$style.scene">
      <img
        :class="$style.case"
        :data-src="srcs.case"
        class="lazyload"
      />
      <img
        :class="[$style.case, $style['case-light']]"
        :data-src="srcs.caseLight"
        class="lazyload"
      />
      <img
        :class="$style.platform"
        :data-src="srcs.platform"
        class="lazyload"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import standoffCasePic from "~/assets/footer/standoff2/case.png";
import standoffCaseLightPic from "~/assets/footer/standoff2/case_light.png";
import standoffPlatformPic from "~/assets/footer/standoff2/platform.png";
import genshinCasePic from "~/assets/footer/genshin/case.png";
import genshinCaseLightPic from "~/assets/footer/genshin/case_light.png";
import genshinPlatformPic from "~/assets/footer/genshin/platform.png";
import pubgCasePic from "~/assets/footer/pubg/case.png";
import pubgCaseLightPic from "~/assets/footer/pubg/case_light.png";
import pubgPlatformPic from "~/assets/footer/pubg/platform.png";
import robloxCasePic from "~/assets/footer/roblox/case.png";
import robloxCaseLightPic from "~/assets/footer/roblox/case_light.png";
import robloxPlatformPic from "~/assets/footer/roblox/platform.png";
import cs2CasePic from "~/assets/footer/cs2/case.png";
import cs2CaseLightPic from "~/assets/footer/cs2/case_light.png";
import cs2PlatformPic from "~/assets/footer/cs2/platform.png";

const platform = computed(() => usePlatform());
const ALL_PLATFORMS_DATA = platform.value.ALL_PLATFORMS_DATA;

const urls = {
  [ALL_PLATFORMS_DATA.standoff.code]: {
    case: standoffCasePic,
    caseLight: standoffCaseLightPic,
    platform: standoffPlatformPic,
  },
  [ALL_PLATFORMS_DATA.genshin.code]: {
    case: genshinCasePic,
    caseLight: genshinCaseLightPic,
    platform: genshinPlatformPic,
  },
  [ALL_PLATFORMS_DATA.pubg.code]: {
    case: pubgCasePic,
    caseLight: pubgCaseLightPic,
    platform: pubgPlatformPic,
  },
  [ALL_PLATFORMS_DATA.roblox.code]: {
    case: robloxCasePic,
    caseLight: robloxCaseLightPic,
    platform: robloxPlatformPic,
  },
  [ALL_PLATFORMS_DATA.cs2.code]: {
    case: cs2CasePic,
    caseLight: cs2CaseLightPic,
    platform: cs2PlatformPic,
  },
};

const srcs = computed(() => {
  const code = platform.value.code;
  return urls[code];
});
</script>

<style lang="scss" module>
.scene {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 47%;
  z-index: 5;
}

.case {
  width: 53%;
  position: absolute;
  animation: float 5s infinite ease-in-out;
  top: 10%;
  &-light {
    animation:
      float 5s infinite ease-in-out,
      light 5s infinite ease-in-out;
  }
}

.platform {
  position: absolute;
  width: 100%;
  bottom: 0;
}

@keyframes float {
  0% {
    transform: translateY(7px);
  }
  25% {
    transform: translateY(-7px) rotate(-1deg);
  }
  50% {
    transform: translateY(7px);
  }
  75% {
    transform: translateY(-7px) rotate(1deg);
  }
  100% {
    transform: translateY(7px);
  }
}

@keyframes light {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
