<template>
  <div
    ref="containerRef"
    :class="$style['side-panel']"
  >
    <GameLinks />
  </div>
</template>

<script setup lang="ts">
import GameLinks from "./GameLinks.vue";

const containerRef = ref<HTMLElement | null>(null);
</script>

<style lang="scss" module>
.side-panel {
  position: fixed;
  bottom: 5px;
  left: 50%;
  z-index: 50;
  transform: translateX(-50%);

  @media screen and (max-width: 1024px) {
    display: none;
  }
}
</style>
