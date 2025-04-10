<template>
  <div :class="$style['change-nickname-wrapper']">
    <IconInfo :class="$style.info" />
    <div :class="$style['change-nickname-info']">
      <div :class="$style.title">
        {{ t("chat.notifications.change_nick_title") }}
      </div>
      <div :class="$style.subtitle">
        {{ t("chat.notifications.change_nick_subtitle") }}
      </div>
      <div
        :class="$style['change-nickname-info__link']"
        @click="showProfile"
      >
        {{ t("chat.change_nick") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { normalize } from "~/utils/url/normalize";

const { t } = useI18n();
const emits = defineEmits<{
  (e: "hide-chat-area"): void;
}>();
const showProfile = () => {
  navigateTo(normalize(`/user-settings`));
  emits("hide-chat-area");
};
</script>

<style lang="scss" module>
.change-nickname-wrapper {
  width: calc(100% - 1rem);
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  background: var(--general-transparent-mid-35);
  z-index: 15;
  position: fixed;
  bottom: 4.5rem;
  left: 0.5rem;
  backdrop-filter: blur(20px);

  .info {
    width: 1rem;
    height: 1rem;
    fill: #ffd43d;
    border-radius: 0.75rem;
    border: 0.6px solid var(--button-outlined-stroke-default);
  }

  .change-nickname-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .title {
      font-size: 14px;
      line-height: 16px;
      letter-spacing: -0.14px;
    }

    .subtitle,
    &__link {
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.12px;
    }

    &__link {
      color: var(--button-accident-default);
      cursor: pointer;
    }
  }
}
</style>
