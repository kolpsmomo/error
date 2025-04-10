<template>
  <div :class="$style.banned">{{ t("chat.message_form.banned") }}</div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style lang="scss" module>
.banned {
  font-size: 0.625rem;
  color: rgb(255, 100, 100);
  line-height: 1;
  text-transform: uppercase;
}
</style>
