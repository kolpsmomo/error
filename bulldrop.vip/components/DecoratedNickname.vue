<template>
  <div :class="$style[props.value || '']">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string | null | undefined;
}>();
</script>

<style lang="scss" module>
.bubble_gum {
  color: $bubble_gum !important;
}

.sun_beams {
  color: $sun_beams !important;
}

.heaven_blue {
  color: $heaven_blue !important;
}

.lavender {
  color: $lavender !important;
}

.coral_reef {
  color: $coral_reef !important;
}

.olive_green {
  color: $olive_green !important;
}

.topaz {
  color: $topaz !important;
}

.admin {
  color: $admin !important;
}

.pacific_gradient,
.club_gradient,
.morning_gradient,
.highest_standard {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.pacific_gradient {
  background-image: $pacific_gradient;
}

.club_gradient {
  background-image: $club_gradient;
}

.morning_gradient {
  background-image: $morning_gradient;
}

.highest_standard {
  background-image: $highest_standard;
  background-size: $highest_standard_bg_size_x $highest_standard_bg_size_y;
  animation: highest-standard-animation 100s linear infinite;
}

@keyframes highest-standard-animation {
  0% {
    background-position: $highest_standard_bg_from 0;
  }
  100% {
    background-position: $highest_standard_bg_to 0;
  }
}
</style>
