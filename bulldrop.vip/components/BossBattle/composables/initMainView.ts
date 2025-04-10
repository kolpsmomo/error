import countdownOrInit from "./countdownOrInit";
import updateProfile from "./updateProfile";
import type { BossBattleEvent } from "~/api_gen";

export const BATTLE_NAME = "megalodons";
export const BATTLE_KEY = "megalodon";
/**
 * Инициализирует компонент содержащий босса.
 */
export default async function initMainView() {
  const api = useApi();
  const store: ReturnType<typeof useBossStore> = useBossStore();
  const userStore: ReturnType<typeof useUserStore> = useUserStore();
  let bossData: BossBattleEvent | null = null;
  const REQUEST_ATTEMPTS = 3;

  for (let i = 0; i < REQUEST_ATTEMPTS; i += 1) {
    try {
      bossData = await api.events.bossBattleRetrieve({
        slug: BATTLE_NAME,
      });
      if (bossData) {
        break;
      }
    } catch (e) {
      /* empty */
    }
  }

  if (!bossData) {
    return;
  }

  store.profile = null;

  if (bossData.currentBoss) {
    if (userStore.userIsAuthorized) {
      await updateProfile();
    }

    for (let i = 0; i < REQUEST_ATTEMPTS; i += 1) {
      try {
        store.attackOptions = await api.events.bossBattleAttackActionsList({
          slug: BATTLE_NAME,
        });
        if (store.attackOptions) {
          break;
        }
      } catch (e) {
        /* empty */
      }
    }
    store.bossEndDate = bossData.currentBoss.endDate;
    store.bossHealthPercent = bossData.currentBoss.healthPercentage;
    store.bossHealthPoints =
      bossData.currentBoss.healthPoints - bossData.currentBoss.damage;
    store.bossHealthTotal = bossData.currentBoss.healthPoints;
    store.bossTotalDamage = bossData.currentBoss.damage;

    if (
      new Date(bossData.currentBoss.startDate).getTime() > new Date().getTime()
    ) {
      store.timerEndDate = bossData.currentBoss.startDate;
      store.reborn = true;
      countdownOrInit();
    } else if (
      new Date(bossData.currentBoss.endDate).getTime() > new Date().getTime()
    ) {
      store.blocked = bossData.currentBoss.healthPoints <= 0;

      store.reborn = false;
      store.bossIsAvailable = true;
      store.timerEndDate = bossData.currentBoss.endDate;

      countdownOrInit();
    }
  }

  if (bossData.nextBoss !== null && bossData.currentBoss === null) {
    store.reborn = true;
    store.timerEndDate = bossData.nextBoss.startDate;
    countdownOrInit();
  }
}
