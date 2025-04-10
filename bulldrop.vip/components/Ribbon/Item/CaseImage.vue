<template>
  <img
    :data-src="src"
    :data-srcset="srcset"
    :class="$style['case-image']"
    class="lazyload"
    @dragstart.prevent
  />
</template>

<script setup>
const props = defineProps({
  src: {
    src: String,
    required: false,
    default: "",
  },
});

const { src } = toRefs(props);
const coreStore = useCoreStore();
const srcset = computed(
  () => `${coreStore.cdn}/width=250,quality=90,format=auto/${props.src}`,
);
</script>

<style lang="scss" module>
.case-image {
  position: absolute;
  left: 50%;
  top: 50%;
  max-width: 65%;
  max-height: 65%;
  opacity: 0;
  transform: translate(-50%, -50%);
  transition: 0.25s;
}
</style>
