import type { ChatMessagesListLanguageEnum } from "~/api_gen";

export const chatLangToIcon = (lang: ChatMessagesListLanguageEnum) => {
  switch (lang) {
    case "uz":
      return ["fi", "fi-uz"];
    case "ru":
      return ["fi", "fi-ru"];
    case "en":
      return ["fi", "fi-us"];
    default:
      exhaustiveMatchGuard(lang);
  }
};
