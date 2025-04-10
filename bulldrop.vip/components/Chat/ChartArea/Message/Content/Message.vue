<template>
  <div :class="[$style.message, deleted && $style.deleted]">
    {{ messageText }}
  </div>
</template>

<script setup lang="ts">
import type { MessageWithMenu } from "~/types";

const props = defineProps<{
  messageText: MessageWithMenu["messageText"];
  deleted: boolean;
}>();
const { messageText, deleted } = toRefs(props);
const userStore = useUserStore();
const { isStaff } = userStore.session?.user ?? {};
const messageWidth = computed<string>(() => (isStaff ? "70%" : "80%"));
</script>

<style lang="scss" module>
.message {
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  word-break: break-word;
  white-space: pre-wrap;
  color: var(--general-white);
  max-width: v-bind(messageWidth);

  @media (hover: none) {
    max-width: 90%;
  }
}

.deleted {
  color: var(--general-grey);
}
</style>
