<template>
  <div :class="$style.content">
    <Banned v-if="banInChat && endBanDate !== 0" />
    <Author
      v-if="authorIsRequired"
      :nickname="message.messageSender.nickname"
      :nickname-decoration="message.messageSender.selectedNicknameDecoration"
      :message="message"
      :show-menu="showMenu"
      :created-at="message.createdAt.toLocaleString()"
    />
    <MessageComp
      :message-text="message.messageText"
      :deleted="deleted"
    />
  </div>
</template>

<script setup lang="ts">
import type { MessageWithMenu } from "~/types";
import Banned from "./Content/Banned.vue";
import Author from "./Content/Author.vue";
import MessageComp from "./Content/Message.vue";

type Props = {
  message: MessageWithMenu;
  banInChat: boolean;
  authorIsRequired?: boolean;
  showMenu?: boolean;
  deleted: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  authorIsRequired: true,
});
const { message, banInChat, authorIsRequired, showMenu } = toRefs(props);
const UPDATE_TIME_MS = 500;
const banTimeDiff = ref<number>(0);
const endBanDate = ref<number>(0);
const endBanDate_timer = ref<ReturnType<typeof setInterval> | undefined>(
  undefined,
);

onBeforeMount(() => {
  initBanTimer(message.value.messageSender.endBanDate?.toLocaleString());
});

const initBanTimer = (val: string | undefined) => {
  if (!val) {
    banTimeDiff.value = 0;
  } else {
    banTimeDiff.value = new Date(val).getTime() - new Date().getTime();
  }
  if (banTimeDiff.value <= 0) {
    return;
  }
  endBanDate_timer.value = setInterval(() => {
    if (endBanDate.value > 0) {
      endBanDate.value -= UPDATE_TIME_MS;
    } else if (!endBanDate.value) {
      endBanDate.value = banTimeDiff.value;
    } else {
      endBanDate.value = 0;
      clearInterval(endBanDate_timer.value);
      endBanDate_timer.value = undefined;
    }
  }, UPDATE_TIME_MS);
};

watch(
  () => message.value.messageSender.endBanDate,
  (val) => {
    if (endBanDate_timer.value) {
      clearInterval(endBanDate_timer.value);
      endBanDate_timer.value = undefined;
    }
    if (!val) {
      endBanDate.value = 0;
      return;
    }
    initBanTimer(val.toLocaleString());
  },
);
</script>

<style module lang="scss">
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 50px;
}
</style>
