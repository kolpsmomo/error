<template>
  <ContainerPopup
    v-model="isShown"
    :inverted="inverted"
    @update:model-value="close"
  >
    <NuxtErrorBoundary>
      <swiper
        :speed="swiperSettings.speed"
        :modules="[Navigation]"
        :loop="swiperSettings.loop"
        @swiper="onSwiper"
      >
        <swiper-slide
          v-for="(step, index) in steps"
          :key="index"
        >
          <ItemPopup :title="step.title">
            <template #media>
              <video
                v-if="mediaType === 'video'"
                autoplay
                loop
                muted
                playsinline
              >
                <source
                  :src="step.media"
                  type="video/mp4"
                />
              </video>
              <img
                v-else
                :src="step.media"
              />
            </template>
            <template #info>
              <div :class="$style.counter">
                {{ activeIndex + 1 }} {{ t("misc.from") }} {{ steps.length }}
              </div>
            </template>
            <template #text>
              <div v-html="step.text" />
            </template>
          </ItemPopup>
        </swiper-slide>
      </swiper>
    </NuxtErrorBoundary>
    <div :class="$style.footer">
      <BaseButton
        size="m"
        :wide="false"
        variant="ghost"
        :class="[
          (activeIndex > 0 || backBtnIsAlwaysVisible) && $style.visible,
          $style.prev,
        ]"
        :data-test="
          $attrs['data-test'] &&
          $attrs['data-test'] + '-slides-prev-button-' + activeSlideNumber
        "
        @click="swiperPrevSlide"
        >{{ t("onboarding.buttons.back_btn") }}</BaseButton
      >
      <BaseButton
        v-if="isLastSlide"
        size="m"
        :wide="false"
        :data-test="
          $attrs['data-test'] && $attrs['data-test'] + '-slides-close-button'
        "
        @click="close(false)"
      >
        {{ finishBtnText }}
      </BaseButton>
      <BaseButton
        v-else
        size="m"
        :wide="false"
        :data-test="
          $attrs['data-test'] &&
          $attrs['data-test'] + '-slides-next-button-' + activeSlideNumber
        "
        @click="swiperNextSlide"
        >{{ t("onboarding.buttons.forward_btn") }}</BaseButton
      >
    </div>
  </ContainerPopup>
</template>

<script setup lang="ts">
import ContainerPopup from "./ContainerPopup.vue";
import ItemPopup from "./ItemPopup.vue";
import type { Swiper as SwiperType } from "swiper";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper";
import BaseButton from "@/components/Shared/Base/BaseButton.vue";

type Buttons = {
  prev?: string;
  next?: string;
  finish?: string;
};

type Steps = Array<{
  title: string;
  text?: string;
  hint?: string;
  media: string;
}>;

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    buttons?: Buttons;
    mediaType?: "video" | "img";
    steps: Steps;
    backBtnIsAlwaysVisible?: boolean;
    finishBtnText: string;
    inverted?: boolean;
  }>(),
  {
    mediaType: "img",
    backBtnIsAlwaysVisible: false,
    inverted: false,
  },
);

const isLastSlide = computed(() => {
  return activeIndex.value === props.steps.length - 1;
});

const { t } = useI18n();
let swiperSettings = reactive({
  speed: 600,
  modules: [Pagination, Navigation],
  loop: false,
});

const swiperInstance = ref();
const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper;
};

const activeIndex = computed(() => swiperInstance.value?.activeIndex);
const activeSlideNumber = computed(() => activeIndex.value + 1);
const showStartPopup = () => {
  if (activeIndex.value < 1 && props.backBtnIsAlwaysVisible) {
    emits("action:backBtn");
    return true;
  }
};

const swiperNextSlide = () => {
  swiperInstance.value.slideNext();
};
const swiperPrevSlide = () => {
  if (showStartPopup()) return;
  swiperInstance.value.slidePrev();
};

const emits = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
  (event: "action:backBtn"): void;
  (event: "close"): void;
}>();

const isShown = ref(false);

const close = (value: boolean) => {
  emits("update:modelValue", value);
  emits("close");
};

watch(
  () => props.modelValue,
  (value) => {
    isShown.value = value;
  },
  {
    immediate: true,
  },
);
</script>

<style module>
.prev {
  visibility: hidden;
}

.visible {
  visibility: visible;
}

.counter {
  margin: auto;
  margin-top: 20px;
  text-align: center;
}

.footer {
  margin: 0 auto;
  margin-top: 26px;
  max-width: 320px;
  display: flex;
  justify-content: space-between;
}
</style>
