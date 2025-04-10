<template>
  <MessageButton :title="t('chat.reactions')">
    <IconEmotion />
  </MessageButton>
</template>

<script setup lang="ts">
import MessageButton from "./MessageButton.vue";
const { t } = useI18n();
</script>
