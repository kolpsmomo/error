<template>
  <h2 :class="$style['general-name']">
    <slot />
  </h2>
</template>

<style lang="scss" module>
.general-name {
  margin: 0;
  color: var(--general-white);
  font-size: 40px;
  font-weight: 700;
  letter-spacing: -0.4px;

  @media screen and (max-width: $tablet-case-filter) {
    font-size: 32px;
    letter-spacing: -0.32px;
  }

  @media screen and (max-width: $mobile-case-filter) {
    font-size: 22px;
    letter-spacing: -0.22px;
  }
}
</style>
