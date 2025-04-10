<template>
  <div :class="$style.time_circle">
    <svg
      viewBox="0 0 150 150"
      :class="$style.white_scale"
      :style="{ 'stroke-dashoffset': strokeDashoffset }"
    >
      <circle
        cx="75"
        cy="75"
        r="60"
      />
    </svg>
    <svg
      viewBox="0 0 150 150"
      :class="$style.translucent_scale"
    >
      <circle
        cx="75"
        cy="75"
        r="60"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  value: {
    type: Number,
    required: false,
  },
});

const strokeDasharray = ref(376.8);
const strokeDashoffset = computed(
  () => strokeDasharray.value - strokeDasharray.value * props.value,
);
</script>

<style lang="scss" module>
.time_circle {
  position: absolute;
  right: 10px;
  top: 16px;
  z-index: 1;
  width: 16px;
  height: 16px;
}

.white_scale,
.translucent_scale {
  position: absolute;
  width: 100%;
  height: 100%;
  stroke-width: 15px;
  stroke-linecap: round;
  stroke-dasharray: v-bind(strokeDasharray);
  fill: transparent;
  transition: 0.25s;
  transform: rotate(-90deg);
}

.white_scale {
  stroke: var(--general-white);
}

.translucent_scale {
  stroke: rgba($color: $white-1, $alpha: 0.25);
  stroke-dashoffset: 0;
}
</style>
