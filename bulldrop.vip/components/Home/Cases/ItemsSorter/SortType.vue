<template>
  <span
    :class="[$style['sorter-type'], isOpen && $style['sorter-type--active']]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
}>();

const { isOpen } = toRefs(props);
</script>

<style lang="scss" module>
.sorter-type {
  position: relative;
  color: var(--general-grey);
  transition: all 0.25s ease-in-out;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.16px;

  &--active {
    color: var(--general-white);
  }

  @media screen and (max-width: $tablet-case-filter) {
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.16px;
  }

  @media screen and (max-width: $mobile-case-filter) {
    font-size: 14px;
    line-height: 16px;
    letter-spacing: -0.14px;
  }
}
</style>
