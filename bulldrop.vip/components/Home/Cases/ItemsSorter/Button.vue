<template>
  <div :class="$style['sorter-button']">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" module>
.sorter-button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
</style>
