<template>
  <div :class="$style.button">
    <IconSupport :class="$style.icon" /><span>{{
      t("chat.header.support")
    }}</span>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style lang="scss" module>
.button {
  color: var(--general-grey);
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  cursor: pointer;
}

.icon {
  width: 16px !important;
  height: 16px !important;
  padding: 0 !important;
  margin-right: 8px;
  fill: var(--general-grey) !important;

  path {
    fill: var(--general-grey) !important;
  }

  &:hover {
    background: transparent !important;
  }
}
</style>
