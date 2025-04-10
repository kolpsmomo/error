<template>
  <MessageButton :title="t('chat.change_nick')">
    <div :class="$style['change-nick']">{{ t("chat.change_nick") }}</div>
    <IconRefresh />
  </MessageButton>
</template>

<script setup lang="ts">
import MessageButton from "./MessageButton.vue";
const { t } = useI18n();
</script>

<style lang="scss" module>
.change-nick {
  color: #ffc259 !important;
}
</style>
