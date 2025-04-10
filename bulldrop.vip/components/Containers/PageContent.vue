<template>
  <div :class="$style['page-content']">
    <slot />
  </div>
</template>

<style lang="scss" module>
.page-content {
  min-height: 100vh;
}
</style>
