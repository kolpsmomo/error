import type { UserProfile } from "~/components/BossBattle/types/UserProfile";
import type { RewardPopupData } from "~/components/BossBattle/types/RewardPopupData";
import { SpinePlayer } from "@esotericsoftware/spine-player";
import { ATTACK_NAME } from "~/components/BossBattle/types/Attack";
import type { BossBattleAttackAction, TopUser } from "~/api_gen";

export const useBossStore = defineStore("bossStore", () => {
  // индикатор блокировки интерфейса
  const blocked = ref(false);
  // порядковый номер таймера обновления компонента содержащего босса
  const initMainViewTimer = ref<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  // объект ws-соединения
  const connection = shallowRef<WebSocket | null>(null);
  // индикатор разрыва соединения
  const connectionIsLost = ref(false);
  // порядковый номер таймера при переподключении к вебсокету
  const reconnectionTimer = ref<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  // объект босса
  const boss = shallowRef<SpinePlayer | null>(null);
  // индикатор того, что взаимодействие с боссом доступно
  const bossIsAvailable = ref(false);
  // процент оставшегося здоровья
  const bossHealthPercent = ref(0);
  // количество оставшегося здоровья в абсолютном выражении
  const bossHealthPoints = ref(0);
  // общее количество здоровья босса
  const bossHealthTotal = ref(0);
  // нанесенный боссу урон в абсолютном выражении
  const bossTotalDamage = ref(0);
  // дата окончания существования босса
  const bossEndDate = ref<Date | undefined>(undefined);
  // индикатор того, что время в компоненте таймера подошло к концу
  const timeIsUp = ref(false);
  // дата когда отсчет времени в компоненте таймера дойдет до нуля
  const timerEndDate = ref<Date | undefined>(undefined);
  // отображаемое количество дней в компоненте таймера
  const timerDays = ref("00");
  // отображаемое количество часов в компоненте таймера
  const timerHours = ref("00");
  // отображаемое количество минут в компоненте таймера
  const timerMinutes = ref("00");
  // отображаемое количество секунд в компоненте таймера
  const timerSeconds = ref("00");
  // порядковый номер таймера при обновлении данных компонента таймера
  const timerTimer = ref<ReturnType<typeof setTimeout> | undefined>(undefined);
  // доступные варианты аттаки
  const attackOptions = ref<BossBattleAttackAction[]>([]);
  // наименование последней совершненной атаки на босса
  const lastAttackName = ref<ATTACK_NAME | "">("");
  // данные по профилю пользователя
  const profile = ref<UserProfile | null>(null);
  // индикатор необходимости отобразить попап с выигрышем
  const showRewardPopup = ref(false);
  // индикатор необходимости отобразить попап с информацией
  const showInfoPopup = ref(false);
  // данные по выигрышу отображаемые в соответствующем попапе
  const rewardPopupData = ref<RewardPopupData | null>(null);
  // индикатор перерождения
  const reborn = ref(false);
  // список игроков
  const participants = ref<TopUser[]>([]);
  // максимальное кол-во игроков
  const maxParticipants = ref(0);
  // ссылка на следующую часть игроков
  const nextParticipantsLink = ref("");
  // данные по текущему пользователю
  const currentUser = ref<TopUser | null>(null);
  // порядковый номер таймера вызова функции для заполнения данных компонента с участниками игры
  const participantsTimer = ref<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  return {
    blocked,
    connection,
    connectionIsLost,
    boss,
    bossIsAvailable,
    bossHealthPercent,
    bossHealthPoints,
    bossHealthTotal,
    bossEndDate,
    bossTotalDamage,
    timeIsUp,
    timerEndDate,
    timerDays,
    timerHours,
    timerMinutes,
    timerSeconds,
    timerTimer,
    attackOptions,
    lastAttackName,
    profile,
    showRewardPopup,
    showInfoPopup,
    rewardPopupData,
    reborn,
    reconnectionTimer,
    initMainViewTimer,
    participants,
    maxParticipants,
    nextParticipantsLink,
    currentUser,
    participantsTimer,
  };
});
