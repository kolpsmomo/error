<template>
  <IconChevronDown :class="$style.close" />
</template>

<style lang="scss" module>
.close {
  width: 32px;
  height: 32px;
  padding: 5px;

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
