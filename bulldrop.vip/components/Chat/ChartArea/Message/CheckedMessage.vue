<template>
  <div :class="$style['checked-wrapper']">
    <IconChecked :class="$style.checked" />
  </div>
</template>

<style lang="scss" module>
.checked-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .checked {
    fill: var(--button-accident-default);
    width: 8px;
    height: 8px;
    position: absolute;
    left: 6px;
  }
}
</style>
