<template>
  <div :class="$style['permissions-wrapper']">
    <div :class="$style['permissions-title']">
      {{ t("chat.user_info.slow_mode") }}
    </div>
    <InputRange
      :steps="steps"
      :range-value="cooldown"
      @set-range-value="setRangeValue"
    />
    <div :class="$style['permissions-subtitle']">
      {{ t("chat.user_info.awaiting_time") }}
    </div>
  </div>
</template>

<script setup lang="ts">
import InputRange from "~/components/Chat/ChartArea/UserSettings/InputRange.vue";

type Props = {
  rangeValue: number;
};

const props = defineProps<Props>();
const { rangeValue } = toRefs(props);
const { t } = useI18n();
const emits = defineEmits<{
  (e: "set-range-value", data: number): void;
}>();
const cooldown = ref<number>(0);
const steps = ref<string[]>([
  t("chat.slow_mode_list.off"),
  `10${t("chat.slow_mode_list.s")}`,
  `30${t("chat.slow_mode_list.s")}`,
  `1${t("chat.slow_mode_list.m")}`,
  `5${t("chat.slow_mode_list.m")}`,
  `15${t("chat.slow_mode_list.m")}`,
  `1${t("chat.slow_mode_list.h")}`,
]);
const stepsInS = [3, 10, 30, 60, 300, 900, 3600];

onMounted(() => {
  const idx = stepsInS.findIndex((s) => s === rangeValue.value);
  if (idx >= 0) {
    cooldown.value = idx;
  }
});

watch(
  () => rangeValue.value,
  (val) => {
    const idx = stepsInS.findIndex((s) => s === val);
    if (idx >= 0) {
      cooldown.value = idx;
    }
  },
);

const setRangeValue = (val: number) => {
  emits("set-range-value", stepsInS[val]);
};
</script>

<style lang="scss" module>
.permissions {
  &-title {
    font-size: 14px;
    line-height: 1rem;
    color: var(--general-grey);
    margin-bottom: 0.5rem;
  }

  &-subtitle {
    margin-top: 10px;
    font-size: 0.75rem;
    line-height: 1rem;
    color: var(--general-grey);
  }
}
</style>
