<template>
  <div :class="$style['pc-and-tablet']">
    <slot />
  </div>
</template>

<style lang="scss" module>
.pc-and-tablet {
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 800px) {
    display: none;
  }
}
</style>
