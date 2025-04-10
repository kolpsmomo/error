import FingerprintJs from "@fingerprintjs/fingerprintjs";

import type { User, Socials, DefaultAvatar, AvatarBorder } from "~/api_gen";
import type { AuthFormNames } from "~/types";
import { removeTokens } from "~/utils/tokens/removeTokens";
import { normalize } from "~/utils/url/normalize";
import { useMonthCookie } from "~/utils/cookie";
import { usePlatformSelection } from "~/composables/app/usePlatformSelection";

const USER_ID_COOKIE_NAME = "userId";

export const useUserStore = defineStore("userStore", () => {
  const session = ref<{
    isAuth: boolean;
    user: User | null;
  }>({
    isAuth: false,
    user: null,
  });
  const socialIds = ref<Socials | null>(null);
  const vkUnbindDate = ref<{
    days: number;
    hours: number;
    minutes: number;
    second: number;
  } | null>(null);
  const bonusRub = ref(0);
  const bonusGold = ref(0);
  const authPopupIsRequired = ref(false);
  const onboardingPopupIsRequired = ref(false); // introduction popup
  const nameRegisterPopupIsRequired = ref(false);
  const authForm = ref<null | AuthFormNames>(null);
  const changePasswordPopupIsRequired = ref(false);
  const userIsResolved = ref(false);
  const userIsAuthorized = computed(() => session.value.isAuth);
  const balance = computed<number | undefined>(
    () => session.value.user?.balance,
  );
  const unleashManager = useUnleashManager();
  const posthog = usePosthog();
  // Индикатор таймера повтороного смс.
  const beelineSmsTimer = ref(false);
  const defaultAvatars = ref<DefaultAvatar[]>([]);
  const avatarBorders = ref<AvatarBorder[]>([]);
  // сумма-ограничение, для функционала отображения модалки перепривязки номера телефона
  const maxUserWithdrawSum = ref(100);
  const setProfileWithdrowTabActive = ref(false);

  function throwUserIdMismatchError({
    cookieValue,
    comparedValue,
  }: {
    cookieValue: string | number;
    comparedValue: string | number;
  }) {
    throw new Error(
      `User id mismatch: value from "userId" cookie "${cookieValue}" is not equal to "${comparedValue}"`,
    );
  }

  function showAuth(formName: AuthFormNames) {
    if (useMobileCheck()) {
      window.scrollTo(0, 0);
    }
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    authPopupIsRequired.value = true;
    authForm.value = formName;
    document.documentElement.classList.add("is-locked");
  }

  function hideAuth() {
    authPopupIsRequired.value = false;
    authForm.value = null;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.documentElement.classList.remove("is-locked");
  }

  function changeAuthForm(formName: AuthFormNames) {
    authForm.value = formName;
  }

  function updateUserData(userData: User) {
    session.value = {
      isAuth: true,
      user: userData,
    };
    const userIdCookie = useMonthCookie(USER_ID_COOKIE_NAME);
    userIdCookie.value = userData.id.toString();
  }

  function logout() {
    session.value = {
      isAuth: false,
      user: null,
    };
    clearStorageReferral();
    socialIds.value = null;
    removeTokens();
    useCookie(USER_ID_COOKIE_NAME).value = null;
    unleashManager.useSessionId();
    if (posthog) {
      posthog.reset();
    }
  }

  // Убираем ключи для реферралов
  function clearStorageReferral() {
    // проверяем наличие ключа. Если есть, удаляем
    if (isClient()) {
      if (localStorage.getItem("ref")) localStorage.removeItem("ref");
      if (localStorage.getItem("partner_id"))
        localStorage.removeItem("partner_id");
      if (localStorage.getItem("offer_id")) localStorage.removeItem("offer_id");
    }
  }

  async function getUser() {
    const api = useApi();
    const userData = await api.user.profileRetrieve();
    const cookieValue = useMonthCookie(USER_ID_COOKIE_NAME).value;
    const comparedValue = userData.id;
    if (cookieValue && cookieValue.toString() !== comparedValue.toString()) {
      logout();
      throwUserIdMismatchError({
        cookieValue,
        comparedValue,
      });
    }
    updateUserData(userData);
    return userData;
  }

  async function getAllUserData() {
    const exchangerEventStore = useExchangerEventStore();
    if (!userIsAuthorized.value) {
      try {
        await pause();
        const data = await getUser();
        const userId = data.id.toString();
        unleashManager?.useUserId(userId);
        if (posthog) {
          posthog.identify(userId);
        }
        checkClarityForId(userId);
      } catch (error) {
        return;
      } finally {
        resolveVisitorStatus();
      }
    }
    if (isClient()) {
      pause(1000).then(() => exchangerEventStore.checkReward());
    }
  }

  function checkClarityForId(id: string) {
    if (isClient() && window.clarity) {
      window.clarity("set", "userId", id || "0");
    }
  }

  function markUserAsBannedInChat() {
    if (session.value.user) {
      session.value.user.banInChat = true;
    }
  }

  function markUserAsUnbannedInChat() {
    if (session.value.user) {
      session.value.user.banInChat = false;
    }
  }

  async function handleVisit() {
    const userIdCookie = useMonthCookie(USER_ID_COOKIE_NAME);
    if (!userIdCookie.value) {
      resolveVisitorStatus();
      return;
    }
    await getAllUserData();
  }

  function showOnboarding() {
    onboardingPopupIsRequired.value = true;
  }
  function hideOnboarding() {
    onboardingPopupIsRequired.value = false;
    setTimeout(() => {
      usePlatformSelection();
    }, 500);
  }
  function showNameRegister() {
    nameRegisterPopupIsRequired.value = true;
  }
  function hideNameRegister() {
    nameRegisterPopupIsRequired.value = false;
    setTimeout(() => {
      showOnboarding();
    }, 500);
  }
  function resolveVisitorStatus() {
    userIsResolved.value = true;
  }

  function showChangePasswordWindow() {
    document.documentElement.style.overflow = "hidden";
    changePasswordPopupIsRequired.value = true;
  }

  function hideChangePasswordWindow() {
    changePasswordPopupIsRequired.value = false;
    document.documentElement.style.overflow = "";
  }

  async function loginLog() {
    if (isServer()) return Promise.resolve();
    const fp = await FingerprintJs.load();
    const fpResult = await fp.get();
    const fingerprint = fpResult.visitorId;
    const api = useApi();
    return api.user.loginLogCreate({
      loginLogRequest: {
        fingerprint,
      },
    });
  }

  function getSocialRedirectUri(social: string): string {
    return normalize(`${useRequestURL().origin}/auth/${social}/redirect/`);
  }

  /**
   * открытие виджета саппорта TalkMe
   */
  function openSupport() {
    if (window.TalkMe) {
      window.TalkMe("openSupport");

      // задаём позицию
      // отрицательное значение означает противоположную сторону - right и bottom
      // TalkMe("setPosition", left?: number, top?: number)
      //@ts-ignore
      window.TalkMe("setPosition", -50, -70);

      // Устанавливаем данные в виджет. Для авторизованных используем id пользака
      window.TalkMeSetup["clientId"] = userIsAuthorized.value
        ? session.value.user?.id.toString()
        : "0";
      window.TalkMe("setClientInfo", {
        custom: {
          user_id: userIsAuthorized.value
            ? session.value.user?.id.toString()
            : "0",
        },
      });

      // Перезагружаем виджет для применения данных.
      // Оставить на будущее для тетсирования
      // window.TalkMe("reload");

      // Находим блок с классом "online-chat-widget-container" и присваиваем ему data-test="support-widget"
      setTimeout(() => {
        const chatWidget = document.querySelector(
          ".online-chat-widget-container",
        );
        if (chatWidget) {
          chatWidget.setAttribute("data-test", "support-widget");
        }
      }, 200);
    }
  }

  return {
    session,
    socialIds,
    vkUnbindDate,
    bonusRub,
    bonusGold,
    authPopupIsRequired,
    authForm,
    changePasswordPopupIsRequired,
    userIsResolved,
    userIsAuthorized,
    balance,
    onboardingPopupIsRequired,
    nameRegisterPopupIsRequired,
    beelineSmsTimer,
    defaultAvatars,
    avatarBorders,
    maxUserWithdrawSum,
    setProfileWithdrowTabActive,
    showAuth,
    hideAuth,
    changeAuthForm,
    updateUserData,
    logout,
    getUser,
    getAllUserData,
    markUserAsBannedInChat,
    markUserAsUnbannedInChat,
    handleVisit,
    resolveVisitorStatus,
    showChangePasswordWindow,
    hideChangePasswordWindow,
    showOnboarding,
    hideOnboarding,
    showNameRegister,
    hideNameRegister,
    clearStorageReferral,
    loginLog,
    getSocialRedirectUri,
    openSupport,
  };
});
