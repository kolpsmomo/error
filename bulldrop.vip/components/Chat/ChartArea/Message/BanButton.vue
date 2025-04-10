<template>
  <MessageButton
    :class="[$style.ban, banInChat && $style.unban]"
    :title="
      banInChat ? t('chat.chat_ban_menu.unban') : t('chat.chat_ban_menu.ban')
    "
  >
    <template v-if="!banInChat">
      <div>{{ t("chat.chat_ban_menu.ban") }}</div>
      <Ban />
    </template>
    <template v-else>
      <div>{{ t("chat.chat_ban_menu.unban") }}</div>
      <Unban />
    </template>
  </MessageButton>
</template>

<script setup lang="ts">
import MessageButton from "./MessageButton.vue";
import Unban from "~/components/Icon/Unban.vue";
import Ban from "~/components/Icon/Ban.vue";

const props = defineProps<{
  banInChat: boolean;
}>();
const { banInChat } = toRefs(props);
const { t } = useI18n();
</script>

<style lang="scss" module>
.ban {
  div {
    color: var(--bdrop-chat-red-color) !important;
  }
  svg {
    fill: var(--bdrop-chat-red-color) !important;
  }
}

.unban {
  div {
    color: var(--bdrop-chat-accident-color) !important;
  }
  svg {
    fill: var(--bdrop-chat-accident-color) !important;
  }
}
</style>
