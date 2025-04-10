<template>
  <IconChevronDown
    :class="$style['close-tabbar']"
    @click="coreStore.hideMenuHeader"
  />
</template>

<script setup lang="ts">
const coreStore = useCoreStore();
</script>

<style lang="scss" module>
.close-button {
  @include safe-area-header;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 10px;
  border: none;
  outline: none;
  background-color: transparent;

  svg {
    width: 25px;
    height: 25px;
    fill: var(--general-white);
  }
}

.close-tabbar {
  @include safe-area-header;
  cursor: pointer;
  position: absolute;
  top: 24px;
  right: 24px;
  border: none;
  outline: none;
  background-color: transparent;
  width: 32px;
  height: 32px;
  padding: 5px;
  fill: var(--general-white);
  z-index: 1;

  &:hover {
    border-radius: 10px;
    background: var(--bdrop-chat-button-hover);
  }

  &:active {
    border-radius: 10px;
    background: var(--bdrop-chat-button-active);
  }
}
</style>
