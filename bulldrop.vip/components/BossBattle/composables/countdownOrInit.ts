import useDhmsTimer from "~/composables/useDhmsTimer";
import initMainView from "./initMainView";

/**
 * Обновляет данные таймера.
 * Досчитав до конца, вызывает инициализацию компонента с боссом.
 */
export default function countdownOrInit() {
  const store: ReturnType<typeof useBossStore> = useBossStore();

  if (store.timerEndDate === undefined) {
    return;
  }

  const { d, h, m, s, expired } = useDhmsTimer(store.timerEndDate.toString());

  if (expired) {
    clearTimeout(store.initMainViewTimer);
    store.blocked = true;
    store.bossIsAvailable = false;
    store.timerDays = "00";
    store.timerHours = "00";
    store.timerMinutes = "00";
    store.timerSeconds = "00";
    store.initMainViewTimer = setTimeout(
      () => initMainView(),
      Math.floor(Math.random() * 10000),
    );
  } else {
    store.timerDays = d;
    store.timerHours = h;
    store.timerMinutes = m;
    store.timerSeconds = s;
    store.timerTimer = setTimeout(() => countdownOrInit(), 1000);
  }
}
