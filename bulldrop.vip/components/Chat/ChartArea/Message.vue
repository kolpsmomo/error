<template>
  <div
    v-if="isStaff || (!isStaff && !message.deleted)"
    :class="$style.relative"
    data-test="chat-relative"
  >
    <div
      ref="msgReply"
      :class="$style.reply__wrapper"
      data-test="reply"
      @pointerover="showMsgMenu"
      @pointerleave="hideMsgMenu"
      @pointerup="onTapItem"
    >
      <div
        ref="msg"
        :class="[
          $style['message-wrapper'],
          (delButtonIsRequired || banButtonIsRequired) && $style.highlightable,
          message.redundant && $style['next-message-wrapper'],
        ]"
      >
        <div
          v-if="message.deleted"
          :class="[message.deleted && $style.deleted]"
        ></div>
        <Avatar
          v-if="!message.redundant"
          :class="[isStaff && $style.pointer, $style.avatar]"
          :src="message.messageSender.avatar"
          :avatar-border="message.messageSender?.avatarBorder || undefined"
          @pointerdown="showUserSettings"
        />
        <Content
          :author-is-required="!message.redundant"
          :message="message"
          :ban-in-chat="message.messageSender?.banInChat"
          :created-at="message.createdAt"
          :show-menu="showMenu"
          :deleted="!!message.deleted"
        />
        <BanCurtain
          v-if="banCurtainIsRequired"
          @pointerleave="hideBanCurtain"
          @cancel="banCurtainIsRequired = false"
          @ban="ban"
        />
      </div>
      <div
        v-show="userStore.userIsAuthorized && showMenu"
        :class="$style['hover-message']"
        data-test="hover"
        tabindex="0"
      >
        <div
          v-if="!message.deleted"
          :class="$style.reactionMenu"
        >
          <ReactionMenu
            v-if="isReactionMenu"
            data-test="reaction-menu"
            @set="setReaction"
          />
        </div>
        <CheckedMessage />
        <ButtonsContainer v-if="currentUser">
          <ReactionButton
            v-if="!message.deleted"
            :class="$style.reactionButton"
            @pointerdown="toggleReaction"
          />
          <ReplyMessageComp
            v-if="!message.deleted"
            @pointerup.stop="replyMessage"
          />
          <CopyButton
            v-if="delButtonIsRequired"
            @pointerup.stop="copyMessage"
          />
          <ChangeNickname
            v-if="
              !message.messageSender?.isNicknameChangeRequested &&
              isStaff &&
              !message.messageSender?.isStaff
            "
            @pointerup.stop="requestChangeNickname"
          />
          <DelButton
            v-if="delButtonIsRequired && !message.deleted"
            @pointerup.stop="deleteMessage"
          />
          <BanButton
            v-if="banButtonIsRequired"
            :ban-in-chat="message.messageSender?.banInChat"
            @pointerup.stop="processBanButtonClick"
          />
        </ButtonsContainer>
      </div>
      <div
        v-if="reactions.length && !message.deleted"
        :class="$style.reactions"
      >
        <Reaction
          v-for="(reaction, index) in reactions"
          :key="index"
          :emoji-code="reaction.code"
          :count="reaction.count"
          :is-reacted="userStore.userIsAuthorized && reaction.isReacted"
          @set="setReaction"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MessageWithMenu } from "~/types";
import Avatar from "./Message/Avatar.vue";
import Content from "./Message/Content.vue";
import BanButton from "./Message/BanButton.vue";
import CopyButton from "./Message/CopyButton.vue";
import BanCurtain from "./Message/BanCurtain.vue";
import DelButton from "./Message/DelButton.vue";
import ReplyMessageComp from "./Message/ReplyMessage.vue";
import ButtonsContainer from "./Message/ButtonsContainer.vue";
import ChangeNickname from "~/components/Chat/ChartArea/Message/ChangeNickname.vue";
import CheckedMessage from "~/components/Chat/ChartArea/Message/CheckedMessage.vue";
import ReactionButton from "./Message/ReactionButton.vue";
import ReactionMenu from "./ReactionMenu.vue";
import Reaction from "./Message/Reaction.vue";
import type {
  BanTypeEnum,
  ReactionEnum,
  ReactionsCount,
  User,
} from "~/api_gen";
import type { ChatMessageRoomEnum } from "~/api_gen";

type Props = {
  message: MessageWithMenu;
  currentUser: User | null;
  room?: ChatMessageRoomEnum;
  showMenu?: boolean;
  reactions: ReactionsCount[];
};

const props = withDefaults(defineProps<Props>(), {
  showMenu: false,
});
const api = useApi();
const { message, currentUser, showMenu } = toRefs(props);
const notify = useNotify();
const { t } = useI18n();
const userStore: ReturnType<typeof useUserStore> = useUserStore();
const { isStaff } = userStore.session?.user ?? {};
const banCurtainIsRequired = ref<boolean>(false);
const blocked = ref<boolean>(false);
const isReactionMenu = ref(false);
const delButtonIsRequired = computed(() => {
  return (
    currentUser?.value?.permissions?.includes("message_edit") ||
    currentUser?.value?.id === message.value.messageSender.id
  );
});
const banButtonIsRequired = computed(() => {
  return (
    currentUser?.value?.permissions?.includes("user_ban") &&
    currentUser?.value?.id !== message.value.messageSender.id &&
    message.value.messageSender.canBeBanned
  );
});

const hideBanCurtain = (e: PointerEvent) => {
  if (e.pointerType === "mouse") {
    banCurtainIsRequired.value = false;
  }
};

const requestChangeNickname = async () => {
  try {
    await api.chat.requestChangeNickname({
      requestChangeNicknameRequest: {
        userId: message.value.messageSender.id,
      },
    });
  } catch (error: any) {
    const notify = useNotify();
    if (typeof error === "object" && "response" in error) {
      const errorData = await error.response.json();
      if ("detail" in errorData) {
        notify({
          type: "error",
          text: Array.isArray(errorData.detail)
            ? errorData.detail[0]
            : errorData.detail,
        });
      }
    }
  }
};

const ban = (banType: BanTypeEnum) => {
  if (blocked.value) return;
  blocked.value = true;
  const userId = message.value.messageSender.id;
  api.chat
    .ban({
      chatBanRequest: {
        userId,
        banType,
      },
    })
    .then(() => {
      banCurtainIsRequired.value = false;
      emits("show-menu", false);
    })
    .catch((error) => {
      notify({
        type: "error",
        text: error.response.data.detail,
      });
    })
    .finally(() => {
      blocked.value = false;
    });
};

const unban = () => {
  if (blocked.value) return;
  blocked.value = true;
  const userId = message.value.messageSender.id;
  api.chat
    .unban({
      chatUnbanRequest: {
        userId,
      },
    })
    .then(() => {
      emits("show-menu", false);
    })
    .catch(() => {
      notify({
        type: "error",
        text: t("chat.notifications.user_unban_error"),
      });
    })
    .finally(() => (blocked.value = false));
};

const processBanButtonClick = () => {
  if (message.value.messageSender?.banInChat) {
    unban();
  } else {
    banCurtainIsRequired.value = true;
  }
};

async function copyMessage(): Promise<void> {
  return navigator.clipboard
    .writeText(message.value.messageText)
    .then(() => {
      notify({
        text: t("withdraws.notifications.copied"),
      });
    })
    .catch(() => {
      notify({
        type: "error",
        text: t("withdraws.notifications.copy_error"),
      });
    });
}

const deleteMessage = () => {
  if (blocked.value) return;
  blocked.value = true;
  const { id } = message.value;
  api.chat
    .messageDeleteDestroy({ messageId: id })
    .then(() => {
      emits("show-menu", false);
    })
    .catch(() => {
      notify({
        type: "error",
        text: t("chat.notifications.message_delete_error"),
      });
    })
    .finally(() => {
      blocked.value = false;
    });
};

const emits = defineEmits<{
  (
    e: "reply",
    data: {
      userReplyNickname: string;
      userReplyText: string;
      userReplyColor: string;
    },
  ): void;
  (e: "show-menu", data: boolean): void;
  (
    e: "toggle-reaction",
    { isSet, code, id }: { isSet: boolean; code: string; id: number },
  ): void;
  (e: "show-user-settings", data: { id: number; can_be_banned: boolean }): void;
  (e: "delete-message"): void;
}>();

const replyMessage = () => {
  emits("show-menu", false);
  emits("reply", {
    userReplyNickname: message.value.messageSender.nickname,
    userReplyText: message.value.messageText,
    userReplyColor: message.value.messageSender.selectedNicknameDecoration,
  });
};

const showMsgMenu = (e: PointerEvent) => {
  if (!userStore.userIsAuthorized) {
    return;
  }
  if (e.pointerType === "mouse") {
    emits("show-menu", true);
  }
};

const hideMsgMenu = (e: PointerEvent) => {
  if (e.pointerType === "mouse") {
    hideMenu();
  }
};

const hideMenu = () => {
  isReactionMenu.value = false;
  emits("show-menu", false);
};

// При свайпе влево, если мы на планшете или мобильных устройствах
// то добавляется класс сдвигающий сообщение влево
// и уходит запрос на всплытие ответного сообщения
const msg = ref<HTMLElement | null>(null);
const msgReply = ref<HTMLElement | null>(null);

const onTapItem = (e: PointerEvent) => {
  if (
    e.pointerType === "touch" &&
    (e.target as HTMLElement).tagName !== "BUTTON" &&
    userStore.userIsAuthorized
  ) {
    if (!userStore.userIsAuthorized) return;
    if (
      isReactionMenu.value &&
      (e.target as HTMLElement).parentElement?.getAttribute("data-test") !==
        "reaction-menu"
    ) {
      hideMenu();
      return;
    }
    nextTick(() => {
      document
        .querySelectorAll<HTMLElement>('[data-test="hover"]')
        .forEach((n) => {
          n.style.display = "none";
        });
      document
        .querySelectorAll<HTMLElement>('[data-test="ban-curtain"]')
        .forEach((n) => {
          n.style.display = "none";
        });
      const messageEl = (e.target as HTMLDivElement)?.closest(
        '[data-test="reply"]',
      );
      const menuBlock = messageEl?.querySelector<HTMLElement>(
        '[data-test="hover"]',
      );
      const banCurtain = messageEl?.querySelector<HTMLElement>(
        '[data-test="ban-curtain"]',
      );
      if (menuBlock) {
        menuBlock.style.display = "flex";
      }
      if (banCurtain) {
        banCurtain.style.display = "flex";
      }
      emits("show-menu", true);
      isReactionMenu.value = true;
    });
  }
};

const toggleReaction = () => {
  isReactionMenu.value = !isReactionMenu.value;
};

const setReaction = (code: ReactionEnum) => {
  if (!userStore.userIsAuthorized || message.value.messageSender?.banInChat)
    return;
  const id = message.value.id;
  isReactionMenu.value = false;
  hideMenu();
  const isSelf = message.value.reactions.some(
    (item) => item.code === code && item.isReacted,
  );
  emits("toggle-reaction", { isSet: !isSelf, code, id });
  if (!isSelf) {
    api.chat.messagesSetReaction({
      id,
      setRemoveReactionRequest: { reaction: code },
    });
  } else {
    api.chat.messagesRemoveReaction({
      id,
      setRemoveReactionRequest: { reaction: code },
    });
  }
};

const showUserSettings = () => {
  if (!isStaff) {
    return;
  }

  emits("show-user-settings", {
    id: message.value.messageSender.id,
    can_be_banned: message.value.messageSender.canBeBanned,
  });
};
</script>

<style lang="scss" module>
.relative {
  position: relative;

  .pointer {
    cursor: pointer;
    z-index: 5;
  }

  @media screen and (max-width: 800px) {
    &:hover {
      background: var(--general-underlay-2-lvl);
    }
  }
}

.reply__wrapper {
  position: relative;
  padding-left: 20px;
  padding-right: 20px;

  @media screen and (max-width: 800px) {
    &:hover {
      background: var(--bdrop-chat-btn2);
      border-radius: 0.25rem;
    }
  }
}

.replied {
  background: $blue-4;
  border-radius: 10px;
}

.message-wrapper {
  position: relative;
  display: flex;
  gap: 10px;
  padding-bottom: 6px;
  padding-top: 6px;
}

.next-message-wrapper {
  padding-bottom: 6px;
  padding-top: 4px;
}

.swipeLeft {
  transform: translateX(-100px);
  z-index: 1;
}

.message-highlightable {
  background: red;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}

.hover-message {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.avatar-wrapper {
  position: initial;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  transform: scale(1);
}

.deleted {
  width: calc(100% + 40px);
  position: absolute;
  height: 90%;
  margin-left: -20px;
  margin-top: -4px;
  z-index: 0;
  border-radius: 4px;
  background: rgba(255, 64, 47, 0.15);
}

.reactionMenu {
  position: absolute;
  right: 0;
  z-index: 100;
  bottom: 100%;
  padding-bottom: 6px;
  right: 20px;
}

.reactionButton {
  @media screen and (max-width: 800px) {
    display: none !important;
  }
}

.reactions {
  display: flex;
  padding-bottom: 5px;
  gap: 5px;
  flex-wrap: wrap;
  max-width: 260px;
  margin-left: 45px;
}
</style>
