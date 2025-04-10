<template>
  <div :class="$style['main-message']">
    <slot />
  </div>
</template>

<style lang="scss" module>
.main-message {
  margin-bottom: 2rem;
  font-size: 1.125rem;
  line-height: 20px;
  letter-spacing: -0.18px;

  @media screen and (max-width: 475px) {
    font-size: 0.875rem;
  }
}
</style>
