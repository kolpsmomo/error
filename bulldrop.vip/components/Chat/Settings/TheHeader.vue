<template>
  <div :class="$style.header">
    <div :class="$style['header-info']">
      <div
        :class="$style['back-chat']"
        data-test="back_chat_btn"
        @click="hideChatSettings"
      >
        <IconChevronLeft />
      </div>
      <div :class="$style['header-info-title']">{{ t("chat.settings") }}</div>
    </div>
    <CloseButton @click="emits('hide-chat-area')" />
  </div>
</template>

<script setup lang="ts">
import CloseButton from "~/components/Chat/ChartArea/Header/CloseButton.vue";

const emits = defineEmits<{
  (e: "hide-chat-settings"): void;
  (e: "hide-chat-area"): void;
}>();

const { t } = useI18n();

const hideChatSettings = () => {
  emits("hide-chat-settings");
};
</script>

<style lang="scss" module>
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.header-info {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.back-chat {
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-radius: 10px;
    background: var(--bdrop-chat-button-hover);
  }
}

.header-info-title {
  font-size: 1.5rem;
  line-height: 1.75rem;
  letter-spacing: -0.01em;
}
</style>
