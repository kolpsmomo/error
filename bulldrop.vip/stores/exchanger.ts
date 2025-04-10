import type { SubjectInventory, ExchangerTopUser } from "~/api_gen";

export const EVENT_NAME = "elfs-factoryss";
export const EVENT_KEY = "elf_factory";

export type Event = {
  year: null | number;
  month: null | number;
  day: null | number;
  hours: null | number;
  minutes: null | number;
  seconds: null | number;
  topUsers: ExchangerTopUser[];
  allUsers: ExchangerTopUser[];
  caseCollectionId: null | number;
  user: {
    exchangePoints: null | number;
  };
  wonItemsPopupIsRequired: boolean;
  wonItems: [];
};

export const useExchangerStore = defineStore("exchangerStore", () => {
  const event = ref<Event>({
    year: null,
    month: null,
    day: null,
    hours: null,
    minutes: null,
    seconds: null,
    topUsers: [],
    allUsers: [],
    caseCollectionId: null,
    user: {
      exchangePoints: null,
    },
    wonItemsPopupIsRequired: false,
    wonItems: [],
  });
  const isExchangerPriseModalVisible = ref(false);
  const exchangerPrise = ref<SubjectInventory | null>(null);
  const api = useApi();

  // Получение объекта с информацией о дате окончания ивента
  async function getEventInfo() {
    try {
      const api = useApi();
      const data = await api.events.exchangerRetrieve({
        slug: EVENT_NAME,
      });
      const dataEnd = new Date(data.endDate).toLocaleString("en-US", {
        timeZone: "Europe/Moscow",
      });
      const dataEndMsc = new Date(dataEnd);
      event.value.year = dataEndMsc.getFullYear();
      event.value.month = dataEndMsc.getMonth();
      event.value.day = dataEndMsc.getDate();
      event.value.hours = dataEndMsc.getHours();
      event.value.minutes = dataEndMsc.getMinutes();
      event.value.seconds = dataEndMsc.getSeconds();
      event.value.caseCollectionId = data.caseCollectionId;
    } catch (e) {
      /* empty */
    }
  }

  // Получение объекта с к-вом очков ивента пользователя
  async function getUserInfo() {
    try {
      const data = await api.events.exchangerProfileRetrieve({
        slug: EVENT_NAME,
      });
      event.value.user.exchangePoints = data.balance;
    } catch (e) {
      /* empty */
    }
  }

  // Получение объекта с первой сотней участников
  async function getUserTop(limit?: number, offset?: number) {
    const data = await api.events.exchangerTopList({
      slug: EVENT_NAME,
      limit,
      offset,
    });

    event.value.topUsers = data.splice(0, 3);
    event.value.allUsers = data;
  }

  // Получение объекта со второй сотней участников
  async function getUserTopEnd(limit?: number, offset?: number) {
    const data = await api.events.exchangerTopList({
      slug: EVENT_NAME,
      limit,
      offset,
    });
    event.value.allUsers = event.value.allUsers.concat(data);
  }

  // Запрос на "обмен", т.е. получение награды за очки
  async function getExchange() {
    exchangerPrise.value = await api.events.exchangerExchangeCreate({
      slug: EVENT_NAME,
    });
    isExchangerPriseModalVisible.value = true;
  }

  return {
    event,
    isExchangerPriseModalVisible,
    exchangerPrise,
    getEventInfo,
    getUserInfo,
    getUserTop,
    getUserTopEnd,
    getExchange,
  };
});
