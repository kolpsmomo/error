<template>
  <div :class="$style['case__status']">
    <div
      v-if="props.opened && props.maxOpeners"
      :class="[
        $style['case__status-item'],
        $style['case__status-item--opened'],
      ]"
    >
      <IconClock :class="$style['case__status-icon']" />
      {{ toLocalNumber(props.opened) }} / {{ toLocalNumber(props.maxOpeners) }}
    </div>
    <div
      v-if="props.discount"
      :class="[
        $style['case__status-item'],
        $style['case__status-item--discount'],
      ]"
    >
      {{ props.discount }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  opened?: number;
  maxOpeners?: number;
  discount?: string;
}>();
</script>

<style module lang="scss">
.case__status {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
}

.case__status-icon {
  fill: $yellow;
  width: 1rem;
  height: 1rem;
}

.case__status-item {
  font-weight: 500;
  line-height: 115%;
  letter-spacing: -0.024px;
  display: flex;
  padding: 8px 6px;
  font-size: 14px;
  align-items: center;
  gap: 6px;
  border-radius: 20px;
  flex-shrink: 0;
  backdrop-filter: blur(20px);

  @media screen and (max-width: 800px) {
    font-size: 12px;
    padding: 4px 6px;
  }
}

.case__status-item--opened {
  background: rgba(255, 199, 0, 0.06);
  color: $yellow;
}

.case__status-item--discount {
  background: rgba(255, 51, 51, 0.06);
  color: #f85454;
}
</style>
