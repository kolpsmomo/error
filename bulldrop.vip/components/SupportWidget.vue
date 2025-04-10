<template>
  <button
    :class="$style['support-widget']"
    data-test="supportWidget"
    data-target="sipport-widget"
    @click="userStore.openSupport()"
  >
    <IconSupport />
  </button>
</template>

<script setup lang="ts">
const userStore = useUserStore();
</script>

<style lang="scss" module>
.support-widget {
  cursor: pointer;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 40px;
  bottom: 4px;
  width: 60px;
  height: 60px;
  border: 0.6px solid var(--general-stroke);
  background-color: var(--general-underlay-1-lvl);
  border-radius: 20px;
  z-index: 100;
  @media screen and (max-width: 800px) {
    right: 12px;
    width: 48px;
    height: 48px;
    border-radius: 16px;
    svg {
      width: 18px;
    }
  }
}
</style>
