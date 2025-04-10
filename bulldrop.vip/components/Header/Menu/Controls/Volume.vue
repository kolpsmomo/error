<template>
  <label :class="$style.volume">
    <div :class="$style.label"><IconVolume />{{ t("header.volume") }}</div>
    <Toggle
      :model-value="coreStore.audioIsRequired"
      @update:modelValue="coreStore.toggleAudio"
    />
  </label>
</template>

<script setup lang="ts">
import Toggle from "~/components/Form/Toggle.vue";

const coreStore = useCoreStore();
const { t } = useI18n();
</script>

<style lang="scss" module>
.volume {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 24px;
}

.label {
  display: flex;
  color: var(--general-white);
  font-size: 0.875rem;

  :global(svg) {
    fill: var(--general-white);
  }
}
</style>
