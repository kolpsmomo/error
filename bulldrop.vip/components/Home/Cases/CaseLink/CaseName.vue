<template>
  <div :class="$style['case__name']">
    <slot />
  </div>
</template>

<style lang="scss" module>
.case__name {
  width: 100%;
  color: var(--general-white);
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: -0.16px;

  @media screen and (max-width: 425px) {
    font-size: 0.75rem;
    letter-spacing: -0.12px;
  }
}
</style>
