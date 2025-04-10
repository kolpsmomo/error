<script setup lang="ts">
import Mobile from "~/components/Header/Mobile.vue";
import MenuMobile from "~/components/Icon/MenuMobile.vue";
import Wallet from "~/components/Icon/Wallet.vue";
import Cases from "~/components/Icon/Cases.vue";
import Games from "~/components/Icon/Games.vue";
import Chat from "~/components/Icon/Chat.vue";
import GamesPopup from "~/components/TabBar/GamesPopup.vue";
import ChatComp from "~/components/Chat.vue";
import { normalize } from "~/utils/url/normalize";

const { t } = useI18n();
const coreStore = useCoreStore();
const route = useRoute();
const showGamesPopup = ref(false);
const isChatRequired = ref(false);
const routePath = computed(() => route.path);
const isDepositRoute = ref(false);
const chat = ref<HTMLElement | null>(null);
const isLoad = ref(false);

const isCasesActive = computed(() => {
  return (
    route.meta.isHome &&
    !showGamesPopup.value &&
    !isChatRequired.value &&
    !coreStore.headerMenuIsRequired
  );
});

const isDepositActive = computed(
  () =>
    isLoad.value &&
    isDepositRoute.value &&
    !showGamesPopup.value &&
    !isChatRequired.value &&
    !coreStore.headerMenuIsRequired,
);

const casesItem = computed(() => ({
  icon: markRaw(Cases),
  title: t("tabbar.cases"),
  event: scrollToCases,
  active: isCasesActive.value,
}));

const depositItem = computed(() => ({
  icon: markRaw(Wallet),
  title: t("tabbar.deposit"),
  event: () => {
    isChatRequired.value = false;
    return navigateTo(normalize(`/balance/top-up`));
  },
  active: isDepositActive.value,
}));

const gamesItem = computed(() => ({
  icon: markRaw(Games),
  title: t("tabbar.games"),
  event: showGames,
  active: showGamesPopup.value,
}));

const chatItem = computed(() => ({
  icon: markRaw(Chat),
  title: t("tabbar.chat"),
  event: async () => {
    isChatRequired.value = !isChatRequired.value;
    if (isChatRequired.value) {
      showGamesPopup.value = false;
    }
  },
  active: isChatRequired.value,
}));

const menuItem = computed(() => ({
  icon: markRaw(MenuMobile),
  title: t("tabbar.menu"),
  event: () => {
    coreStore.toggleMenuHeader();
    isChatRequired.value = false;
  },
  active: coreStore.headerMenuIsRequired,
}));

const menuItems = computed(() => [
  casesItem.value,
  depositItem.value,
  gamesItem.value,
  chatItem.value,
  menuItem.value,
]);

const setActiveRouteItem = () => {
  isDepositRoute.value = routePath.value.includes("balance/top-up");
};

onBeforeMount(() => {
  setActiveRouteItem();
});

onMounted(async () => {
  isLoad.value = true;
});

watch(
  () => routePath.value,
  async () => {
    isChatRequired.value = false;
    setActiveRouteItem();
  },
);

async function scrollToCases() {
  const casesPath = normalize(`/`);
  isChatRequired.value = false;
  await navigateTo(casesPath);
  await pause(500);

  const scroll = (
    document?.querySelector('[data-test="cases-all"]') as HTMLDivElement
  )?.offsetTop;
  if (scroll) {
    window.scrollTo({ top: scroll - 80, behavior: "smooth" });
  }
}

function showGames() {
  showGamesPopup.value = true;
  isChatRequired.value = false;
}
</script>

<template>
  <Mobile :class="$style['tab-bar-mobile']">
    <div
      v-for="item in menuItems"
      :key="item.title"
      :class="$style['tab-bar__item']"
      @click="item.event"
    >
      <div :class="$style['tab-bar__icon']">
        <div
          v-if="item.active && isLoad"
          :class="$style['tab-bar__bg--active']"
        ></div>
        <component
          :is="item.icon"
          :class="[
            $style['tab-bar__svg'],
            item.active && $style['tab-bar__icon--active'],
          ]"
        />
      </div>
      <span
        :class="[
          $style['tab-bar__title'],
          item.active && $style['tab-bar__title--active'],
        ]"
        >{{ item.title }}</span
      >
    </div>
    <ChatComp
      ref="chat"
      :chat-area-is-required="isChatRequired"
      @show-chat-area="isChatRequired = true"
      @hide-chat-area="isChatRequired = false"
    ></ChatComp>
  </Mobile>

  <Transition
    name="popup"
    mode="out-in"
  >
    <GamesPopup
      v-if="showGamesPopup"
      @hide="showGamesPopup = false"
    />
  </Transition>
</template>

<style module lang="scss">
.tab-bar__item:hover {
  .tab-bar__title {
    color: $white-transparent-50;
  }

  svg {
    fill: $white-transparent-50;
  }
}

.tab-bar-mobile {
  position: fixed;
  bottom: 0;
  overflow: hidden;
  width: 100%;
  height: 64px;
  border-radius: 20px 20px 0 0;
  border-top: 1px solid $transparent-light-10;
  background: var(--general-new-fill-2);
  z-index: 200;

  .tab-bar__svg {
    fill: $white-transparent-20;
    width: 20px;
    height: 20px;
  }

  .tab-bar__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex: 1 0 0;
  }

  .tab-bar__title {
    color: $white-transparent-20;
    font-size: 10px;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: -0.01em;
  }
  .tab-bar__item {
    .tab-bar__icon--active {
      animation: activeIcon 0.5s ease-in 1;
      fill: var(--general-white);
      @keyframes activeIcon {
        0% {
          fill: $white-transparent-20;
        }

        10% {
          fill: $white-transparent-50;
        }

        100% {
          fill: var(--general-white);
        }
      }
    }

    .tab-bar__title--active {
      animation: activeTitle 0.5s ease-in 1;
      color: var(--general-white);
      @keyframes activeTitle {
        0% {
          color: $white-transparent-20;
        }

        10% {
          color: $white-transparent-50;
        }

        100% {
          color: var(--general-white);
        }
      }
    }
  }

  .tab-bar__icon {
    position: relative;
  }

  .tab-bar__bg--active {
    border-radius: 100px;
    background: rgba(255, 255, 255, 0.1);
    filter: blur(10px);
    position: absolute;
    left: -10px;
    top: -6px;
    width: 40px;
    height: 40px;
  }
}
</style>

<style lang="scss" scoped>
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translate(-50%, -15px);
}

.popup-enter-active,
.popup-leave-active {
  transition: 0.25s;
}
</style>
