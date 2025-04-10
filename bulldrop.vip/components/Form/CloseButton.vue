<template>
  <button :class="$style['close-button']">
    <IconClose />
  </button>
</template>

<style lang="scss" module>
.close-button {
  cursor: pointer;
  position: absolute;
  right: 32px;
  top: 26px;
  width: 25px;
  height: 25px;
  padding: 0;
  background-color: transparent;
  outline: none;
  border: none;

  svg {
    display: block;
    width: 100%;
    height: 100%;
    fill: var(--general-white);
  }
}
</style>
