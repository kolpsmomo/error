<template>
  <div :class="$style['no-messages']">{{ t("chat.no_data") }}</div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style lang="scss" module>
.no-messages {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 75%;
  padding: 15px;
  font-size: 0.875rem;
  color: var(--bdrop-no-messages);
  text-align: center;
  transform: translate(-50%, -50%);
}
</style>
