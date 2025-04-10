<template>
  <div :class="$style.online">
    <span :class="$style.pulse"></span>
    <span :class="$style.count">{{ toLocalNumber(online) }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  online: number;
}>();

const { online } = toRefs(props);
</script>

<style lang="scss" module>
.online {
  display: flex;
  align-items: center;
  transform: translateY(2px);
  margin-left: 0.5rem;
  font-size: 0.875rem;
  line-height: 1rem;
  gap: 2px;
  color: var(--general-grey);
  $pulse-color: rgb(90, 237, 144);

  .pulse {
    margin: 6px;
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: $pulse-color;
    box-shadow: 0 0 0 rgba($pulse-color, 0.75);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      -moz-box-shadow: 0 0 0 0 rgba($pulse-color, 0.75);
      box-shadow: 0 0 0 0 rgba($pulse-color, 0.75);
    }
    70% {
      -moz-box-shadow: 0 0 2px 2px rgba($pulse-color, 0.75);
      box-shadow: 0 0 2px 2px rgba($pulse-color, 0.75);
    }
    100% {
      -moz-box-shadow: 0 0 0 0 rgba($pulse-color, 0);
      box-shadow: 0 0 0 0 rgba($pulse-color, 0);
    }
  }
}

.count {
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 12px;

  @media screen and (min-width: 801px) {
    font-size: 14px;
  }
}
</style>
