<template>
  <MessageButton :title="t('chat.delete')">
    <div :class="$style['red-text']">{{ t("chat.delete") }}</div>
    <IconTrashcan :class="$style['red-icon']" />
  </MessageButton>
</template>

<script setup lang="ts">
import MessageButton from "./MessageButton.vue";
const { t } = useI18n();
</script>

<style lang="scss" module>
@media screen and (max-width: 800px) {
  .red-text {
    color: var(--bdrop-chat-red-color) !important;
  }

  .red-icon {
    fill: var(--bdrop-chat-red-color) !important;
  }
}
</style>
