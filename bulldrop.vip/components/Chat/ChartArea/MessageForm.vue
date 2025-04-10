<template>
  <div :class="$style['message-form-container']">
    <form
      data-test="chat_input_message"
      @submit.prevent
    >
      <textarea
        v-model="message"
        :placeholder="t('chat.message_form.message_placeholder')"
        :class="$style['message-form-textarea']"
        @keydown.enter.exact.prevent="sendMessage"
        @keydown="canTyping"
        @keyup="keyFiredHandler"
      />
      <CharacterLimiter
        v-if="!hasPermissions"
        :message-length="message.length"
        :class="$style.limiter"
        :is-key-fired="isKeyFired"
        @isLimitChanged="setIsLimit"
      />
      <button
        type="submit"
        :class="[$style['message-form-button'], isEmpty && $style.isEmpty]"
        data-test="chat_send_message_btn"
        @click="sendMessage"
      >
        <LoadingSpinner v-if="blocked" />
        <IconPaperPlane v-else />
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import CharacterLimiter from "./CharacterLimiter.vue";
import type { ChatMessageRoomEnum } from "~/api_gen";

type Props = {
  // Индикатор того, что отправка сообщений заблокирована.
  messageSendingIsDisabled: boolean;
  // Индикатор того, что в текущий момент отображен общий чат.
  mainChatIsShown: boolean;
  // Индикатор того, что в текущий момент отображен игровой чат.
  gameChatIsShown: boolean;
  // Индикатор того, что в текущий момент отображен приватный игровой чат.
  privateGameChatIsShown: boolean;
  // Наименование комнаты.
  room?: ChatMessageRoomEnum;
  // Id комнаты чата.
  roomId?: number;
  // никнейм которому мы отвечаем
  nicknameReply?: string;
};

const props = defineProps<Props>();
const { messageSendingIsDisabled, room, roomId, nicknameReply } = toRefs(props);
const userStore = useUserStore();
const hasPermissions = computed(
  () => !!userStore.session.user?.permissions!.length,
);
const emits = defineEmits<{
  (e: "reply", data: { userReplyNickname: string }): void;
}>();
const api = useApi();
const notify = useNotify();
const { t } = useI18n();
const chatStore = useChatStore();
const message = ref<string>("");
const blocked = ref<boolean>(false);
const isEmpty = computed(() => !message.value || message.value?.length === 0);
const isLimit = ref(false);
const isKeyFired = ref(false);

const sendMessage = () => {
  if (blocked.value || !message.value || messageSendingIsDisabled.value) {
    return;
  }
  blocked.value = true;
  if (nicknameReply?.value) {
    message.value = "@" + nicknameReply.value + " " + message.value;
  }
  api.chat
    .messageSendCreate({
      chatMessageRequest: {
        messageText: message.value,
        room: room?.value || "main",
        roomId: roomId?.value !== undefined ? `${roomId.value}` : roomId?.value,
        language: chatStore.chatLang,
      },
    })
    .then(() => {
      message.value = "";
      // После успешного отправления сообщения
      // сбрасываем никнейм для реплая
      emits("reply", {
        userReplyNickname: "",
      });
      // Убираем класс отвечающий за сдвижение сообщения
      document
        .querySelectorAll(".swipeLeft")
        .forEach((n) => n.classList.remove("swipeLeft"));
      document
        .querySelectorAll(".replied")
        .forEach((n) => n.classList.remove("replied"));
    })
    .catch(async (e: any) => {
      const errorData = await e.response.json();
      const errorText =
        (errorData && errorData.detail) || t("chat.message_form.error");

      notify({
        type: "error",
        text: errorText,
      });
    })
    .finally(() => (blocked.value = false));
};

const setIsLimit = (value: boolean) => {
  isLimit.value = value;
};

const canTyping = (e: KeyboardEvent) => {
  const isSelecting = (e.metaKey || e.ctrlKey) && e.code === "KeyA";
  const isBackspace = e.code === "Backspace";
  if (isLimit.value && !isBackspace && !isSelecting && !hasPermissions.value) {
    isKeyFired.value = true;
    nextTick(() => {
      isKeyFired.value = false;
    });
    e.preventDefault();
  }
};

const keyFiredHandler = () => {
  if (isLimit.value && !hasPermissions.value) {
    isKeyFired.value = true;
    nextTick(() => {
      isKeyFired.value = false;
    });
  }
};
</script>

<style lang="scss" module>
.message-form-container {
  position: relative;
  padding: 16px 20px;

  form {
    height: 32px;
    display: flex;
    align-items: center;
  }
}

.message-form-textarea {
  display: block;
  height: 100%;
  width: calc(100% - 32px);
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  padding: 7px 0 0;
  padding-right: 12px;
  color: $white-1 !important;
  letter-spacing: -0.01em;
  background-color: transparent;

  &::placeholder {
    color: var(--general-dark-grey);
  }

  &:focus::-webkit-input-placeholder {
    color: var(--general-dark-grey);
  }

  &:focus:-moz-placeholder {
    color: var(--general-grey);
  }

  &:focus::-moz-placeholder {
    color: var(--general-grey);
  }

  &:focus:-ms-input-placeholder {
    color: var(--general-grey);
  }

  &:focus {
    color: var(--general-white);
  }

  &::-webkit-scrollbar {
    width: 0;
  }
}

.message-form-button {
  cursor: pointer;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: $br10;
  border: none;
  outline: none;
  background-color: var(--bdrop-chat-accident-color);
  transition: 0.25s;

  svg {
    width: 1rem;
    fill: var(--general-white);
  }

  &.isEmpty {
    background-color: var(--button-functional-disabled);

    svg {
      fill: #2a2a2a;
    }
  }
}

.limiter {
  margin-right: 12px;
  flex-shrink: 0;
}
</style>
