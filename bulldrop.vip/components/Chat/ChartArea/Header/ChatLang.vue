<template>
  <div :class="$style['chat-lang-wrapper']">
    <div :class="$style['chat-lang-active']">
      <span :class="['fi', chatLangIconClass]"></span>
    </div>
    <div :class="$style.separator"></div>
    <IconBars
      :class="[$style.arrow, isShown && $style['arrow--up']]"
      @click="isShown = !isShown"
    />
    <transition name="theme">
      <ChatLangItems
        v-if="isShown"
        :chat-languages="chatLanguages"
        @hide-language="isShown = !isShown"
      />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import type { LanguageFull } from "~/api_gen";
import ChatLangItems from "./ChatLang/ChatLangItems.vue";
import { chatLangToIcon } from "../chatLangToIcon";

type Props = {
  chatLanguages: Array<LanguageFull>;
};
const props = defineProps<Props>();
const { chatLanguages } = toRefs(props);
const isShown = ref(false);
const chatStore = useChatStore();

const chatLangIconClass = computed(() => chatLangToIcon(chatStore.chatLang));
</script>

<style lang="scss" module>
.chat-lang-wrapper {
  display: flex;
  border: 0.6px solid var(--general-stroke);
  border-radius: $br8;
  .separator {
    width: 0.6px;
    height: 32px;
    background: var(--general-stroke);
  }
  svg {
    width: 20px;
    height: 24px;
    padding: 4px 10px !important;
    &:hover {
      background: transparent !important;
    }
  }
  .arrow {
    transition: transform 0.2s linear;
    &--up {
      transform: rotate(180deg);
    }
  }
  .chat-lang-active {
    padding: 0 10px;
    display: flex;
    span {
      margin: auto;
    }
  }
}
.theme-enter-from,
.theme-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
.theme-enter-active,
.theme-leave-active {
  transition: 0.25s;
}
</style>
