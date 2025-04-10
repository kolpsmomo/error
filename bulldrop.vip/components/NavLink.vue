<template>
  <NuxtLink
    :to="path"
    no-prefetch
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { normalize } from "~/utils/url/normalize";

type Props = {
  to: string;
  considerPlatform?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  considerPlatform: true,
});

const path = computed(() => {
  if (!props.considerPlatform) return normalize(`/${props.to}`);
  const platform = usePlatform();
  const currentPlatformCode = platform
    ? platform.is.default
      ? ""
      : platform.title === "BGMI"
        ? "bgmi"
        : platform.code
    : "";
  const allPlatformsCodes = Object.keys(
    platform ? platform.ALL_PLATFORMS_DATA : {},
  );
  const isSpecial = allPlatformsCodes.some((platformCode) =>
    props.to.match(new RegExp(`^((/\\w{2,3})?/${platformCode})(/.*)?`)),
  );
  if (isSpecial) {
    return normalize(`/${props.to}`);
  } else {
    return normalize(`/${currentPlatformCode}/${props.to}`);
  }
});
</script>
