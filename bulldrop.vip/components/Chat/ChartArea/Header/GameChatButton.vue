<template>
  <ChatButton :active="active">
    {{ gameChatName || t("chat.body.tab_game") }}
  </ChatButton>
</template>

<script setup lang="ts">
import ChatButton from "./ChatButton.vue";

type Props = {
  active?: boolean;
  gameChatName?: string;
};

const props = defineProps<Props>();
const { active, gameChatName } = toRefs(props);
const { t } = useI18n();
</script>
