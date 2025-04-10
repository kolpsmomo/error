<template>
  <ChatButton :active="active">
    {{ t("chat.body.tab_general") }}
  </ChatButton>
</template>

<script setup lang="ts">
import ChatButton from "./ChatButton.vue";
import { toRefs } from "vue";

type Props = {
  active?: boolean;
};

const props = defineProps<Props>();
const { active } = toRefs(props);
const { t } = useI18n();
</script>
