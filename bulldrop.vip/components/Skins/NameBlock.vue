<template>
  <div :class="$style['name-block']">
    <slot />
  </div>
</template>

<style lang="scss" module>
.name-block {
  z-index: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: flex-start;
  @media screen and (max-width: 475px) {
    width: 80%;
  }
}
</style>
