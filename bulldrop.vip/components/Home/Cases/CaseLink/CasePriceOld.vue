<template>
  <span
    :class="$style['case__price-old']"
    data-role="case-price-old"
  >
    <slot />
  </span>
</template>

<style lang="scss" module>
@import "~/styles/mixins/line_through_with_icon.scss";

.case__price-old {
  display: flex;
  align-items: center;
  height: 100%;
  color: var(--general-white);
  opacity: 0.2;
  margin-left: 2px;
  @include line_through_with_icon(var(--general-white));
}
</style>
