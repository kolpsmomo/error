<template>
  <div
    :class="$style['tabs-wrapper']"
    data-test="chat-tabs-wrapper"
  >
    <div :class="$style.tabs">
      <span
        :class="[$style.tab, currentTab === Tabs.INFO && $style.active]"
        @click="setActiveTab($event, Tabs.INFO)"
        >{{ t("chat.user_info.info") }}</span
      >
      <span
        :class="[$style.tab, currentTab === Tabs.PERMISSIONS && $style.active]"
        @click="setActiveTab($event, Tabs.PERMISSIONS)"
        >{{ t("chat.user_info.permissions") }}</span
      >
      <span
        :class="[$style.tab, currentTab === Tabs.BAN && $style.active]"
        @click="setActiveTab($event, Tabs.BAN)"
        >{{ t("chat.user_info.ban") }}</span
      >
    </div>
  </div>
  <div :class="$style.body">
    <div
      v-if="currentTab === Tabs.INFO"
      :class="$style.info"
    >
      <SettingsInfo
        v-for="item in infoItems"
        :key="item.title"
        :info-item="item"
      />
    </div>
    <div v-else-if="currentTab === Tabs.PERMISSIONS">
      <SettingsPermissions
        :range-value="cooldown"
        @set-range-value="setCooldown"
      />
    </div>
    <div v-else-if="currentTab === Tabs.BAN">
      <SettingsBan
        :user-banned="userBanned"
        :time-end-ban="banTimeData"
        :ban-reason="banReasonData"
        :can-be-banned="canBeBanned"
        :is-forever-banned="userInfo.isForeverBanned"
        @set-range-value="setBanTime"
        @set-reason="setReason"
        @set-ban-user="banUser"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MessageWithMenu } from "~/types";
import SettingsInfo from "./SettingsInfo.vue";
import { debounce, formattedDate, numberWithCommas } from "./utils";
import SettingsPermissions from "~/components/Chat/ChartArea/UserSettings/SettingsPermissions.vue";
import SettingsBan from "~/components/Chat/ChartArea/UserSettings/SettingsBan.vue";
import type { UserInfo, ChatMessageRoomEnum } from "~/api_gen";
import type { ChatInfoItem } from "~/types";
import { BanTypeEnum } from "~/api_gen";

type Props = {
  userInfo: UserInfo;
  canBeBanned: boolean;
  room?: ChatMessageRoomEnum;
  messages: MessageWithMenu[];
};

enum Tabs {
  INFO = "info",
  PERMISSIONS = "permissions",
  BAN = "ban",
}

const api = useApi();
const props = defineProps<Props>();
const { userInfo, canBeBanned, messages, room } = toRefs(props);
const notify = useNotify();
const { t } = useI18n();
const currentTab = ref<Tabs>(Tabs.INFO);
const cooldown = ref<number>(userInfo.value.cooldown as number);
const banTimeData = ref<BanTypeEnum | number | undefined>(getBanTime());
const banReasonData = ref<string | undefined>(userInfo.value.banReason);
const userBanned = ref<boolean>(!!userInfo.value.timeEndBan);
const infoItems = computed(() => {
  const last_invoice = userInfo.value.lastInvoice?.amountGold ?? 0;
  let last_withdrawal = 0;
  switch (userInfo.value.lastWithdrawal?.resourcetype) {
    case "RobloxWithdrawal":
      last_withdrawal = userInfo.value.lastWithdrawal?.amountRobux ?? 0;
      break;
    case "GenshinWithdrawal":
    case "PUBGWithdrawal":
    case "StandoffWithdrawal":
      last_withdrawal = userInfo.value.lastWithdrawal?.amountBullcoins ?? 0;
  }

  return [
    {
      title: t("chat.user_info.deposit_amount"),
      date: t("chat.user_info.all_the_time"),
      fmtValue: `${numberWithCommas(+userInfo.value.depositAmount)}`,
      value: userInfo.value.depositAmount,
    },
    {
      title: t("chat.user_info.last_invoice"),
      date: userInfo.value.lastInvoice?.createdAt
        ? formattedDate(userInfo.value.lastInvoice?.createdAt.toString())
        : "",
      fmtValue: `${+last_invoice > 0 ? "+" : ""}${numberWithCommas(
        +last_invoice,
      )}`,
      value: last_invoice,
    },
    {
      title: t("chat.user_info.last_withdrawal"),
      date: userInfo.value.lastWithdrawal?.created
        ? formattedDate(userInfo.value.lastWithdrawal?.created.toString())
        : "",
      fmtValue: `${last_withdrawal !== 0 ? "-" : ""}${numberWithCommas(
        +last_withdrawal,
      )}`,
      value: last_withdrawal !== 0 ? -last_withdrawal : last_withdrawal,
      negative: true,
    },
  ] as ChatInfoItem[];
});

function getBanTime() {
  if (userInfo.value.isForeverBanned) {
    return BanTypeEnum.NUMBER_5;
  } else if (userInfo.value.timeEndBan) {
    return BanTypeEnum.NUMBER_0;
  }
}

const setActiveTab = (e: Event, tab: Tabs) => {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((t) => {
    t.classList.remove("active");
  });

  (e.target as HTMLDivElement).classList.add("active");
  currentTab.value = tab;
};

const processCooldown = debounce((id: number, val: number, oldVal: number) => {
  api.chat
    .cooldownSet({
      setCooldownRequest: {
        userId: id,
        cooldown: val,
      },
    })
    .catch(() => {
      cooldown.value = oldVal;
    });
});

const setCooldown = (val: number) => {
  processCooldown(userInfo.value.id, val, cooldown.value);
  cooldown.value = val;
};

const banUser = () => {
  if (userBanned.value) {
    api.chat
      .unban({
        chatUnbanRequest: {
          userId: userInfo.value.id,
        },
      })
      .then(() => {
        banTimeData.value = undefined;
        banReasonData.value = "";
        userBanned.value = false;
      })
      .catch((e: unknown) => {
        notify({
          type: "error",
          text: (e as Error).message,
        });
      });
  } else if (canBeBanned.value) {
    const messageId = getUserLastMsgId();
    api.chat
      .ban({
        chatBanRequest: {
          userId: userInfo.value.id,
          reason: banReasonData.value,
          // @ts-ignore
          banType: banTimeData.value,
          messageId,
          // @ts-ignore
          room: room?.value || "main",
        },
      })
      .then(() => {
        userBanned.value = true;
      })
      .catch(async (e: any) => {
        const errorData = await e.response.json();
        notify({
          text: errorData.detail,
          type: "error",
        });
      });
  }
};

const setBanTime = (val: BanTypeEnum | number) => {
  banTimeData.value = val;
};

const setReason = (val: string | undefined) => {
  banReasonData.value = val;
};

const getUserLastMsgId = () => {
  const userId = userInfo.value.id;
  for (let i = messages.value.length - 1; i >= 0; i--) {
    const message = messages.value[i];
    if (message.messageSender.id === userId) {
      return message.id;
    }
  }
  return null;
};
</script>

<style module lang="scss">
.tabs-wrapper {
  margin-top: 1.25rem;
  display: flex;

  .tabs {
    display: flex;
    width: 100%;
    justify-content: space-around;

    .tab {
      flex-grow: 1;
      flex-basis: 0;
      font-size: 14px;
      line-height: 1rem;
      padding-top: 10px;
      padding-bottom: 0.5rem;
      text-align: center;
      color: var(--general-grey);
      cursor: pointer;

      &.active {
        color: var(--general-white);
        border-bottom: 2px solid var(--general-white);
      }
    }
  }
}

.body {
  margin-top: 1.5rem;

  .info {
    border-radius: 0.75rem;
    border: 0.6px solid var(--button-outlined-stroke-default);
    background: var(--general-underlay-2-lvl);

    :deep(.info-wrapper:not(:last-child)) {
      border-bottom: 0.6px solid var(--button-outlined-stroke-default);
    }
  }
}
</style>
