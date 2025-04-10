<template>
  <div :class="$style.wrapper">
    <button
      :class="$style.button"
      data-test="switch_platform_button"
      @click="isShown = !isShown"
    >
      {{ platform.title }}
      <IconBars :class="[$style.arrow, isShown && $style['arrow--up']]" />
    </button>
    <transition name="theme">
      <PlatformItems
        v-show="isShown"
        :class="$style.themes"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import PlatformItems from "./PlatformItems.vue";

const isShown = ref(false);
const platform = computed(() => usePlatform());

watch(
  () => platform.value.code,
  () => (isShown.value = false),
);
</script>

<style>
.theme-enter-from,
.theme-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
.theme-enter-active,
.theme-leave-active {
  transition: 0.25s;
}
</style>

<style module lang="scss">
.wrapper {
  margin-right: 28px;
  position: relative;

  @media screen and (max-width: 475px) {
    margin-left: -10px;
    margin-right: 16px;
    position: static;
  }
}
.button {
  transition: background 0.25s linear;
  font-weight: 500;
  white-space: nowrap;
  background: var(--button-tonal-default);
  border: 0;
  color: var(--general-white);
  border-radius: 10px;
  white-space: nowrap;
  position: relative;
  padding-right: 35px;
  height: 40px;
  padding: 0 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 35px;

  @media screen and (max-width: 475px) {
    font-size: 14px;
    width: 106px;
    height: 32px;
  }

  @media (hover: hover) {
    &:hover {
      background: var(--button-tonal-hover);
    }
  }
}

.arrow {
  fill: var(--general-white);
  margin-left: 11px;
  transition: transform 0.2s linear;
  position: absolute;
  right: 16px;
  width: 12px;
  top: 16px;

  @media screen and (max-width: 475px) {
    top: 12px;
  }

  &--up {
    transform: rotate(180deg);
  }
}

.themes {
  box-shadow: 2px 4px 10px rgba(19, 17, 41, 0.3);
  position: absolute;
  margin-top: 12px;
  padding: 8px;
  background: var(--general-transparent-dark-75);
  z-index: 2;

  @media screen and (max-width: 1200px) {
    padding: 10px;
  }

  @media screen and (max-width: 475px) {
    $offset: 10%;
    width: calc(100% - $offset);
    left: calc($offset/(-2));
    margin: 0 $offset;
    top: 68px;
  }
}
</style>
