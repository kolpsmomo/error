import type { Reactions, ChatMessagesListLanguageEnum } from "~/api_gen";

export const useChatStore = defineStore("chatStore", () => {
  const reactions = ref<Reactions[] | null>(null);
  const chatLang = ref<ChatMessagesListLanguageEnum>("ru");
  const api = useApi();

  const getReactions = async () => {
    api.chat
      .reactionsList()
      .then((response: Reactions[]) => {
        reactions.value = response;
      })
      .catch(() => {});
  };

  return {
    reactions,
    chatLang,
    getReactions,
  };
});
