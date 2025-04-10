<template>
  <div
    :class="$style['cases-block']"
    data-test="cases-block"
  >
    <slot />
  </div>
</template>

<style lang="scss" module>
.cases-block {
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media screen and (max-width: $tablet-case-filter) {
    gap: 24px;
  }
}
</style>
