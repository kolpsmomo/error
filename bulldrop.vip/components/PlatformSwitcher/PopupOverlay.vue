<template>
  <Overlay
    :class="$style.overlay"
    @click.self="coreStore.hidePlatfromSwitcher"
  >
    <slot />
  </Overlay>
</template>

<script setup lang="ts">
import Overlay from "./Overlay.vue";
const coreStore = useCoreStore();
</script>

<style module>
.overlay {
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
