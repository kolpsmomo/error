<template>
  <button
    :class="$style['volume-button']"
    @click="core.toggleAudio"
  >
    <IconVolume
      v-if="core.audioIsRequired"
      style="transform: translateY(1px)"
    />
    <IconVolumeOff
      v-else
      style="transform: translateY(2px)"
    />
  </button>
</template>

<script setup lang="ts">
const core = useCoreStore();
</script>

<style lang="scss" module>
.volume-button {
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30x;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  margin-right: 12px;

  svg {
    width: 18px;
    fill: var(--general-grey);
    transform: 0.25s;
  }
}
</style>
