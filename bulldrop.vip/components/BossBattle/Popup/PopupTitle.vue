<template>
  <div :class="[$style['popup-title'], $style[decorationClass]]">
    <slot />
  </div>
</template>

<script setup lang="ts">
const decorationClass = computed<string>(() => {
  if (
    isClient() &&
    CSS.supports("-webkit-background-clip", "text") &&
    CSS.supports("-webkit-text-fill-color", "transparent")
  ) {
    return "gradient-title";
  } else {
    return "gradient-title-fallback";
  }
});
</script>

<style lang="scss" module>
.popup-title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 40px;
  word-break: break-word;

  @media screen and (max-width: 475px) {
    font-size: 1.5rem;
    line-height: 28px;
  }
}

.gradient-title {
  background: linear-gradient(135deg, #5cfaed 0%, #45a9e1 69%, #2c72ee 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-title-fallback {
  color: #6779d7;
}
</style>
