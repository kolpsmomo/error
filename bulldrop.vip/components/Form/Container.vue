<template>
  <div :class="$style['form-wrapper']">
    <div
      :class="$style['form-container']"
      @click.self="emits('hide-form')"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: "hide-form"): void;
}>();
</script>

<style lang="scss" module>
.form-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1200;
  width: 100%;
  background-color: rgba(15, 15, 21, 0.33);
  backdrop-filter: blur(19px);
  overflow: auto;

  @media screen and (max-width: 500px) {
    height: 100dvh;
  }
}

.form-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
</style>
