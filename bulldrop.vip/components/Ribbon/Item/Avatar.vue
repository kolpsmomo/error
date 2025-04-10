<template>
  <div
    :class="$style.avatar"
    :style="{ backgroundImage: `url(${props.src})` }"
  />
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{ src?: string }>(), { src: "" });
</script>

<style lang="scss" module>
.avatar {
  display: none;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  border-radius: 4px;
  background-color: rgba(191, 191, 255, 0.25);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
