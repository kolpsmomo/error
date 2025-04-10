<template>
  <div :class="[$style.wear]">
    {{ wearShort }}
  </div>
</template>

<script setup lang="ts">
// import type { WearEnum } from "~/types";

const props = defineProps<{
  wear: any;
}>();

const { wear } = toRefs(props);

const wearShort = computed(() => {
  const breakpoint = /-|\s/;
  const [first, second] = wear.value.split(breakpoint);

  if (first && second) {
    return `${first[0]}${second[0]}`;
  }

  return "";
});
</script>
<style lang="scss" module>
.wear {
  color: var(--general-grey);
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.14px;

  @media screen and (max-width: 834px) {
    font-size: 12px;
    line-height: 14px;
    letter-spacing: -0.12px;
  }

  @media screen and (max-width: 375px) {
    font-size: 10px;
    line-height: 12px;
    letter-spacing: -0.1px;
  }
}
</style>
