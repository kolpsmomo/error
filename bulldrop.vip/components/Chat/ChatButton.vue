<template>
  <button
    :class="$style['chat-button']"
    data-test="chatButton"
    data-target="chat-button"
  >
    <div :class="$style.header">
      <div :class="$style.title">{{ t("chat.header.title") }}</div>
      <Online
        :class="$style.online"
        :online="online"
      />
    </div>
    <div :class="$style.close">
      <CloseButton :class="$style.closeSvg" />
    </div>
  </button>
</template>

<script setup lang="ts">
import CloseButton from "./ChartArea/Header/CloseButton.vue";
import Online from "./ChartArea/Header/Online.vue";

defineProps<{
  online: number;
}>();

const { t } = useI18n();
</script>

<style lang="scss" module>
.chat-button {
  position: fixed;
  right: 108px;
  bottom: 4px;
  z-index: 100;
  display: flex;
  align-items: center;
  height: 60px;
  border-radius: 20px;
  border: 0.6px solid var(--general-stroke);
  background-color: var(--general-underlay-1-lvl);
  transition: 0.25s;
  color: var(--general-white);
  justify-content: space-between;
  padding: 18px;

  @media screen and (max-width: 800px) {
    right: 64px;
    height: 48px;
    border-radius: 16px;
  }
}

.header {
  display: flex;
  gap: 8px;
}

.title {
  font-size: 20px;
  line-height: 20px;
  font-weight: 500;
  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
}

.close {
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-left: 12px;

  svg {
    fill: var(--general-transparent-light-35);
  }

  &:hover {
    background: var(--bdrop-chat-button-hover);
  }

  &:active {
    background: var(--bdrop-chat-button-active);
  }
}

.closeSvg {
  transform: rotate(180deg);

  &:hover,
  &:active {
    background: none !important;
  }
}

.online {
  height: 17px;
  margin-left: 0px;
}
</style>
