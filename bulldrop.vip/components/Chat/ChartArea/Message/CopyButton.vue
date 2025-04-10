<template>
  <MessageButton :title="t('chat.copy_msg')">
    <IconCopy />
  </MessageButton>
</template>

<script setup lang="ts">
import MessageButton from "./MessageButton.vue";
const { t } = useI18n();
</script>
