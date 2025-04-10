<template>
  <span :class="$style['case__price-discount']">
    <slot />
  </span>
</template>

<style lang="scss" module>
.case__price-discount {
  color: var(--bdrop-price);
}
</style>
