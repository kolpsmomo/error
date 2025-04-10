<template>
  <div :class="$style.header">
    <div :class="$style['header-inner-container']">
      <div :class="$style['header-inner-container']">
        <Label />
        <Online :online="online" />
      </div>
      <div
        :class="$style['header-inner-container']"
        data-test="chat-header-inner-container"
      >
        <ChatLang :chat-languages="chatLanguages" />
        <ChatRules
          data-test="chat_rules_btn"
          @click="showRules"
        />
        <IconGear
          v-if="isStaff"
          name="gear"
          data-test="chat_settings_btn"
          @click="emits('show-chat-settings')"
        />
        <CloseButton
          data-test="chat_close_btn"
          @click="emits('hide-chat-area')"
        />
      </div>
    </div>
    <ChatSeparator :class="$style['separator-header']" />
    <div
      :class="[
        $style['header-inner-container'],
        $style['chat-buttons-container'],
      ]"
    >
      <div :class="$style.chatButtons">
        <MainChatButton
          :active="mainChatIsShown"
          data-test="chat_general_room_btn"
          @click="emits('show-main-chat')"
        />
        <GameChatButton
          v-if="!gameChatIsInvisible && !notInGameZone"
          data-test="chat_game_room_btn"
          :game-chat-name="gameChatName"
          :active="gameChatIsShown || privateGameChatIsShown"
          @click="emits('show-game-or-private-chat')"
        />
      </div>
      <SupportButton
        data-test="chat_support_btn"
        @click="openSupport"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Label from "./Header/Label.vue";
import Online from "./Header/Online.vue";
import ChatLang from "./Header/ChatLang.vue";
import MainChatButton from "./Header/MainChatButton.vue";
import GameChatButton from "./Header/GameChatButton.vue";
import CloseButton from "./Header/CloseButton.vue";
import ChatRules from "./Header/ChatRules.vue";
import ChatSeparator from "~/components/Chat/ChartArea/Message/ChatSeparator.vue";
import SupportButton from "./Header/SupportButton.vue";
import type { UserShort, LanguageFull } from "~/api_gen";

type Props = {
  online: number;
  mainChatIsShown: boolean;
  gameChatIsShown: boolean;
  privateGameChatIsShown: boolean;
  gameChatName?: string;
  moderator: UserShort | null;
  isStaff: boolean;
  gameChatIsInvisible: boolean;
  notInGameZone: boolean;
  chatLanguages: Array<LanguageFull>;
};

const userStore = useUserStore();
const props = defineProps<Props>();
const {
  online,
  mainChatIsShown,
  gameChatIsShown,
  privateGameChatIsShown,
  gameChatName,
  isStaff,
} = toRefs(props);
const emits = defineEmits<{
  (e: "show-rules", data: { rulesIsAvailable: boolean }): void;
  (e: "hide-chat-area"): void;
  (e: "show-main-chat"): void;
  (e: "show-chat-settings"): void;
  (e: "show-game-or-private-chat"): void;
}>();
const showRules = () => {
  emits("show-rules", {
    rulesIsAvailable: true,
  });
};
const openSupport = () => {
  emits("hide-chat-area");
  userStore.openSupport();
};
</script>

<style lang="scss" module>
.header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-left: -0.25rem;
  margin-right: -0.25rem;
  margin-bottom: 1rem;
  background: var(--bdrop-chat-area);

  &:before {
    content: "";
    position: absolute;
    height: 1rem;
    width: 100%;
    margin-left: -24px;
    filter: blur(1px);
    z-index: -1;
    bottom: -1rem;
  }

  .separator-header {
    margin-left: -1.5rem;
    width: calc(100% + 1.5rem * 2);
  }
}

.header-inner-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 32px;
    height: 32px;
    padding: 5px 6px;
    fill: var(--general-white);
    cursor: pointer;

    &:hover {
      border-radius: 10px;
      background: var(--bdrop-chat-button-hover);
    }
    path {
      fill: var(--general-white);
    }
  }
}

.chat-buttons-container {
  border-radius: 10px;
  gap: 0.5rem;
}

.chatButtons {
  display: flex;
  gap: 8px;
}
</style>
