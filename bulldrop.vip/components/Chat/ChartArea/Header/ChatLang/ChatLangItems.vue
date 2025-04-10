<template>
  <div :class="$style.themes">
    <div
      v-for="(item, value) in chatLanguages"
      :key="value"
      :class="[
        $style['themes-item'],
        item.code === chatStore.chatLang && $style['active'],
      ]"
      @click="changeChatLang(item.code)"
    >
      <!-- Такие стили обусловлены библиотекой flag-icons -->
      <span :class="['fi', chatLangToIcon(item.code)]"></span>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { chatLangToIcon } from "../../chatLangToIcon";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import type { LanguageFull, ChatMessagesListLanguageEnum } from "~/api_gen";

type Props = {
  chatLanguages: Array<LanguageFull>;
};

const props = defineProps<Props>();
const chatStore = useChatStore();
const { chatLanguages } = toRefs(props);

const emits = defineEmits<{
  (e: "hide-language"): void;
}>();

const changeChatLang = (lang: ChatMessagesListLanguageEnum) => {
  {
    chatStore.chatLang = lang;
    emits("hide-language");
  }
};
</script>

<style lang="scss" module>
.themes {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-top: 36px;
  margin-left: calc(55% / (-2));
  gap: var(--spacing-xs);
  padding: 8px;
  border-radius: 18px;
  border: 0.6px solid var(--general-stroke);
  background: var(--general-underlay-3-lvl);
  z-index: 999;
  .themes-item {
    display: flex;
    gap: 8px;
    padding: 14px;
    border-radius: 14px;
    &:hover {
      cursor: pointer;
      background: var(--button-ghost-hover);
    }
  }
}
.active {
  background: var(--button-ghost-hover);
}
</style>
