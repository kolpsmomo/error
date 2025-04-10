<template>
  <div
    :class="[$style['case-filter']]"
    :style="{
      '--gradient-background': platform.is.standoff
        ? 'var(--general-new-background)'
        : 'var(--general-background)',
    }"
  >
    <div :class="$style['case-filter__filters']">
      <div :class="$style['case-filter__scroll-container']">
        <ItemsSorter
          :mobile-left="true"
          @sortByPriceUp="handleSort('priceUp')"
          @sortByPriceDown="handleSort('priceDown')"
        />

        <div :class="$style['case-filter__types-wrapper']">
          <div
            v-if="!isBeginning"
            :class="$style['case-filter__gradient--left']"
          ></div>
          <div
            ref="prev"
            :class="[
              $style['case-filter__button--prev'],
              isBeginning && $style['case-filter__button--hidden'],
            ]"
            @click="slidePrev"
          >
            <div :class="$style['case-filter__icon-wrapper']">
              <IconChevronLeft />
            </div>
          </div>
          <SwiperComponent
            :modules="swiperSet.modules"
            :slides-per-view="'auto'"
            :space-between="6"
            :navigation="false"
            :speed="swiperSet.speed"
            :breakpoints="swiperSet.breakpoints"
            class="case-filter__swiper"
            @swiper="onSwiper"
          >
            <swiper-slide
              v-for="type in casesList"
              :key="type.id"
            >
              <div
                :class="[
                  $style['case-filter__type'],
                  selectedCase === type.id &&
                    $style['case-filter__type--selected'],
                  !type.icon && $style['case-filter__type--no-icon'],
                ]"
                :data-case-id="type.id"
                @click="setActiveCollection(type.id)"
              >
                <img
                  v-if="type.icon"
                  :class="$style['case-filter__type-icon']"
                  :src="type.icon"
                  alt=""
                />
                <span :class="$style['case-filter__type-name']">{{
                  type.name
                }}</span>
                <div
                  v-if="type.advantages?.discount"
                  :class="$style['case-filter__advantages']"
                >
                  <div :class="$style['case-filter__discount']">
                    <IconDiscountPercentFill />
                  </div>
                </div>
              </div>
            </swiper-slide>
          </SwiperComponent>

          <div
            ref="next"
            :class="[
              $style['case-filter__button--next'],
              isEnd && $style['case-filter__button--hidden'],
            ]"
            @click="slideNext"
          >
            <div :class="$style['case-filter__icon-wrapper']">
              <IconChevronRight />
            </div>
          </div>
          <div
            v-if="!isEnd"
            :class="$style['case-filter__gradient--right']"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "swiper/css";
import "swiper/css/navigation";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
import type { SwiperOptions } from "swiper";
import type { Swiper } from "swiper";
import ItemsSorter from "./Home/Cases/ItemsSorter.vue";
import { usePlatform } from "@/composables/usePlatform";

const platform = usePlatform();

const props = defineProps<{
  casesList: Array<{
    id: number;
    name: string;
    icon?: string | null;
    advantages?: {
      opened?: number;
      maxOpeners?: number;
      discount?: boolean;
    };
  }>;
  selectedCase: number;
}>();

const prev = ref<HTMLElement | null>(null);
const next = ref<HTMLElement | null>(null);
const swiperInstance = ref<Swiper | null>(null);

const swiperSet: SwiperOptions = reactive({
  speed: 400,
  navigation: {
    prevEl: prev,
    nextEl: next,
  },
  modules: [Navigation],
  breakpoints: {
    0: {
      freeMode: true,
      enabled: true,
      touchRatio: 1,
      resistance: true,
      resistanceRatio: 0,
    },
    601: {
      freeMode: false,
      enabled: true,
    },
  },
});

const emit = defineEmits<{
  (e: "sort", type: string): void;
  (e: "select-type", id: number): void;
}>();

const handleSort = (sortType: string) => {
  emit("sort", sortType);
};

const setActiveCollection = (id: number) => {
  emit("select-type", id);

  if (swiperInstance.value) {
    const selectedIndex = props.casesList.findIndex((c) => c.id === id);
    if (selectedIndex !== -1) {
      const visibleSlides = Math.floor(
        swiperInstance.value.width /
          (swiperInstance.value.slides[0]?.offsetWidth || 1),
      );
      const centerOffset = Math.floor(visibleSlides / 2);
      swiperInstance.value.slideTo(Math.max(0, selectedIndex - centerOffset));
    }

    if (id === props.casesList.at(-1)?.id) {
      isEnd.value = true;
    }
  }
};

watch(
  () => props.selectedCase,
  (newId) => {
    if (!newId) return;

    const selectedIndex = props.casesList.findIndex((c) => c.id === newId);
    if (selectedIndex === -1) return;

    if (swiperInstance.value) {
      const visibleSlides = Math.floor(
        swiperInstance.value.width /
          (swiperInstance.value.slides[0]?.offsetWidth || 1),
      );
      const centerOffset = Math.floor(visibleSlides / 2);
      swiperInstance.value.slideTo(
        Math.max(0, selectedIndex - centerOffset + 1),
      );
    }

    if (newId === props.casesList.at(-1)?.id) {
      isEnd.value = true;
    }
  },
);

const isBeginning = ref(true);
const isEnd = ref(false);

const onSwiper = (swiper: Swiper) => {
  swiperInstance.value = swiper;

  isBeginning.value = swiper.isBeginning;
  isEnd.value = swiper.isEnd;

  swiper.on("slideChange", () => {
    isBeginning.value = swiper.isBeginning;
    isEnd.value = swiper.isEnd;
  });
};

const slideNext = () => {
  if (swiperInstance.value) {
    const currentIndex = swiperInstance.value.activeIndex;
    swiperInstance.value.slideTo(currentIndex + 2);
  }
};

const slidePrev = () => {
  if (swiperInstance.value) {
    const currentIndex = swiperInstance.value.activeIndex;
    swiperInstance.value.slideTo(currentIndex - 2);
  }
};
</script>

<style lang="scss" module>
.case-filter {
  width: 100%;
}

.case-filter__filters {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.case-filter__scroll-container {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;

  @media screen and (max-width: $mobile-case-filter) {
    gap: 12px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.case-filter__types-wrapper {
  flex: 1;
  position: relative;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.case-filter__type {
  display: inline-flex;
  height: 56px;
  padding: 0 18px 0 16px;
  gap: 6px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 18px;
  background: var(--case-collection-chips-default);
  border: 2px solid transparent;
  box-sizing: border-box;

  @media screen and (max-width: $mobile-case-filter) {
    height: 36px;
    padding: 0 10px 0 8px;
    gap: 4px;
    border-radius: 14px;
    border: 1px solid transparent;
  }

  &--selected {
    border-color: var(--general-transparent-light-10);
    background: var(--case-collection-chips-active);
    box-shadow: 0 0 7.5px 7px rgba(255, 255, 255, 0.02) inset;
    transition: all 0.15s ease-in-out;

    @media screen and (max-width: $mobile-case-filter) {
      border-width: 1px;
    }
  }

  @media (hover: hover) {
    &:hover {
      background: var(--case-collection-chips-active);
    }
  }

  &:active {
    background: var(--case-collection-chips-pressed);
  }
}

.case-filter__type--no-icon {
  padding: 0 18px;

  @media screen and (max-width: $mobile-case-filter) {
    padding: 0 10px;
  }
}

.case-filter__type-icon {
  display: flex;
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
  fill: var(--general-white);

  @media screen and (max-width: $mobile-case-filter) {
    width: 24px;
    height: 24px;
  }
}

.case-filter__type-name {
  color: var(--general-white);
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.2px;

  @media screen and (max-width: $mobile-case-filter) {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.12px;
  }
}

.case-filter__advantages {
  display: flex;
  gap: 8px;
}

.case-filter__counter,
.case-filter__discount {
  display: flex;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 10px;
  backdrop-filter: blur(20px);

  svg {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }

  @media screen and (max-width: $mobile-case-filter) {
    width: 22px;
    height: 22px;
    border-radius: 8px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
}

.case-filter__counter {
  background: #ffc7000f;

  svg {
    fill: $yellow;
  }
}

.case-filter__discount {
  background: rgba(255, 51, 51, 0.06);

  svg {
    fill: #fa5252;
  }
}

.case-filter__button--prev,
.case-filter__button--next {
  position: absolute;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  height: 72px;
  display: inline-flex;
  width: 80px;
  align-items: center;
  cursor: pointer;
  margin: 0;

  @media screen and (max-width: $tablet-case-filter) {
    position: relative;
    width: 48px;
    height: 48px;
    transform: none;
    top: auto;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
  }

  @media screen and (max-width: $mobile-case-filter) {
    display: none;
  }
}

.case-filter__button--next {
  right: -1px;
  justify-content: flex-end;
}

.case-filter__button--prev {
  left: 0;
  justify-content: flex-start;
}

.case-filter__gradient--left,
.case-filter__gradient--right {
  position: absolute;
  top: 0;
  width: 80px;
  height: 100%;
  z-index: 3;
  background: linear-gradient(
    90deg,
    rgba(22, 23, 24, 0) 0%,
    var(--gradient-background) 93.29%
  );

  @media screen and (max-width: $mobile-case-filter) {
    display: none;
  }
}

.case-filter__gradient--left {
  left: 0;
  transform: rotate(180deg);

  @media screen and (max-width: $tablet-case-filter) {
    left: -8px;
  }
}

.case-filter__gradient--right {
  right: -1px;

  @media screen and (max-width: $tablet-case-filter) {
    right: -8px;
  }
}

.case-filter__icon-wrapper {
  display: flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  background: var(--general-transparent-light-2);
  backdrop-filter: blur(16px);
  z-index: 2;

  @media screen and (max-width: $tablet-case-filter) {
    width: 40px;
    height: 40px;
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    fill: var(--general-white);

    @media screen and (max-width: $tablet-case-filter) {
      width: 16px;
      height: 16px;
    }
  }
}

.case-filter__button--hidden {
  opacity: 0;
  pointer-events: none;

  @media screen and (max-width: $tablet-case-filter) {
    opacity: 1;
    pointer-events: auto;

    .case-filter__icon-wrapper {
      background: var(--button-tonal-disabled);

      svg {
        fill: rgb(76, 78, 82);
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.case-filter__swiper {
  user-select: none;
  touch-action: pan-y pinch-zoom;
  cursor: grab;
  position: relative;
  z-index: 2;
  flex: 1;
  border-radius: 18px;

  @media screen and (max-width: $mobile-case-filter) {
    cursor: default;
    border-radius: 14px;
  }

  &:active {
    cursor: grabbing;

    @media screen and (max-width: $mobile-case-filter) {
      cursor: default;
    }
  }

  .swiper-slide {
    width: auto;
    position: relative;
    z-index: 3;
  }
}
</style>
