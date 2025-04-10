<template>
  <div :class="$style.header">
    <div :class="$style['header-info']">
      <div
        :class="$style['back-chat']"
        data-test="back_chat_btn"
        @click="hideUserSettings"
      >
        <IconChevronLeft />
      </div>
      <div
        :class="$style['header-info__avatar']"
        :style="{
          backgroundImage: `url(${userInfo?.avatar})`,
        }"
      />
      <div :class="$style['header-info__description']">
        <div :class="$style['name-id']">
          <div :class="$style.title">
            <DecoratedNickname
              :value="userInfo?.selectedNicknameDecoration || ''"
            >
              {{ truncateString(userInfo?.nickname ?? "", 20) }}
            </DecoratedNickname>
          </div>
          <div
            v-if="userInfo?.isVerified"
            :class="$style.icon"
          >
            <IconGearCheck />
          </div>
          <div :class="$style.id">ID: {{ userInfo?.id }}</div>
        </div>
        <div
          v-if="userInfo?.dateJoined"
          :class="$style.date"
        >
          {{ t("chat.user_info.date_joined") }}
          {{ formattedDate(userInfo?.dateJoined.toString()) }}
        </div>
      </div>
    </div>
    <CloseButton @click="emits('hide-chat-area')" />
  </div>
</template>

<script setup lang="ts">
import { formattedDate } from "./utils";
import DecoratedNickname from "~/components/DecoratedNickname.vue";
import CloseButton from "~/components/Chat/ChartArea/Header/CloseButton.vue";
import type { UserInfo } from "~/api_gen";

type Props = {
  userInfo: UserInfo | null;
};

const props = defineProps<Props>();
const { userInfo } = toRefs(props);
const emits = defineEmits<{
  (e: "hide-user-settings"): void;
  (e: "hide-chat-area"): void;
}>();
const { t } = useI18n();
const hideUserSettings = () => {
  emits("hide-user-settings");
};
</script>

<style module lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;

  .header-info {
    display: flex;
    gap: 0.75rem;
    align-items: center;

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

    &__avatar {
      width: 40px;
      aspect-ratio: 1;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 10px;
    }

    &__description {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;

      .name-id {
        display: flex;
        align-items: center;
        gap: 0.25rem;

        .title {
          font-size: 14px;
          line-height: 1rem;
          font-weight: 500;

          & > div {
            max-width: 20ch;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 18px;
          height: 18px;
        }

        .id {
          color: var(--general-grey);
        }
      }

      .id,
      .date {
        line-height: 1rem;
        font-size: 0.75rem;
      }

      .date {
        color: var(--general-grey);
      }
    }
  }
}
</style>
