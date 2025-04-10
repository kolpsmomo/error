<template>
  <div
    :class="[
      $style['user__banned-wrapper'],
      banInChat?.reason && $style['ban-reason'],
    ]"
  >
    <IconInfo :class="$style.info" />
    <div :class="$style.user__banned">
      <div :class="$style.banItem">{{ t("chat.message_form.banned") }}</div>
      <div
        v-if="banInChat.isForeverBanned"
        :class="$style.banItem"
      >
        {{ t("chat.message_form.banned_time") }}
        {{ t("chat.chat_ban_menu.forever") }}
      </div>
      <Timer
        v-else
        :event="event"
        @endTimer="showChatUnban"
      />
      <div
        v-if="banInChat?.reason"
        :class="$style.banItem"
      >
        {{ t("chat.message_form.banned_reason") }}
        <span :class="$style.reason">{{ banInChat?.reason }} </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from "../types/Event";
import Timer from "~/components/Chat/Timer.vue";
import type { Ban } from "~/api_gen";

const props = defineProps<{
  banInChat: Ban;
}>();
const { banInChat } = toRefs(props);
const { t } = useI18n();
const banTime = ref<string>("");
const event = reactive<Event>({
  year: 0,
  month: 0,
  week: 0,
  day: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

onBeforeMount(() => {
  setBanTime();
});

const setBanTime = () => {
  if (!banInChat.value) return;
  banTime.value = `${banInChat.value.endDate}`;
  const dataEnd = new Date(banTime.value).toLocaleString("en-Us", {
    timeZone: "Europe/Moscow",
  });
  const dataEndMsc = new Date(dataEnd);
  event.year = dataEndMsc.getFullYear();
  event.month = dataEndMsc.getMonth();
  event.week = dataEndMsc.getDate();
  event.day = dataEndMsc.getDate();
  event.hours = dataEndMsc.getHours();
  event.minutes = dataEndMsc.getMinutes();
  event.seconds = dataEndMsc.getSeconds();
};

const emits = defineEmits<{
  (e: "showChatUnban", data: { timerIsEnd: boolean }): void;
}>();

const showChatUnban = () => {
  emits("showChatUnban", {
    timerIsEnd: true,
  });
};
</script>

<style lang="scss" module>
.user__banned-wrapper {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  padding: 16px 24px;

  .info {
    width: 1rem;
    height: 1rem;
    fill: #ffd43d;
    border-radius: 0.75rem;
    border: 0.6px solid var(--button-outlined-stroke-default);
  }

  .user__banned {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    .banItem {
      font-size: 0.75rem;
      line-height: 1rem;
      color: var(--general-white);

      .reason {
        color: var(--general-grey);
      }
    }
  }
}

.ban-reason {
  padding: 10px 24px;
}
</style>
