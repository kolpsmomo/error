<template>
  <div :class="$style.title">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" module>
// Заголовок слайда
.title {
  position: relative;
  z-index: 1;
  font-size: 32px;
  font-weight: 700 !important;
  line-height: 45px;
  text-transform: uppercase;
  color: var(--general-white);
}
</style>
