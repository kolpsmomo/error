<template>
  <div
    :class="$style['chat-area']"
    data-target="chat-area"
  >
    <div
      v-show="!showChatSettings && !showUserSettings"
      style="height: 100%"
    >
      <Header
        :online="online"
        :main-chat-is-shown="mainChatIsShown"
        :game-chat-is-shown="gameChatIsShown"
        :private-game-chat-is-shown="privateGameChatIsShown"
        :game-chat-name="gameChatName"
        :game-chat-is-invisible="Boolean(gameChatIsInvisible)"
        :not-in-game-zone="Boolean(notInGameZone)"
        :moderator="moderator"
        :is-staff="userStore.session.user?.isStaff ?? false"
        :chat-languages="chatLanguages"
        @show-main-chat="showMainChat"
        @show-chat-settings="setChatSettings"
        @show-game-or-private-chat="showGameOrPrivateChat"
        @hide-chat-area="$emit('hide-chat-area')"
        @show-rules="showRules"
      />
      <ChatSeparator class="separator-wrapper" />
      <Body
        ref="chatBody"
        :text-reply="textReply"
        :nickname-reply="nicknameReply"
        :nickname-color="nicknameColor"
        :is-nickname-change-requested="isNicknameChangeRequested"
        @scroll="processScrolling"
        @close-reply="closeReplyText"
      >
        <CriticalErrorComp v-if="criticalErrorOccured">{{
          criticalError
        }}</CriticalErrorComp>
        <template v-else>
          <template v-if="requestForLastMessagesWasMade">
            <template v-if="messages.length">
              <MessageComponent
                v-for="(message, index) in transformedMessages"
                :key="index"
                :message="message"
                :current-user="currentUser"
                :show-menu="message.showMenu"
                :room="room"
                :reactions="message.reactions"
                @show-menu="(val: boolean) => toggleMenu(index, val)"
                @reply="reply"
                @toggle-reaction="makeReactionFromSelf"
                @show-user-settings="setUserSettings"
              />
            </template>
            <NoMessages v-else />
          </template>
          <LoadingSpinner v-else />
        </template>
      </Body>
      <NewMessage
        v-if="isNewMessage"
        @click="scrollBodyToBottom"
      />
      <ChatSeparator />
      <ChangeNicknamePopup
        v-if="isNicknameChangeRequested"
        @hide-chat-area="$emit('hide-chat-area')"
      />
      <MessageForm
        v-if="userStore.userIsAuthorized && !banInChat"
        :main-chat-is-shown="mainChatIsShown"
        :game-chat-is-shown="gameChatIsShown"
        :private-game-chat-is-shown="privateGameChatIsShown"
        :room="room"
        :room-id="roomId"
        :message-sending-is-disabled="messageSendingIsDisabled"
        :nickname-reply="nicknameReply"
        @reply="reply"
      />
      <UserBanned
        v-else-if="userStore.userIsAuthorized && banInChat"
        :ban-in-chat="banInChat"
        @showChatUnban="showChatUnban"
      />
      <AuthIsRequired v-else />
    </div>
    <UserSettings
      v-show="showUserSettings"
      :user-id="userid"
      :can-be-banned="userCanBeBanned"
      :room="room"
      :is-shown="showUserSettings"
      :messages="messages"
      @hide-user-settings="hideUserSettings"
      @hide-chat-area="$emit('hide-chat-area')"
    />
    <ChatSettings
      v-show="showChatSettings"
      :cooldown="cooldown"
      @hide-chat-settings="hideChatSettings"
      @hide-chat-area="$emit('hide-chat-area')"
    />
    <transition name="chat-rules">
      <ChatModal
        v-if="chatRulesIsRequired"
        @hide-chat-rules="hideChatModalModal"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { User } from "~/types";
import type { Message, MessageReactionType, MessageWS } from "~/types";
import type { MessageWithMenu } from "~/types";

import Header from "./ChartArea/Header.vue";
import Body from "./ChartArea/Body.vue";
import MessageComponent from "./ChartArea/Message.vue";
import NoMessages from "./ChartArea/NoMessages.vue";
import CriticalErrorComp from "./ChartArea/CriticalError.vue";
import MessageForm from "./ChartArea/MessageForm.vue";
import AuthIsRequired from "./ChartArea/AuthIsRequired.vue";
import UserBanned from "./ChartArea/UserBanned.vue";
import ChatModal from "./ChatModal.vue";
import NewMessage from "./ChartArea/NewMessage.vue";
import ChatSeparator from "~/components/Chat/ChartArea/Message/ChatSeparator.vue";
import UserSettings from "~/components/Chat/ChartArea/UserSettings/UserSettings.vue";
import ChatSettings from "~/components/Chat/Settings/ChatSettings.vue";
import ChangeNicknamePopup from "~/components/Chat/ChartArea/ChangeNicknamePopup.vue";

import type {
  Ban,
  UserShort,
  ChatMessageFull,
  PaginatedChatMessageFullList,
  ChatMessageRoomEnum,
  LanguageFull,
  ChatMessagesListLanguageEnum,
} from "~/api_gen";
import {
  ChatMessageFromJSONTyped,
  MessageSenderFromJSONTyped,
} from "~/api_gen";

defineProps<{
  online: number;
}>();

// массив игр, в которых нужно отображать игровые комнаты
const api = useApi();
const platform = usePlatform();
const chatStore = useChatStore();
const gamesArray = ["roulette", "crash", "coin", "wheel", "wheel_game"];
const { t } = useI18n();
const route = useRoute();
const userStore: ReturnType<typeof useUserStore> = useUserStore();
const notify = useNotify();
const connection = ref<WebSocket | null>(null);
const messages = ref<MessageWithMenu[]>([]);
const currentReconnectionAttempt = ref<number>(0);
const maxReconnectionsAttempts = ref<number>(3);
const requestForLastMessagesWasMade = ref<boolean>(false);
const criticalErrorOccured = ref<boolean>(false);
const criticalError = ref<string>("");
const bodyScrollingProcessIsBlocked = ref<boolean>(false);
const downloadMoreIsBlocked = ref<boolean>(false);
const lastUsedMessageId = ref<number | null>(null);
const mainChatIsShown = ref<boolean>(false);
const gameChatIsShown = ref<boolean>(false);
const privateGameChatIsShown = ref<boolean>(false);
const room = ref<ChatMessageRoomEnum>("main");
const roomId = ref<number | undefined>(undefined);
const userid = ref<number | null>(null);
const messageSendingIsDisabled = ref<boolean>(false);
const gameChatName = ref<string>("");
const chatRulesIsRequired = ref<boolean>(false);
const nicknameReply = ref<string>("");
const nicknameColor = ref<string>("");
const textReply = ref<string>("");
const isNewMessage = ref<boolean>(false);
const nextUrl = ref<string | null | undefined>("");
const reconnectionTimeout = ref<ReturnType<typeof setTimeout> | null>(null);
const isReactionFromSelf = ref(false);
const banInChat = ref<Ban | null>(null);
const moderator = ref<UserShort | null>(null);
const isNicknameChangeRequested = ref<boolean>(false);
const showUserSettings = ref<boolean>(false);
const showChatSettings = ref<boolean>(false);
const cooldown = ref<number>(0);
const notInGameZone = ref<boolean>(false);
const userCanBeBanned = ref<boolean>(true);
const chatBody = ref<{ $el: HTMLDivElement } | null>(null);
const chatLanguages = ref<Array<LanguageFull>>([]);
const currentUser = computed(() => {
  return userStore.session?.user;
});

type Meta = {
  chat: {
    name: string;
    gameChannel: boolean;
    room: ChatMessageRoomEnum;
    private?: boolean;
    noGameChanel?: boolean;
  };
};

const mainChatIsRequired = computed<boolean>(() => {
  try {
    const meta = route.meta as Meta;
    return !mainChatIsShown.value && !meta.chat.gameChannel;
  } catch (e) {
    return true;
  }
});

const gameChatIsRequired = computed(() => {
  try {
    const meta = route.meta as Meta;
    const gameChatHasToBeShown =
      !gameChatIsShown.value && meta.chat.gameChannel && !meta.chat.private;
    const gameRoomIsChanged =
      meta.chat.room && meta.chat.room !== room.value && !meta.chat.private;
    return gameChatHasToBeShown || gameRoomIsChanged;
  } catch (e) {
    return false;
  }
});

const gameChatIsInvisible = computed(() => {
  try {
    const meta = route.meta as Meta;
    if (!gamesArray.includes(meta.chat.name)) {
      return true;
    }
    return meta.chat && meta.chat.noGameChanel;
  } catch (e) {
    return false;
  }
});

const toggleMenu = (index: number, val: boolean) => {
  if (!messages.value[index]) return;
  messages.value[index].showMenu = val;
};

const privateGameChatIsRequired = computed<boolean>(() => {
  try {
    const meta = route.meta as Meta;
    return (
      !privateGameChatIsShown.value &&
      meta.chat.gameChannel &&
      !!meta.chat.private
    );
  } catch (e) {
    return false;
  }
});

const setUserSettings = ({
  id,
  can_be_banned,
}: {
  id: number;
  can_be_banned: boolean;
}) => {
  try {
    setUserId(id);
    setUserCanBeBanned(can_be_banned);
    showUserSettings.value = true;
  } catch (e: unknown) {
    notify({
      type: "error",
      text: (e as Error).message,
    });
  }
};

const setChatSettings = async () => {
  try {
    await getChatInfo();
    showChatSettings.value = true;
  } catch (e: unknown) {
    notify({
      type: "error",
      text: (e as Error).message,
    });
  }
};

const setUserId = (id: number) => {
  userid.value = id;
};

const setUserCanBeBanned = (val: boolean) => {
  userCanBeBanned.value = val;
};

const checkPath = () => {
  if (!route.path.includes("/games")) {
    notInGameZone.value = true;
  } else {
    notInGameZone.value = false;
  }
};

watch(
  () => route.path,
  () => {
    checkPath();
    if (mainChatIsRequired.value) {
      showMainChat();
    } else if (gameChatIsRequired.value) {
      showGameChat();
    } else if (privateGameChatIsRequired.value) {
      showPrivateGameChat();
    }
  },
);

watch(
  () => userStore.userIsAuthorized,
  async (authorized) => {
    banInChat.value = null;
    if (authorized) {
      destroyConnection();
      createConnection();
    }
  },
);

watch(
  () => chatStore.chatLang,
  async (newLang) => {
    if (newLang) {
      destroyConnection();
      createConnection();
    }
  },
);

onBeforeMount(() => {
  if (mainChatIsRequired.value) {
    showMainChat();
  } else if (gameChatIsRequired.value) {
    showGameChat();
  } else if (privateGameChatIsRequired.value) {
    showPrivateGameChat();
  }
  getChatInfo();
});
const { locale } = useI18n();
onMounted(() => {
  // Чтобы при перезагрузке страницы чат выбирал нужный язык
  // проверяем локаль

  const chatLocales = ["uz", "ru", "en"];
  if (chatLocales.includes(locale.value)) {
    chatStore.chatLang = locale.value as ChatMessagesListLanguageEnum;
  } else {
    chatStore.chatLang = "ru";
  }

  checkLocal();
});

onBeforeUnmount(() => {
  destroyConnection();
});

const checkLocal = () => {
  if (!localStorage.showChatRules) {
    chatRulesIsRequired.value = true;
    localStorage.setItem(
      "showChatRules",
      JSON.stringify(chatRulesIsRequired.value),
    );
  } else return;
};

const createConnection = () => {
  checkPath();
  let isMainChatConnection = false;
  if (mainChatIsShown.value) {
    connection.value = useWebsocket(
      `/ws/chat/game/main/${platform.code}/?language=${chatStore.chatLang}&`,
    );
    isMainChatConnection = true;
  }
  if (!gamesArray.includes(room.value)) {
    gameChatIsShown.value = false;
    mainChatIsShown.value = true;
    room.value = "main";
    if (!isMainChatConnection) {
      connection.value = useWebsocket(
        `/ws/chat/game/main/${platform.code}/?language=${chatStore.chatLang}&`,
      );
    }
  }
  if (gameChatIsShown.value) {
    connection.value = useWebsocket(
      `/ws/chat/game/${room.value}/${platform.code}/?language=${chatStore.chatLang}&`,
    );
  }
  if (privateGameChatIsShown.value) {
    if (!userStore.userIsAuthorized) {
      criticalError.value = t("misc.auth_is_required");
      criticalErrorOccured.value = true;
      messageSendingIsDisabled.value = true;
      return;
    }
    connection.value = useWebsocket(
      `/ws/chat/game/${room.value}/${roomId.value}/`,
    );
  }
  if (connection.value) {
    connection.value.onopen = processOpenedConnection;
    connection.value.onclose = processClosedConnection;
  }
};

const destroyConnection = () => {
  if (connection.value) {
    connection.value.close();
  }
  if (reconnectionTimeout.value) {
    clearTimeout(reconnectionTimeout.value);
  }
};

const dropChatState = () => {
  messages.value = [];
  requestForLastMessagesWasMade.value = false;
  criticalError.value = "";
  criticalErrorOccured.value = false;
  currentReconnectionAttempt.value = 0;
  roomId.value = undefined;
  room.value = "main";
  messageSendingIsDisabled.value = false;
  gameChatName.value = "";
};

const processOpenedConnection = async () => {
  if (connection.value) {
    connection.value.onerror = processConnectionError;
    connection.value.onmessage = processConnectionMessage;
  }

  await chatStore.getReactions();
  getLastMessages();
};

const processClosedConnection = (event: CloseEvent) => {
  if (!event.wasClean) {
    if (currentReconnectionAttempt.value < maxReconnectionsAttempts.value) {
      currentReconnectionAttempt.value += 1;
      requestForLastMessagesWasMade.value = false;
      reconnectionTimeout.value = setTimeout(
        createConnection,
        Math.floor(Math.random() * 2000),
      );
    } else {
      requestForLastMessagesWasMade.value = true;
      criticalErrorOccured.value = true;
      criticalError.value = t("chat.notifications.connection_error", {
        reconnectionAttempt: currentReconnectionAttempt.value.toString(),
      });
      messageSendingIsDisabled.value = true;
    }
  }
};

const processConnectionError = () => {};

const processConnectionMessage = (event: MessageEvent) => {
  const eventData = JSON.parse(event.data);
  const { type, data } = eventData;

  switch (type) {
    case "new_message":
      processNewMessage(data);
      break;

    case "user_was_baned":
      processUserWasBanned(data);
      break;

    case "user_was_unbaned":
      processUserWasUnbanned(data);
      break;

    case "delete_message":
      processDeleteMessage(data);
      break;

    case "set_reaction":
      processNewReaction(data);
      break;

    case "remove_reaction":
      processRemoveReaction(data);
      break;

    case "user_updated":
      processUpdateUserData(data);
  }
};

const getChatInfo = () => {
  return api.chat
    .retrieve()
    .then((data) => {
      banInChat.value = data.ban;
      moderator.value = data.moderator;
      cooldown.value = data.cooldown;
      isNicknameChangeRequested.value = data.isNicknameChangeRequested ?? false;
      chatLanguages.value = data.languages;
    })
    .catch(() => {});
};

const processNewMessage = (data: MessageWS) => {
  const dataParsed: MessageWithMenu = {
    ...(ChatMessageFromJSONTyped(data, true) as unknown as MessageWithMenu),
    messageSender: {
      id: data.message_sender.id,
      avatar: data.message_sender.avatar,
      avatarBorder: data.message_sender.avatar_border,
      banInChat: data.message_sender.ban_in_chat,
      canBeBanned: data.message_sender.can_be_banned,
      endBanDate: data.message_sender.end_ban_date,
      isContentCreator: data.message_sender.is_content_creator,
      isForeverBanned: data.message_sender.is_forever_banned,
      isModerator: data.message_sender.is_moderator,
      isNicknameChangeRequested:
        data.message_sender.is_nickname_change_requested,
      isStaff: data.message_sender.is_staff,
      nickname: data.message_sender.nickname,
      selectedNicknameDecoration:
        data.message_sender.selected_nickname_decoration,
    },
  };

  messages.value.push(dataParsed);
  let bodyHeightDiff =
    (chatBody.value?.$el as HTMLDivElement).scrollHeight -
    (chatBody.value?.$el as HTMLDivElement).scrollTop;
  if (bodyHeightDiff > 1500) {
    isNewMessage.value = true;
  } else nextTick(scrollBodyToBottom);
};

const findMessageIndex = (id: number) => {
  return messages.value.findIndex((item) => item.id === id);
};

type ReactionLocallyType = {
  id: number;
  code: string;
  isReacted?: boolean;
};

const setReactionLocally = ({ id, code, isReacted }: ReactionLocallyType) => {
  const messageIndex = findMessageIndex(id);
  if (messageIndex !== -1) {
    // todo reactions as array
    const reactionIndex = messages.value[messageIndex].reactions.findIndex(
      (item) => item.code === code,
    );
    if (reactionIndex !== -1) {
      let count = messages.value[messageIndex].reactions[reactionIndex].count;
      messages.value[messageIndex].reactions[reactionIndex].count = ++count;
      if (isReacted !== undefined)
        messages.value[messageIndex].reactions[reactionIndex].isReacted =
          isReacted;
    } else {
      messages.value[messageIndex].reactions.push({
        code,
        count: 1,
        isReacted: isReacted || false,
      });
    }
  }
};

const removeReactionLocally = ({
  id,
  code,
  isReacted,
}: ReactionLocallyType) => {
  const messageIndex = findMessageIndex(id);
  if (messageIndex !== -1) {
    // todo reactions as array
    const reactionIndex = messages.value[messageIndex].reactions.findIndex(
      (item) => item.code === code,
    );
    if (reactionIndex !== -1) {
      let count = messages.value[messageIndex].reactions[reactionIndex].count;
      if (count <= 1) {
        // @ts-ignore
        messages.value[messageIndex].reactions = [
          ...messages.value[messageIndex].reactions.filter(
            (item, index) => index !== reactionIndex,
          ),
        ];
      } else {
        messages.value[messageIndex].reactions[reactionIndex].count = --count;
        if (isReacted !== undefined)
          messages.value[messageIndex].reactions[reactionIndex].isReacted =
            isReacted;
      }
    }
  }
};

const makeReactionFromSelf = ({
  isSet,
  code,
  id,
}: {
  isSet: boolean;
  code: string;
  id: number;
}) => {
  isReactionFromSelf.value = true;
  if (isSet) {
    setReactionLocally({ id, code, isReacted: true });
  } else {
    removeReactionLocally({ id, code, isReacted: false });
  }
};

const processNewReaction = (data: MessageReactionType) => {
  if (isReactionFromSelf.value) {
    isReactionFromSelf.value = false;
    return;
  }
  setReactionLocally({ id: data.message_id, code: data.reaction });
};

const processRemoveReaction = (data: MessageReactionType) => {
  if (isReactionFromSelf.value) {
    isReactionFromSelf.value = false;
    return;
  }
  removeReactionLocally({
    id: data.message_id,
    code: data.reaction,
  });
};

const getLastMessages = () => {
  if (mainChatIsShown.value) {
    api.chat
      .chatMessagesList({ room: "main", language: chatStore.chatLang })
      .then(thenable)
      .catch(errorHandler)
      .finally(final);
  }
  if (gameChatIsShown.value) {
    api.chat
      .chatMessagesList({ room: room.value, language: chatStore.chatLang })
      .then(thenable)
      .catch(errorHandler)
      .finally(final);
  }
  if (privateGameChatIsShown.value && roomId.value) {
    api.chat
      .chatMessagesRoomList({
        room: room.value,
        roomId: roomId.value,
      })
      .then(thenable)
      .catch(errorHandler)
      .finally(final);
  }

  function thenable(response: PaginatedChatMessageFullList) {
    nextUrl.value = response.next;
    messages.value = response.results!.reverse();
  }

  function errorHandler() {}

  function final() {
    requestForLastMessagesWasMade.value = true;
    nextTick(scrollBodyToBottom);
  }
};

const scrollBodyToBottom = () => {
  const body = chatBody.value?.$el;
  if (!body) return;
  body.scrollTop = body.scrollHeight;
  isNewMessage.value = false;
};

const processScrolling = () => {
  if (bodyScrollingProcessIsBlocked.value) {
    return;
  }
  const body = chatBody.value?.$el as HTMLDivElement;
  let bodyHeightDiff = body?.scrollHeight - body?.scrollTop;
  bodyScrollingProcessIsBlocked.value = true;
  if (body?.scrollTop <= 500) {
    downloadMoreChatMessages();
  } else if (bodyHeightDiff > 500 && bodyHeightDiff < 1500) {
    isNewMessage.value = false;
  }
  setTimeout(() => {
    bodyScrollingProcessIsBlocked.value = false;
  }, 200);
};

const downloadMoreChatMessages = async () => {
  if (downloadMoreIsBlocked.value) {
    return;
  }
  const lastMessageId = messages.value.length ? messages.value[0].id : null;
  if (!lastMessageId || lastUsedMessageId.value === lastMessageId) {
    return;
  }
  downloadMoreIsBlocked.value = true;
  let normalizationIsRequired, previousMessagesLength, initialBodyScrollTop;
  try {
    let response;
    let cursor;
    if (nextUrl.value) {
      const urlParams = new URL(nextUrl.value).searchParams;
      cursor = urlParams.get("cursor") as string;
    }
    if (mainChatIsShown.value) {
      response = await api.chat.chatMessagesList({
        room: "main",
        cursor,
        language: chatStore.chatLang,
      });
      nextUrl.value = response?.next;
    } else if (gameChatIsShown.value) {
      response = await api.chat.chatMessagesList({
        room: room.value,
        cursor,
        language: chatStore.chatLang,
      });
      nextUrl.value = response?.next;
    } else if (privateGameChatIsShown.value) {
      response = await api.chat.chatMessagesRoomList({
        room: room.value,
        cursor,
        roomId: roomId.value as number,
      });
      nextUrl.value = response?.next;
    }

    const previousMessages = response?.results!.reverse();
    if (previousMessages?.length) {
      normalizationIsRequired = true;
      previousMessagesLength = previousMessages?.length;
      initialBodyScrollTop = (chatBody.value?.$el as HTMLDivElement).scrollTop;
      messages.value.unshift(...previousMessages);
    }
  } catch (e) {
    /* empty */
  } finally {
    downloadMoreIsBlocked.value = false;
    lastUsedMessageId.value = lastMessageId;
    const body = chatBody.value?.$el;
    if (body && normalizationIsRequired) {
      await nextTick();
      const bodyInnerContainer = body.children[0];
      let additionalScrollTop = 0;
      const marginBottom = parseFloat(
        getComputedStyle(bodyInnerContainer.children[0]).marginBottom,
      );
      for (let i = 0; i < messages.value.length; i++) {
        if (i === previousMessagesLength) {
          break;
        }
        additionalScrollTop +=
          (bodyInnerContainer.children[i]?.scrollHeight || 0) + marginBottom;
      }
      body.scrollTop = additionalScrollTop + (initialBodyScrollTop as number);
    }
  }
};

const processUserWasBanned = (data: { user: User; end_ban_date: string }) => {
  const currentUserId = currentUser.value?.id;
  const bannedUserId = data.user.id;
  if (currentUserId === bannedUserId) {
    setTimeout(() => {
      userStore.markUserAsBannedInChat();
      getChatInfo();
    }, 3000);
  }
  messages.value.forEach((message: ChatMessageFull) => {
    if (message.messageSender.id === bannedUserId) {
      // @ts-ignore
      message.messageSender.banInChat = true;
      message.messageSender.endBanDate = data.end_ban_date as unknown as Date;
    }
  });
};

const processUserWasUnbanned = (data: { id: number }) => {
  const currentUserId = currentUser.value?.id;
  const unbannedUserId = data.id;
  if (currentUserId === unbannedUserId) {
    userStore.markUserAsUnbannedInChat();
    banInChat.value = null;
  }
  messages.value.forEach((message: ChatMessageFull) => {
    if (message.messageSender.id === unbannedUserId) {
      // @ts-ignore
      message.messageSender.banInChat = false;
    }
  });
};

const processDeleteMessage = (data: Message) => {
  const { id } = data;
  for (let i = 0; i < messages.value.length; i++) {
    if (messages.value[i].id === id) {
      const nextMessage = messages.value[i + 1];
      if (
        nextMessage &&
        nextMessage.redundant &&
        !userStore?.session.user?.isStaff
      ) {
        nextMessage.redundant = false;
        messages.value.splice(i, 1);
        return;
      }
      // @ts-ignore
      messages.value[i].deleted = new Date().toLocaleString();
      break;
    }
  }
};

const processUpdateUserData = async (data: {
  is_nickname_change_requested: boolean;
  nickname: string;
  id: number;
}) => {
  if (data.id === currentUser.value?.id) {
    isNicknameChangeRequested.value =
      data.is_nickname_change_requested ?? false;
    userStore.session.user!.nickname = data.nickname;
  }
  const dataSender = MessageSenderFromJSONTyped(data, true);

  messages.value.forEach((message) => {
    if (message.messageSender.id === data.id) {
      message.messageSender = dataSender;
    }
  });
};

const showMainChat = () => {
  dropChatState();
  gameChatIsShown.value = false;
  privateGameChatIsShown.value = false;
  mainChatIsShown.value = true;
  destroyConnection();
  createConnection();
};

const showGameChat = () => {
  try {
    dropChatState();
    mainChatIsShown.value = false;
    privateGameChatIsShown.value = false;
    gameChatIsShown.value = true;
    room.value = (route.meta as Meta).chat.room;
    gameChatName.value = t(`side_panel.${(route.meta as Meta).chat.name}`);
    destroyConnection();
    createConnection();
  } catch (e) {
    criticalError.value = t("chat.notifications.game_chat_page_error");
    criticalErrorOccured.value = true;
    messageSendingIsDisabled.value = true;
  }
};

const showPrivateGameChat = () => {
  try {
    dropChatState();
    mainChatIsShown.value = false;
    gameChatIsShown.value = false;
    privateGameChatIsShown.value = true;
    room.value = (route.meta as Meta).chat.room;
    gameChatName.value = t(`side_panel.${(route.meta as Meta).chat.name}`);
    roomId.value = +route.params.id;
    destroyConnection();
    createConnection();
  } catch (e) {
    criticalError.value = t("chat.notifications.private_chat_page_error");
    criticalErrorOccured.value = true;
    messageSendingIsDisabled.value = true;
  }
};

const showGameOrPrivateChat = () => {
  if (privateGameChatIsRequired.value) {
    showPrivateGameChat();
  } else {
    showGameChat();
  }
};

/**
 * Данный метод предназначен для преобразования массива сообщений.
 * Здесь можно добавлять данные в объект сообщения, удалять из него,
 * преобразовывать иным образом необходимым для его отображения.
 *
 * Результатом должен быть массив, каждый элемент которого это объект сообщения.
 */
const transformedMessages = computed<MessageWithMenu[]>(() => {
  return markRedundant(messages.value);
});

/**
 * Добавляет индикатор "redundant", который примет значение true, если сообщение
 * оставлено тем же пользователем, что и предыдущее.
 *
 * Результатом должен быть массив, каждый элемент которого это объект сообщения.
 */
const markRedundant = (messages: MessageWithMenu[]): MessageWithMenu[] => {
  if (!messages.length || messages.length === 1) {
    return messages;
  }
  let filteredMessages = messages;
  if (!userStore?.session.user?.isStaff) {
    filteredMessages = messages.filter(({ deleted }) => !deleted);
  }
  for (let i = 1; i < filteredMessages.length; i++) {
    const prevMessage = filteredMessages[i - 1];
    const curMessage = filteredMessages[i];
    if (curMessage?.messageSender?.id === prevMessage?.messageSender?.id) {
      curMessage.redundant = true;
    }
  }

  return messages;
};

const showRules = (data: { rulesIsAvailable: boolean }) => {
  chatRulesIsRequired.value = data.rulesIsAvailable;
};

const reply = (data: {
  userReplyNickname: string;
  userReplyText?: string;
  userReplyColor?: string;
}) => {
  nicknameReply.value = data.userReplyNickname;
  textReply.value = data.userReplyText as string;
  nicknameColor.value = data.userReplyColor ?? "";
};

const hideChatModalModal = () => {
  chatRulesIsRequired.value = false;
};

const closeReplyText = (data: {
  userReplyNickname: string;
  userReplyText: string;
}) => {
  nicknameReply.value = data.userReplyNickname;
  textReply.value = data.userReplyText;
};

const showChatUnban = () => {
  userStore.markUserAsUnbannedInChat();
  banInChat.value = null;
};

const hideChatSettings = () => {
  showChatSettings.value = false;
  messages.value.forEach((message) => {
    message.showMenu = false;
  });
  nextTick(() => {
    scrollBodyToBottom();
  });
};

const hideUserSettings = () => {
  showUserSettings.value = false;
  messages.value.forEach((message) => {
    message.showMenu = false;
  });
};
</script>

<style lang="scss">
.chat-rules-enter-from,
.chat-rules-leave-to {
  opacity: 0;
}

.chat-rules-enter-active,
.chat-rules-leave-active {
  transition: 0.25s;
}
</style>

<style lang="scss" module>
.chat-area {
  position: fixed;
  right: 15px;
  bottom: 4px;
  z-index: 100;
  height: 90vh;
  width: 475px;
  padding: 20px 4px 4px;
  border: 0.6px solid var(--general-stroke);
  border-radius: $br20;
  overflow: hidden;
  background-color: var(--bdrop-chat-area);
  @media screen and (max-width: 800px) {
    top: 12px;
    left: 8px;
    right: 8px;
    bottom: 0;
    z-index: 1000;
    width: auto;
    height: calc(100dvh - 82px);
    border-radius: 16px;
    border: none;
  }
}
</style>
