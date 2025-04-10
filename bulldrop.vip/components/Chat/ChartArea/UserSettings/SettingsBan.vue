<template>
  <div :class="$style['ban-wrapper']">
    <div>
      <div :class="$style['ban-title']">
        {{ t("chat.user_info.ban_time") }}
      </div>
      <InputRange
        :steps="steps"
        :range-value="banTime"
        :disabled="userBanned || !canBeBanned"
        @set-range-value="setRangeValue"
      />
    </div>
    <div :class="$style['ban-reason']">
      <div :class="$style['ban-title']">
        {{ t("chat.user_info.ban_reason") }}
      </div>
      <InputsContainer>
        <BaseLabel style="margin-bottom: 0">
          <BaseInput
            v-model="banReasonData"
            type="text"
            :class="$style['user-settings-input']"
            :disabled="userBanned || !canBeBanned"
          />
        </BaseLabel>
      </InputsContainer>
    </div>
    <SubmitButton
      :inactive="!canBeBanned"
      style="margin-top: -0.5rem"
      :class="[userBanned && $style.unbanBtn, !userBanned && $style.banBtn]"
      @click="showBanPopup = true"
      >{{
        userBanned ? t("chat.chat_ban_menu.unban") : t("chat.chat_ban_menu.ban")
      }}</SubmitButton
    >
  </div>

  <BanUserPopup
    v-if="showBanPopup && canBeBanned"
    @hide="showBanPopup = false"
    @ok="banUser"
  >
    <template #title>
      <div>
        {{
          userBanned
            ? t("chat.user_info.unban_user")
            : t("chat.user_info.ban_user")
        }}
      </div>
    </template>
  </BanUserPopup>
</template>

<script setup lang="ts">
import InputRange from "~/components/Chat/ChartArea/UserSettings/InputRange.vue";
import BaseInput from "~/components/Form/Input.vue";
import BaseLabel from "~/components/Form/Label.vue";
import InputsContainer from "~/components/Profile/Body/UserSettings/InputsContainer.vue";
import SubmitButton from "~/components/Form/SubmitButton.vue";
import BanUserPopup from "~/components/Chat/ChartArea/UserSettings/BanUserPopup.vue";
import { BanTypeEnum } from "~/api_gen";

type Props = {
  timeEndBan?: BanTypeEnum | number;
  userBanned: boolean;
  banReason: string | undefined;
  canBeBanned: boolean;
  isForeverBanned: boolean;
};

const props = defineProps<Props>();
const { canBeBanned, timeEndBan, userBanned, banReason, isForeverBanned } =
  toRefs(props);
const { t } = useI18n();
const emits = defineEmits<{
  (e: "set-range-value", data: number): void;
  (e: "set-ban-user"): void;
  (e: "set-reason", data: string | undefined): void;
}>();
const steps = ref<string[]>([
  `15${t("chat.slow_mode_list.m")}`,
  `1${t("chat.slow_mode_list.h")}`,
  `24${t("chat.slow_mode_list.h")}`,
  `1${t("chat.slow_mode_list.w")}`,
  `1${t("chat.slow_mode_list.mth")}`,
  "∞",
]);
const disableRange = ref<boolean>(false);
const showBanPopup = ref<boolean>(false);
const banReasonData = ref<string | undefined>(
  timeEndBan?.value !== undefined ? banReason.value : "",
);
const banTime = ref<number>(0);

onBeforeMount(() => {
  if (isForeverBanned.value) {
    banTime.value = steps.value.length - 1;
  }
});

const setRangeValue = (val: number) => {
  emits("set-range-value", val);
  disableRange.value = false;
};

const banUser = () => {
  showBanPopup.value = false;
  if (banReasonData.value) {
    emits("set-reason", banReasonData.value);
  }
  emits("set-ban-user");
};

watch(
  () => timeEndBan?.value,
  (val: BanTypeEnum | number | undefined) => {
    if (isForeverBanned.value) {
      banTime.value = steps.value.length - 1;
    }
    if (!val) {
      banReasonData.value = "";
    }
    banTime.value = 0;
  },
);
</script>

<style lang="scss" module>
.ban-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  .ban {
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

  .unbanBtn {
    color: var(--functional-blue-additional) !important;
    background: var(--functional-blue-transparent);

    &:hover {
      background: rgba(57, 80, 122, 0.38) !important;
    }

    &:active {
      background: rgba(82, 107, 153, 0.38) !important;
    }
  }

  .banBtn {
    color: var(--functional-red) !important;
    background: var(--functional-red-transparent);

    &:hover {
      background: rgba(119, 74, 69, 0.38) !important;
    }

    &:active {
      background: rgba(143, 105, 101, 0.38) !important;
    }
  }

  .disabled-color {
    color: #4c4e52;
  }
}
</style>
