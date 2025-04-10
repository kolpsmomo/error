<template>
  <img
    :data-src="props.src"
    :data-srcset="srcset"
    :class="$style.image"
    class="lazyload"
    @dragstart.prevent
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string;
}>();
const coreStore = useCoreStore();
const srcset = computed(
  () => `${coreStore.cdn}/width=250,quality=90,format=auto/${props.src}`,
);
</script>

<style lang="scss" module>
.image {
  position: absolute;
  left: 50%;
  top: 50%;
  max-width: 65%;
  transform: translate(-50%, -56%);
}
</style>
