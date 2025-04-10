<template>
  <IconInfo :class="$style.info" />
</template>

<style lang="scss" module>
.info {
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 6px;
  fill: var(--general-white);
  border-radius: 0.75rem;

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
