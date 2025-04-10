<template>
  <swiper
    :speed="swiperSet.speed"
    :pagination="swiperSet.pagination"
    :navigation="swiperSet.navigation"
    :modules="swiperSet.modules"
    :autoplay="swiperSet.autoplay"
    :loop="swiperSet.loop"
    class="mySwiper"
  >
    <!-- Кнопки переключения слайдов "назад" и "вперёд" -->
    <div
      ref="prev"
      class="swiper-button swiper-button-prev"
    >
      <IconChevronLeft />
    </div>
    <div
      ref="next"
      class="swiper-button swiper-button-next"
    >
      <IconChevronRight />
    </div>
    <swiper-slide v-if="topupIsEnabled">
      <TopupBonus />
    </swiper-slide>
    <swiper-slide v-if="bossBattleIsEnabled">
      <BossBattle />
    </swiper-slide>
    <swiper-slide>
      <Upgrade />
    </swiper-slide>
    <swiper-slide v-if="exchangerEventIsEnabled">
      <ElfFactory />
    </swiper-slide>
    <swiper-slide v-if="isNotRoblox">
      <Contracts />
    </swiper-slide>
    <swiper-slide v-if="bullpassIsAvailable">
      <Season />
    </swiper-slide>
    <swiper-slide v-if="!coreStore.isUserIndia">
      <Telegram />
    </swiper-slide>
  </swiper>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination } from "swiper";
import type { SwiperOptions } from "swiper";
import Season from "~/components/Home/Intro/Season.vue";
import Telegram from "~/components/Home/Intro/Telegram.vue";
import BossBattle from "~/components/Home/Intro/BossBattle.vue";
import Contracts from "./Contracts.vue";
import Upgrade from "~/components/Home/Intro/Upgrade.vue";
import ElfFactory from "~/components/Home/Intro/ElfFactory.vue";
import TopupBonus from "~/components/Home/Intro/TopupBonus.vue";

const prev = ref<HTMLElement | null>(null);
const next = ref<HTMLElement | null>(null);

const swiperSet: SwiperOptions = reactive({
  speed: 600,
  pagination: {
    clickable: true,
  },
  navigation: {
    prevEl: prev,
    nextEl: next,
  },
  modules: [Autoplay, Pagination, Navigation],
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  loop: true,
});

const platform = usePlatform();
const coreStore = useCoreStore();
const exchangerEventIsEnabled = computed(() => {
  const platform = usePlatform();
  if (!platform.is.genshin && !platform.is.roblox) {
    return coreStore.showExchanger;
  } else {
    return false;
  }
});
const bullpassIsAvailable = computed(() => {
  const platform = usePlatform();
  if (platform.code !== "genshin" && platform.code !== "roblox") {
    return true;
  } else {
    return false;
  }
});
const isNotRoblox = computed(() => !platform?.is.roblox);
const topupIsEnabled = useFlag("topupBanner");
const bossBattleIsEnabled = computed(() => {
  const platform = usePlatform();
  if (!platform.is.genshin && !platform.is.roblox) {
    return coreStore.showBossBattle;
  } else {
    return false;
  }
});
</script>

<style lang="scss" scoped>
// Точечные настройки для Свайпера
.swiper {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  transition: box-shadow 0.4s linear;

  // Кнопки переключения
  .swiper-button {
    position: absolute;
    bottom: 29px;
    width: 36px;
    height: 36px;
    background: rgba(227, 227, 229, 0.62);
    backdrop-filter: blur(12.5px);
    border-radius: 8px;
    z-index: 10;
    cursor: pointer;
    left: unset;
    top: auto;

    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 20px;
      height: 20px;
      fill: var(--general-transparent-dark-75);
    }

    &:after {
      content: none;
    }

    @media screen and (max-width: 834px) {
      bottom: 37px;
    }

    @media screen and (max-width: 600px) {
      display: none;
    }
  }
  .swiper-button-next {
    right: 45px;
    .arrow-right {
      background-image: url("~/assets/right.svg");
    }
    @media screen and (max-width: 834px) {
      right: 27px;
    }
  }
  .swiper-button-prev {
    right: 91px;
    .arrow-left {
      background-image: url("~/assets/left.svg");
    }
    @media screen and (max-width: 834px) {
      right: 73px;
    }
  }
  // точки пагинации
  :deep(.swiper-pagination-bullet-active) {
    background-color: var(--general-white);
  }

  // Блок слайда
  .slide {
    height: 100%;
    box-sizing: border-box;
    padding: 45px;
    padding-left: 130px;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 25px;
    background-position: left;
    color: var(--general-white);
    letter-spacing: -0.01em;

    @media screen and (max-width: 1280px) {
      padding: 36px;
    }

    @media screen and (max-width: 834px) {
      .text {
        max-width: 400px;
      }
    }

    @media screen and (max-width: 475px) {
      padding: 24px;

      .text {
        max-width: 380px;
        p {
          line-height: 20px;
        }
      }
    }
    .parallax-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 130%;
      height: 100%;
      -webkit-background-size: cover;
      background-size: cover;
      background-position: center;
    }
  }
}
</style>
