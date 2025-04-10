<template>
  <div :class="$style['nickname-block']">
    <slot />
  </div>
</template>

<style lang="scss" module>
.nickname-block {
  position: absolute;
  left: 12px;
  top: 12px;
  z-index: 1;
  display: flex;
  align-items: center;
  color: var(--general-transparent-light-35);
  transition: 0.25s;
}
</style>
