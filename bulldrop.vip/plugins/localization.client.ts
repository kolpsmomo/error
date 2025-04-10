import type { LanguageB27Enum } from "~/api_gen";

export default defineNuxtPlugin((nuxtApp) => {
  const userStore = useUserStore();
  nuxtApp.hook("i18n:localeSwitched", ({ newLocale }) => {
    if (!userStore.session.user) return;
    userStore.session.user.language = newLocale as LanguageB27Enum;
    useApi().user.setLanguage({
      languageRequest: {
        language: newLocale as LanguageB27Enum,
      },
    });
  });

  userStore.$subscribe((_, state) => {
    const i18n = nuxtApp.vueApp.$nuxt.$i18n;
    if (!state.session.user) return;
    const language = state.session.user.language;
    if (!language || language === i18n.locale.value) return;

    useApi().user.setLanguage({
      languageRequest: {
        language: i18n.locale.value as LanguageB27Enum,
      },
    });
    state.session.user.language = i18n.locale.value as LanguageB27Enum;
  });
});
