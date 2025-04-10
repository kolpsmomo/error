<template>
  <div :class="$style['ribbon-placeholder']">
    <slot />
  </div>
</template>

<style lang="scss" module>
.ribbon-placeholder {
  height: 132px;
}
</style>
