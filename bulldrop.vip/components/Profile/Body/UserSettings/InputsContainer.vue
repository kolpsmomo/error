<template>
  <div :class="$style['inputs-container']">
    <slot />
  </div>
</template>

<script setup></script>

<style lang="scss" module>
.inputs-container {
  flex: 1;
}
</style>
