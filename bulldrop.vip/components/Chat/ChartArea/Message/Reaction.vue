<template>
  <button
    :class="[$style.reaction, isReacted && $style.reacted]"
    @pointerup="setReactionTouch(emojiCode)"
  >
    {{ emoji }}
    <span :class="$style.count">{{ count }}</span>
  </button>
</template>

<script setup lang="ts">
import { textEmoji } from "markdown-to-text-emoji";

const emit = defineEmits(["set"]);
const props = defineProps({
  emojiCode: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
  isReacted: Boolean,
});

const emoji = computed(() => textEmoji(props.emojiCode));
const setReactionTouch = (code: string) => {
  emit("set", code);
};
</script>

<style module lang="scss">
.reaction {
  display: flex;
  padding: 0px 12px 0px 8px;
  align-items: center;
  gap: 8px;
  border-radius: 30px;
  background: var(--general-transparent-mid-35);
  border: solid 1px transparent;
  position: relative;
  z-index: 10;

  &:hover {
    border-color: #cdcdcd;
  }
}

.count {
  color: var(--general-grey-light);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
}

.reacted {
  background: #1853a0;
}
</style>
