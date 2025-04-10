<template>
  <div :class="$style['popup']">
    <div
      v-if="showHeader"
      :class="$style['popup-header']"
    >
      <slot name="header" />
      <CloseButton
        v-if="props.showCloseButton"
        @click="emits('hide-form')"
      />
    </div>
    <div
      :class="$style['popup-body']"
      data-test="popup-body"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseButton from "./CloseButton.vue";

const props = withDefaults(
  defineProps<{
    showHeader?: boolean;
    showCloseButton?: boolean;
  }>(),
  {
    showHeader: true,
    showCloseButton: true,
  },
);

const emits = defineEmits<{
  (e: "hide-form"): void;
}>();
</script>

<style lang="scss" module>
.popup {
  position: relative;
  padding: 1.65rem 2rem 2rem;
  width: 460px;
  margin-top: 30px;
  background-color: var(--general-underlay-3-lvl);
  border-radius: $br20;
  &-title {
    margin: 0;
  }
}

.popup-header {
  width: 100%;
  align-items: center;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 2rem;
  color: var(--general-white);

  @media screen and (max-width: 640px) {
    font-size: 1.25rem;
  }
}

.popup-body {
  width: 100%;
  color: var(--general-white);
}
</style>
