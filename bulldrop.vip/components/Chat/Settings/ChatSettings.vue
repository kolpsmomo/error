<template>
  <div :class="$style['user-setting-wrapper']">
    <TheHeader
      @hide-chat-settings="hideChatSettings"
      @hide-chat-area="$emit('hide-chat-area')"
    >
    </TheHeader>
    <ChatSeparator :class="$style['separator-wrapper']" />
    <TheBody :cooldown="cooldown" />
  </div>
</template>

<script setup lang="ts">
import ChatSeparator from "~/components/Chat/ChartArea/Message/ChatSeparator.vue";
import TheHeader from "./TheHeader.vue";
import TheBody from "./TheBody.vue";

type Props = {
  cooldown: number;
};

const props = defineProps<Props>();
const { cooldown } = toRefs(props);
const emits = defineEmits<{
  (e: "hide-chat-settings"): void;
  (e: "hide-chat-area"): void;
}>();

const hideChatSettings = () => {
  emits("hide-chat-settings");
};
</script>

<style lang="scss" module>
.user-setting-wrapper {
  width: 100%;
  height: 100%;
  padding: 0 1.25rem;
  margin-top: -0.25rem;

  .separator-wrapper {
    margin-left: -0.25rem;
    width: calc(100% + 0.5rem);
  }
}
</style>
