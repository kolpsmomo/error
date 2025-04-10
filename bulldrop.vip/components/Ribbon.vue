<template>
  <Container>
    <template #top-item>
      <Item
        v-if="topItem"
        :key="topItem.id"
        :top="true"
        :value="topItemValue"
        :item-data="topItem"
        :class="$style.item"
      />
    </template>
    <template #bunch>
      <Item
        v-for="item in bunch"
        :key="item.id"
        :item-data="item"
      />
    </template>
    <template #items>
      <template v-if="showSkeleton">
        <ItemSkeleton
          v-for="n in 50"
          :key="n"
          :class="$style.item"
        />
      </template>
      <template v-else>
        <Item
          v-for="item in items"
          :key="item.id"
          :item-data="item"
          :class="$style.item"
        />
      </template>
    </template>
  </Container>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import type { RibbonItem, DataSource } from "./Ribbon/types";
import anime from "animejs";
import Container from "./Ribbon/Container.vue";
import Item from "./Ribbon/Item.vue";
import ItemSkeleton from "~/components/Skeleton/BaseBlock.vue";
import openCaseEventTarget, {
  ROULETTE_SPIN_FINISHED,
} from "~/event-targets/openCaseEventTarget";

const userStore: ReturnType<typeof useUserStore> = useUserStore();

/**
 * Режим работы ленты.
 */
let ribbonMode: "animated" | "not-animated" = "animated";

/**
 * Объект с данными по лучшему скину.
 */
const topItem = shallowRef<undefined | RibbonItem>(undefined);

/**
 * Временный объект с данными по лучшему скину.
 */
let topItemDataTemp: null | DataSource = null;

/**
 * Ценность лучшего скина в ленте от 0 до 1.
 */
const topItemValue = ref<number>(0);

/**
 * Массив, каждый элемент которого это объект с данными по выигранному скину.
 * Данные из этого массива отображаются в основном контейнере ленты.
 */
const items = shallowRef<RibbonItem[]>([]);

/**
 * Массив, каждый элемент которого это объект с данными по выигранному скину.
 * Данные из этого массива будут сначала добавлены во вспомогальный массив (bunch),
 * для последующего перемещения в основной (items).
 */
let stack: RibbonItem[] = [];

/**
 * Массив, каждый элемент которого это объект с данными по выигранному скину.
 * Данные из этого массива будут сначала добавлены во вспомогальный контейнер,
 * а по окончании анимации добавления переместятся в основной.
 */
const bunch = shallowRef<RibbonItem[]>([]);

/**
 * Массив, каждый элемент которого это объект с предметами выигранными
 * текущим пользователем. Это позволить избежать отображение выигранного
 * предмета в ленте, до того, как рулетка кейса закончит свое вращение.
 * Предметы из этого массива будут помещены в вспомогательный стек(stack)
 * когда рулетка закончит свое вращение.
 */
let currentUserItemsBunch: RibbonItem[] = [];

/**
 * Индикатор блокировки интерфейса.
 */
let blocked: boolean = false;

/**
 * Индикатор того, что компонент может принимать новые данные.
 */
let readyToAccept: boolean = false;

/**
 * Объект соединения с сервером.
 */
let connection: undefined | WebSocket = undefined;

/**
 * Текущая по счету попытка повторного подключения.
 */
let currentReconnectionAttempt: number = 0;

/**
 * Максимальное количество попыток повторного подключения.
 */
const maxReconnectionsAttempts: number = 2;

/**
 * Индикатор необходимости совершить повторное подключение в случае неудачи предыдущей попытки.
 */
let reconnectionIsRequired: boolean = true;

/**
 * Порядковый номер внутреннего таймера.
 */
let reconnectionTimer: undefined | ReturnType<typeof setTimeout> = undefined;

/**
 * Порядковый номер внутреннего таймера добавления скинов в ленту.
 */
let additionTimer: undefined | ReturnType<typeof setTimeout> = undefined;

/**
 * Порядковый номер внутреннего таймера обработчика окончания вращения рулетки.
 */
let rouletteHandlerTimer: undefined | ReturnType<typeof setTimeout> = undefined;

/**
 * Ссылка на внутренний контейнер ленты.
 */
let ribbonInnerContainer: HTMLElement | null = null;

/**
 * Ссылка на внутренний вспомогательный контейнер ленты.
 */
let ribbonBunchContainer: HTMLElement | null = null;

/**
 * Шаг смещения контейнеров в px (170 - ширина блока со скином; 4px - margin по бокам).
 */
const TRANSLATE_STEP: number = 174;

/**
 * Воркер ленты.
 */
let worker: Worker;

/**
 * Индикатор необходимости отобразить скелетон.
 */
const showSkeleton = ref(true);

if (isClient()) {
  worker = new Worker(new URL("Ribbon/worker.ts", import.meta.url), {
    type: "module",
  });

  worker.onmessage = (e: MessageEvent<string>) => {
    topItemValue.value = parseFloat(e.data);
  };
}

onBeforeMount(() => {
  // подключение требуется проводить в следующем витке событийного
  // цикла, чтобы иметь правильное значение текущей платформы
  setTimeout(createConnectionToServer, 0);
});

const innerContainerSelector = "[data-role='ribbon-inner-container']";
const bunchContainerSelector = "[data-role='ribbon-bunch-container']";

onMounted(() => {
  topItem.value = undefined;
  openCaseEventTarget.addEventListener(
    ROULETTE_SPIN_FINISHED,
    handleRouletteFinished,
  );
  ribbonInnerContainer = document.querySelector(innerContainerSelector);
  ribbonBunchContainer = document.querySelector(bunchContainerSelector);
  document.addEventListener("visibilitychange", toggleRibbonMode);
});

onBeforeUnmount(() => {
  document.removeEventListener("visibilitychange", toggleRibbonMode);
  openCaseEventTarget.removeEventListener(
    ROULETTE_SPIN_FINISHED,
    handleRouletteFinished,
  );
  clearTimeout(reconnectionTimer);
  clearTimeout(additionTimer);
  clearTimeout(rouletteHandlerTimer);
  reconnectionIsRequired = false;
  destroyConnectionToServer();
  worker.terminate();
});

onPlatformChange(() => handlePlatformChanged());

async function handlePlatformChanged() {
  topItem.value = undefined;
  items.value = [];
  stack = [];
  currentUserItemsBunch = [];
  destroyConnectionToServer();
  await pause(100);
  createConnectionToServer();
}

const toggleRibbonMode = () => {
  switch (document.visibilityState) {
    case "visible":
      ribbonMode = "animated";
      break;

    case "hidden":
      ribbonMode = "not-animated";
      break;
  }
};

/**
 * Установить соединение с сервером.
 */
function createConnectionToServer() {
  connection = useWebsocket(`/ws/drops_line/${usePlatform().code}/`);
  connection.onopen = processOpenedConnection;
  connection.onclose = processClosedConnection;
}

/**
 * Уничтожает подключение к серверу.
 */
function destroyConnectionToServer() {
  if (connection !== undefined) {
    connection.close();
  }
  showSkeleton.value = true;
}

/**
 * Обрабатывает открытие соединения.
 */
function processOpenedConnection() {
  currentReconnectionAttempt = 0;
  if (connection !== undefined) {
    connection.onerror = processConnectionErrors;
    connection.onmessage = processServerEvents;
    showSkeleton.value = false;
  }
}

/**
 * Если соединение было оборвано, пытается установить новое.
 */
function processClosedConnection(event: CloseEvent) {
  if (!event.wasClean && reconnectionIsRequired) {
    if (currentReconnectionAttempt < maxReconnectionsAttempts) {
      currentReconnectionAttempt += 1;
      reconnectionTimer = setTimeout(
        createConnectionToServer,
        Math.floor(Math.random() * 2000),
      );
    }
  }
}

/**
 * Обрабатывает ошибки во время соединения к серверу.
 */
function processConnectionErrors() {}

/**
 * Обрабатывает события производимые сервером.
 */
function processServerEvents(event: MessageEvent<string>) {
  const { type, data } = JSON.parse(event.data);

  switch (type) {
    case "last_drops":
      processLastDrops(data);
      break;

    case "new_drop":
      processNewDrop(data);
      break;

    case "max_drop":
      processMaxDrop(data);
      break;
  }
}

/**
 * Извлекает данные скина из переданного источника.
 */
function extractSkinData(data: DataSource): RibbonItem {
  const {
    img: itemImg,
    type: itemType,
    name: itemName,
    quality_color: qualityColor,
    stattrack,
    price,
  } = data.prize;
  const { nickname, avatar_img: avatarImg } = data.user;
  const { id: caseId, img: caseImg, name: caseName } = data.case;
  const id = uuidv4();
  return {
    itemImg,
    itemType,
    itemName,
    qualityColor,
    stattrack,
    nickname,
    avatarImg,
    caseId,
    caseImg,
    caseName,
    price,
    id,
  };
}

/**
 * Обрабатывает данные поступающие при первоначальной инициализации соединения.
 * Отображает начальные данные по выигранным предметам отображаемым в ленте.
 * Является инициализирующим событием, после которого компонент готов принимать еще записи.
 */
function processLastDrops(data: {
  max_drop: null | DataSource;
  last_drops: DataSource[];
}) {
  if (data.max_drop) {
    topItem.value = extractSkinData(data.max_drop);
    worker.postMessage({
      price: topItem.value.price,
      ttl: data.max_drop.ttl,
    });
  }

  if (data.last_drops && data.last_drops.length) {
    items.value = data.last_drops.map((item) => extractSkinData(item));
  }

  nextTick(() => (readyToAccept = true));
}

function belongsToCurrentUser(item: DataSource): boolean {
  return item.user.nickname === userStore.session?.user?.nickname;
}

/**
 * Определяет, куда поместить новый предмет, во вспомогательный стэк(stack)
 * или во вспомогательный массив с новыми предметами текущего пользователя
 */
function processItemOfNewDrop(item: DataSource) {
  const extractedItem = extractSkinData(item);
  if (belongsToCurrentUser(item) && document.visibilityState === "visible") {
    currentUserItemsBunch.push(extractedItem);
  } else {
    stack.push(extractedItem);
  }
}
/**
 * Обрабатывает событие выпадения нового предмета(ов).
 * Добавляет данные в кучу для последующего добавления в ленту.
 */
function processNewDrop(data: DataSource | DataSource[]) {
  if (Array.isArray(data)) {
    data.forEach((item) => processItemOfNewDrop(item));
  } else {
    processItemOfNewDrop(data);
  }
  clearTimeout(additionTimer);
  if (stack.length < 10) {
    additionTimer = setTimeout(addItemsFromStackToRibbon, 1000);
  } else {
    addItemsFromStackToRibbon();
  }
}

/**
 * Обрабатывает событие выпадения лучшего предмета.
 */
function processMaxDrop(data: DataSource) {
  if (belongsToCurrentUser(data) && document.visibilityState === "visible") {
    topItemDataTemp = data;
    return;
  }
  topItem.value = extractSkinData(data);
  worker.postMessage({
    price: topItem.value.price,
    ttl: data.ttl,
  });
}

/**
 * Добавляет скины из кучи в вспомогоательный массив
 * с их последующим перемещением в основной контейнер ленты.
 */
async function addItemsFromStackToRibbon() {
  if (!readyToAccept || blocked) {
    return;
  }
  blocked = true;
  bunch.value = [...stack.slice(-10).reverse()];
  stack = [];
  await nextTick();
  if (ribbonMode === "animated") {
    anime.suspendWhenDocumentHidden = false;
    const duration = 500;
    const tl = anime.timeline({
      easing: "linear",
      duration,
    });
    tl.add({
      targets: ribbonBunchContainer,
      opacity: [0, 1],
    }).add(
      {
        targets: ribbonInnerContainer,
        translateX: TRANSLATE_STEP * bunch.value.length,
        duration: 250,
        complete: () => {
          restoreRibbon();
          blocked = false;
        },
      },
      `-=${duration}`,
    );
  } else if (ribbonMode === "not-animated") {
    restoreRibbon();
    blocked = false;
  }
}

async function restoreRibbon() {
  items.value = bunch.value.concat(items.value);
  bunch.value = [];
  ribbonInnerContainer?.removeAttribute("style");
  await nextTick();
  if (stack.length) {
    await addItemsFromStackToRibbon();
  } else {
    if (items.value.length > 50) {
      items.value = items.value.slice(0, 15);
    }
  }
}
/**
 * Добавляет скины из вспомогательного массива с новыми предметами
 * текущего пользователя в стэк
 */
function moveCurrentUserItemsToStack() {
  stack = [...currentUserItemsBunch];
  currentUserItemsBunch = [];
  addItemsFromStackToRibbon();
}

/**
 * Перемещает лучший скин из временной переменной в текущую
 */
function moveFromTempTopItemToCurrent() {
  if (topItemDataTemp) {
    topItem.value = extractSkinData(topItemDataTemp);
    worker.postMessage({
      price: topItem.value.price,
      ttl: topItemDataTemp.ttl,
    });
    topItemDataTemp = null;
  }
}

/**
 * Обработчик окончания вращения рулетки.
 */
function handleRouletteFinished() {
  rouletteHandlerTimer = setTimeout(() => {
    moveCurrentUserItemsToStack();
    moveFromTempTopItemToCurrent();
  }, 300);
}
</script>

<style lang="scss" module>
.item {
  flex-shrink: 0;
  width: 210px;
  height: 128px;
  margin: 0 2px;
  border-radius: 12px;
}
</style>
