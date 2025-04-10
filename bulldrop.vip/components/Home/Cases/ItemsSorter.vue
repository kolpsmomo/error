<template>
  <div
    ref="sorterRef"
    :class="$style['items-sorter']"
  >
    <BaseButton
      :class="[
        $style['items-sorter__container'],
        optionsAreRequired && $style['items-sorter__container--active'],
      ]"
      @click.stop="optionsAreRequired = !optionsAreRequired"
    >
      <IconDoubleArrows
        :class="[
          $style['items-sorter__icon'],
          optionsAreRequired && $style['items-sorter__icon--active'],
        ]"
      />
      <SortType
        :class="$style['item-sorter__mobile']"
        :is-open="optionsAreRequired"
      >
        {{ currentOption?.content }}
      </SortType>
      <IconChevronDown
        :class="[
          $style['items-sorter__icon'],
          $style['item-sorter__mobile'],
          optionsAreRequired && $style['items-sorter__icon--active'],
          optionsAreRequired && $style['items-sorter__icon--rotated'],
        ]"
      />
    </BaseButton>

    <Transition name="options">
      <BaseOptions
        v-if="optionsAreRequired"
        :mobile-left="mobileLeft"
        @hide-options="optionsAreRequired = false"
      >
        <BaseOption
          v-for="(option, index) in options"
          :key="index"
          :up="option.direction === 'up'"
          :down="option.direction === 'down'"
          :current="index === currentOptionIndex"
          @click="processOptionSelect(index)"
          >{{ option.content }}</BaseOption
        >
      </BaseOptions>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import BaseOptions from "./ItemsSorter/Options.vue";
import BaseOption from "./ItemsSorter/Option.vue";
import SortType from "./ItemsSorter/SortType.vue";
import BaseButton from "./ItemsSorter/Button.vue";

const props = defineProps<{
  mobileLeft: boolean;
}>();

const { mobileLeft } = toRefs(props);

const { t } = useI18n();

type Event =
  | "sortByPriceUp"
  | "sortByPriceDown"
  | "sortByQualityUp"
  | "sortByQualityDown";

type Option = {
  direction: string;
  content: string;
  event: Event;
};

const emits = defineEmits<{
  (e: Event): void;
}>();

const currentOption = ref<Option | null>(null);
const currentOptionIndex = ref<number | null>(null);
const options = ref<Option[]>([
  {
    direction: "down",
    content: t("home.cases.sort.price_desc"),
    event: "sortByPriceDown",
  },
  {
    direction: "up",
    content: t("home.cases.sort.price_asc"),
    event: "sortByPriceUp",
  },
]);

const optionsAreRequired = ref<boolean>(false);
const sorterRef = ref<HTMLElement | null>(null);

onBeforeMount(() => {
  const index = 1;

  currentOption.value = options.value[index];
  currentOptionIndex.value = index;
});

const processOptionSelect = (index: number) => {
  currentOptionIndex.value = index;
  currentOption.value = options.value[index];
  optionsAreRequired.value = false;
  emits(options.value[index].event);
};
</script>

<style lang="scss" module>
.items-sorter {
  display: flex;
  flex-shrink: 0;
  height: 56px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 18px;
  background: var(--button-tonal-additional-default);
  backdrop-filter: blur(20px);
  position: relative;
  z-index: 1;
  user-select: none;

  @media screen and (max-width: $mobile-case-filter) {
    height: 36px;
    width: 36px;
    flex-shrink: 0;
    position: sticky;
    left: 0;
    scroll-snap-align: start;
    white-space: nowrap;
    border-radius: 12px;
  }
}

.items-sorter__container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  padding: 0 20px;
  gap: 8px;
  border-radius: 18px;
  background: var(--button-tonal-additional-default);
  width: 100%;

  @media screen and (max-width: $mobile-case-filter) {
    padding: 0 8px;
    border-radius: 12px;
  }
}

.items-sorter__container--active {
  background: var(--button-tonal-additional-active);
}

.items-sorter__icon {
  width: 16px;
  height: 16px;
  fill: var(--general-grey);
  transition: all 0.25s ease-in-out;

  @media screen and (max-width: $mobile-case-filter) {
    width: 14px;
    height: 14px;
  }

  &--active {
    fill: var(--general-white);
  }

  &--rotated {
    transform: rotate(180deg);
  }
}

.item-sorter__mobile {
  @media screen and (max-width: $mobile-case-filter) {
    display: none;
  }
}

.options-enter-from,
.options-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.options-enter-active,
.options-leave-active {
  transition: 0.15s;
}
</style>
