import { BATTLE_NAME } from "~/components/BossBattle/composables/initMainView";

/**
 * Обновляет данные пользователя.
 */
export default async function updateProfile() {
  const store: ReturnType<typeof useBossStore> = useBossStore();
  const api = useApi();
  try {
    store.profile = await api.events.bossBattleProfileRetrieve({
      slug: BATTLE_NAME,
    });
  } catch (e) {
    //
  }
}
