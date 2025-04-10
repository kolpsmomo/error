<template>
  <div :class="$style.menu">
    <span
      v-for="(reaction, index) in emojiList"
      :key="index"
      :class="$style.reaction"
      @click="click(reaction.code)"
      >{{ reaction.emoji }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { textEmoji } from "markdown-to-text-emoji";

const chatStore = useChatStore();
const { reactions } = storeToRefs(chatStore);
const emojiList = computed(() => {
  return (
    reactions.value &&
    reactions.value.map((reaction) => ({
      emoji: textEmoji(reaction.code),
      code: reaction.code,
    }))
  );
});
const emit = defineEmits(["set"]);
const click = (code: string) => {
  emit("set", code);
};
</script>

<style module lang="scss">
.menu {
  width: 188px;
  padding: 12px;
  border-radius: 12px;
  background: var(--general-transparent-mid-55);
  box-shadow: 2px 4px 10px 0px rgba(20, 22, 26, 0.3);
  backdrop-filter: blur(40px);
  gap: 16px;
  display: flex;
  flex-wrap: wrap;
}

.reaction {
  cursor: pointer;
  font-size: 20px;
}
</style>
