<template>
  <div :class="$style.label">{{ t("chat.header.title") }}</div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style lang="scss" module>
.label {
  font-size: 1.5rem;
  line-height: 28px;
}
</style>
