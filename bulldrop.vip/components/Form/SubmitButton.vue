<template>
  <button :class="[$style['submit-button'], inactive && $style['inactive']]">
    <slot />
  </button>
</template>

<script setup lang="ts">
type Props = {
  inactive?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  inactive: false,
});
const { inactive } = toRefs(props);
</script>

<style lang="scss" module>
.submit-button {
  position: relative;
  display: block;
  width: 100%;
  margin: auto;
  margin-top: 24px;
  padding: 14px;
  border-radius: $br10;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 500;
  color: var(--button-accident-content);
  background-color: var(--button-accident-default);
  transition: 0.25s;

  &:not(.inactive):hover,
  &:not(:disabled):hover {
    background-color: var(--button-accident-hover);
  }

  &:not(.inactive):not(:disabled):active {
    background-color: var(--button-accident-active);
  }

  &:disabled {
    color: var(--general-disabled);
    background-color: var(--button-accident-disabled);
    pointer-events: none;
  }
}

.inactive {
  cursor: not-allowed !important;
  pointer-events: none !important;
  opacity: 0.5 !important;
  span {
    pointer-events: none;
  }
}

.getWonItem {
  background: var(--button-outlined-fill-default);
  border: 0.6px solid var(--button-outlined-stroke-default);
  color: var(--general-white);

  &:hover {
    background-color: var(--button-outlined-fill-hover) !important;
  }
  &:active {
    background-color: var(--button-outlined-fill-active) !important;
  }
}
</style>
