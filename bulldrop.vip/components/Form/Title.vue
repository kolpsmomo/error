<template>
  <h3 :class="$style.title">
    <slot />
  </h3>
</template>

<style lang="scss" module>
.title {
  margin: 0;
  font-size: 24px;
  text-align: left;
  letter-spacing: -0.01em;
  line-height: 28px;
}
</style>
