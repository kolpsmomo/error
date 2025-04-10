<template>
  <div
    :class="$style.timer"
    :data-hint="$t('bullpass.banner.timer.title')"
  >
    {{ $t("chat.message_form.banned_time") }} &nbsp;
    <span :class="$style.time">{{ bantime }} </span>
  </div>
</template>

<script setup lang="ts">
import type { Event } from "./types/Event";
import { useServerDateTime } from "~/composables/date/useServerDateTime";
import { usePluralize } from "~/composables/text/usePluralize";

const props = defineProps<{
  event: Event;
}>();
const emit = defineEmits<{
  endTimer: [
    {
      timerIsEnd: boolean;
    },
  ];
}>();
const { t } = useI18n();
const days = ref("");
const hours = ref("");
const minutes = ref("");
const seconds = ref("");
const dataDays = ref("");
const dataHours = ref("");
const dataMinutes = ref("");
const dataSeconds = ref("");
const timerIsEnd = ref(false);
const bantime = computed(() => {
  let timer = "";
  const dayShow = days.value !== "0" && days.value !== "00" && days.value;
  const hourShow = hours.value !== "0" && hours.value !== "00" && hours.value;
  const minuteShow =
    minutes.value !== "0" && minutes.value !== "00" && minutes.value;
  const secondShow =
    seconds.value !== "0" && seconds.value !== "00" && seconds.value;
  if (dayShow) {
    timer += `${days.value}:`;
  }
  if (hourShow || dayShow) {
    timer += `${hours.value}:`;
  }
  if (minuteShow || hourShow || dayShow) {
    timer += `${minutes.value}:`;
  }
  if (secondShow || minuteShow || hourShow || dayShow) {
    timer += `${seconds.value}`;
  }
  return timer;
});
let daysLeft: ReturnType<typeof setInterval> | undefined = undefined;

watch(timerIsEnd, () => {
  emit("endTimer", {
    timerIsEnd: timerIsEnd.value,
  });
});

onMounted(() => {
  daysLeft = setInterval(countdownTimer, 1000);
});

onBeforeUnmount(() => clearInterval(daysLeft));

const countdownTimer = () => {
  if (!props.event.year) return;
  const deadline = new Date(
    props.event.year,
    props.event.month,
    props.event.day,
    props.event.hours,
    props.event.minutes,
    props.event.seconds,
  );
  const { serverDateTime } = useServerDateTime();
  const diff = deadline.getTime() - new Date(serverDateTime).getTime();
  if (diff <= 0) {
    clearInterval(daysLeft);
  }
  const newDays = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
  const newHours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
  const newMinutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
  const newSeconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

  days.value = newDays < 10 ? "0" + newDays : newDays.toString();
  hours.value = newHours < 10 ? "0" + newHours : newHours.toString();
  minutes.value = newMinutes < 10 ? "0" + newMinutes : newMinutes.toString();
  seconds.value = newSeconds < 10 ? "0" + newSeconds : newSeconds.toString();

  if (
    seconds.value === "00" &&
    minutes.value === "00" &&
    hours.value === "00" &&
    days.value === "00"
  ) {
    timerIsEnd.value = true;
  }

  dataDays.value = usePluralize(newDays, [
    t("bullpass.banner.timer.plural.days.one"),
    t("bullpass.banner.timer.plural.days.two"),
    t("bullpass.banner.timer.plural.days.more"),
  ]);
  dataHours.value = usePluralize(newHours, [
    t("bullpass.banner.timer.plural.hours.one"),
    t("bullpass.banner.timer.plural.hours.two"),
    t("bullpass.banner.timer.plural.hours.more"),
  ]);
  dataMinutes.value = usePluralize(newMinutes, [
    t("bullpass.banner.timer.plural.minutes.one"),
    t("bullpass.banner.timer.plural.minutes.two"),
    t("bullpass.banner.timer.plural.minutes.more"),
  ]);
  dataSeconds.value = usePluralize(newSeconds, [
    t("bullpass.banner.timer.plural.seconds.one"),
    t("bullpass.banner.timer.plural.seconds.two"),
    t("bullpass.banner.timer.plural.seconds.more"),
  ]);
};
</script>

<style lang="scss" module>
.timer {
  font-size: 0.75rem;
  line-height: 1rem;
  color: var(--general-white);

  .time {
    color: var(--general-grey);
  }
}
</style>
