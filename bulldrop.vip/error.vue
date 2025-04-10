<template>
  <div :class="$style['page-error']">
    <IconBigLogo :class="$style.logo" />
    <div :class="$style.code">{{ error?.statusCode }}</div>
    <div :class="$style.message">
      {{
        error?.statusCode === 404 ? t("page404.text") : t("errors.any_other")
      }}
    </div>
    <nuxt-link
      :to="platformBase"
      :class="$style['home-link']"
    >
      {{ t("errors.back_to_home") }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
import type { PlatformName } from "~/types";
import { useAppColor } from "~/composables/app/useAppColor";

const { locale, t, defaultLocale } = useI18n();
const userStore = useUserStore();
const props = defineProps({
  error: Object as () => NuxtError,
});
const platformStore = usePlatformStore();
const { error } = toRefs(props);

useSeoMeta({
  title: `Bulldrop ${error && error.value ? "| " + error.value.statusCode : ""}`,
  description: "",
  keywords: "",
  ogTitle: "",
  ogDescription: "",
});

const getPlatformFromUrl = (url: string): PlatformName => {
  const platform = Object.keys(platformStore.ALL_PLATFORMS_DATA).find(
    (platform) => {
      if (url.includes(platform)) {
        return true;
      }
    },
  );

  if (platform) {
    return platform as PlatformName;
  }

  return platformStore.DEFAULT_PLATFORM;
};

const route = useRoute();
const platformName = getPlatformFromUrl(route.path);

const platformBase = computed(() => {
  const langSuffix = locale.value === defaultLocale ? "" : locale.value;
  if (platformName === platformStore.DEFAULT_PLATFORM) {
    return `/${langSuffix}`;
  } else {
    return `/${langSuffix}/${platformName}`;
  }
});

const setStyles = () => {
  const errorVal = useError().value;

  if (errorVal) {
    if (platformName) {
      const platform = platformStore.ALL_PLATFORMS_DATA[platformName];

      useAppColor({ mainColor: platform.mainColor });
      if (isServer()) {
        useHead({
          bodyAttrs: {
            class: platform.className,
          },
        });
      } else {
        if (document.body.classList.contains(platform.className)) return;
        for (const platformName in platformStore.ALL_PLATFORMS_DATA) {
          const platfromData =
            platformStore.ALL_PLATFORMS_DATA[platformName as PlatformName];
          if (document.body.classList.contains(platfromData.className)) {
            document.body.classList.remove(platfromData.className);
          }
        }
        document.body.classList.add(platform.className);
      }
    }
  }
};

await userStore.handleVisit();
setStyles();
</script>

<style lang="scss" module>
.page-error {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
}

.logo {
  fill: var(--general-red);
  @media screen and (max-width: 600px) {
    transform: scale(0.8);
  }
}

.code,
.message {
  line-height: 1;
  text-align: center;
  color: var(--general-transparent-mid-55);
}

.code {
  font-size: 10rem;

  @media screen and (max-width: 600px) {
    font-size: 5rem;
  }
}

.message {
  font-size: 1.25rem;

  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
}

.home-link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin-top: 48px;
  padding: 0px 12px;
  border-radius: 16px;
  background: var(--button-functional-default);
  color: var(--general-white);
  font-size: 18px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.18px;
  transition: 0.25s;
  &:hover {
    background: var(--button-functional-hover);
  }
  &:active {
    background: var(--button-functional-active);
  }
  @media screen and (max-width: 600px) {
    margin-top: 32px;
    font-size: 14px;
  }
}
</style>
