<template>
  <div :class="$style.caption">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" module>
.caption {
  color: var(--payments-payment-secondary-color);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;

  @media screen and (max-width: 475px) {
    font-size: 12px;
  }
}
</style>
