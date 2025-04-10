import type { UserReward, ExchangerTopUser } from "~/api_gen";

export const useExchangerEventStore = defineStore("exchangerEventStore", () => {
  // список игроков
  const participants = ref<ExchangerTopUser[]>([]);
  // данные по текущему пользователю
  const currentUser = ref<ExchangerTopUser | null>(null);
  const showRewardPopup = ref(false);
  // индикатор необходимости отобразить попап с информацией
  const showInfoPopup = ref(false);
  const rewardPopupData = ref<UserReward | null>(null);
  // порядковый номер таймера вызова функции для заполнения данных компонента с участниками игры
  const participantsTimer = ref<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  /**
   * Опрашивает сервер на наличие награды.
   */
  async function checkReward() {
    const userStore = useUserStore();
    const api = useApi();
    try {
      const response = await api.rewards.userPendingList();
      if (!response.length) {
        return;
      }
      // todo extend for all rewards
      rewardPopupData.value = response[0];

      if (!showRewardPopup.value) {
        try {
          await api.rewards.claim({ id: rewardPopupData.value?.id });
          await userStore.getUser();
          showRewardPopup.value = true;
        } catch (e: any) {
          /* empty */
        }
      }
    } catch (e: any) {
      /* empty */
    }
  }
  return {
    participants,
    currentUser,
    showRewardPopup,
    rewardPopupData,
    showInfoPopup,
    participantsTimer,
    checkReward,
  };
});
