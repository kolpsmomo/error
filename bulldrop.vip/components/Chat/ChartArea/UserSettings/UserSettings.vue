<template>
  <div
    v-if="userInfo"
    :class="$style['user-setting-wrapper']"
    data-test="chat-user-setting-wrapper"
  >
    <TheHeader
      :user-info="userInfo"
      @hide-user-settings="hideUserSettings"
      @hide-chat-area="$emit('hide-chat-area')"
    >
    </TheHeader>
    <ChatSeparator :class="$style['separator-wrapper']" />
    <TheBody
      v-if="userInfo"
      :user-info="userInfo"
      :can-be-banned="canBeBanned"
      :room="room"
      :messages="messages"
    />
  </div>
</template>

<script setup lang="ts">
import type { MessageWithMenu } from "~/types";
import TheHeader from "./TheHeader.vue";
import TheBody from "./TheBody.vue";
import ChatSeparator from "~/components/Chat/ChartArea/Message/ChatSeparator.vue";
import type { UserInfo, ChatMessageRoomEnum } from "~/api_gen";

type Props = {
  userId: number | null;
  canBeBanned: boolean;
  room?: ChatMessageRoomEnum;
  isShown: boolean;
  messages: MessageWithMenu[];
};

const props = defineProps<Props>();
const { userId, canBeBanned, room, isShown } = toRefs(props);
const emits = defineEmits<{
  (e: "hide-user-settings"): void;
  (e: "hide-chat-area"): void;
}>();
const userInfo = ref<UserInfo | null>(null);

watch(
  () => isShown.value,
  (val) => {
    if (val && userId.value) {
      getUserInfo();
    } else {
      userInfo.value = null;
    }
  },
);

const api = useApi();
const getUserInfo = async () => {
  try {
    userInfo.value = await api.chat.userRetrieve({
      id: userId.value as number,
    });

    if (!userInfo.value.cooldown) {
      userInfo.value.cooldown = 3;
    }
  } catch (e) {
    /* empty */
  }
};

const hideUserSettings = () => {
  emits("hide-user-settings");
};
</script>

<style module lang="scss">
.user-setting-wrapper {
  width: 100%;
  height: 100%;
  padding: 0 1.25rem;
  margin-top: -0.25rem;

  .separator-wrapper {
    margin-left: -0.25rem;
    width: calc(100% + 0.5rem);
  }
}
</style>
