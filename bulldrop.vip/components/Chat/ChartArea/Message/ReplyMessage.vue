<template>
  <MessageButton :title="t('chat.reply')">
    <div>{{ t("chat.reply") }}</div>
    <IconReply />
  </MessageButton>
</template>

<script setup lang="ts">
import MessageButton from "./MessageButton.vue";
const { t } = useI18n();
</script>
