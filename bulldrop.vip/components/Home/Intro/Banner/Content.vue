<template>
  <div :class="$style.text">
    <p><slot></slot></p>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" module>
// Текст слайда
.text {
  position: relative;
  z-index: 1;
  margin-top: 16px;
  max-width: 539px;

  p {
    font-style: normal;
    line-height: 24px;
    font-size: 1.5rem;
    @media screen and (max-width: 1440px) {
      font-size: 1.125rem;
    }
    @media screen and (max-width: 475px) {
      font-size: 1rem;
    }
  }
}
</style>
