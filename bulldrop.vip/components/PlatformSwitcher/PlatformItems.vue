<template>
  <div :class="[$style.themes, $style['themes--' + size]]">
    <template v-if="platform">
      <template
        v-for="(key, value) in platform.ALL_PLATFORMS_DATA"
        :key="value"
      >
        <a
          v-if="
            (key.title != 'PUBGM' && coreStore.userCountry === 'IN') ||
            (key.title != 'BGMI' && coreStore.userCountry != 'IN')
          "
          :href="`/${value}`"
          :data-test="'first_platform_choose_' + key.code"
          :class="[
            $style.themes__item,
            $style['themes__item--' + size],
            checkIfSelected(value) && $style.choosenCard,
            checkIfNotSelected(value) && $style.choosenCardNone,
          ]"
          @click.prevent="changePlatform(value)"
          @mouseenter="mouseEnter(value)"
          @mouseleave="mouseLeave"
        >
          <div
            :class="[
              $style[key.code],
              $style.themes__wrapper,
              $style['themes__wrapper--' + size],
            ]"
          >
            <div :class="$style.themes__title">{{ key.title }}</div>
            <div
              :class="[
                $style.card__img,
                $style['card__img--' + key.img],
                $style['card__img--' + size],
              ]"
            ></div>
          </div>
        </a>
      </template>
    </template>
    <div
      v-if="gamePlaceholderRequired"
      :class="$style.themes__placeholder"
    >
      <div :class="$style.themes__placeholder__text">
        Скоро тут будет новая игра
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { PlatformName } from "~/types";

type SizeType = "sm" | "md";

const props = defineProps({
  size: {
    type: String as PropType<SizeType>,
    default: "sm",
    validator: (size: SizeType) => ["md", "sm"].includes(size),
  },
  isSelectable: Boolean,
});

const platform = usePlatform();
const coreStore = useCoreStore();
const gamePlaceholderRequired = ref(false);
const chosenPlatform = ref<null | PlatformName>(null);
const hoveredPlatform = ref<null | String>(null);

const changePlatform = (value: PlatformName) => {
  coreStore.hidePlatfromSwitcher();
  platform.change(value);
};

const mouseEnter = (value: PlatformName) => {
  chosenPlatform.value = null;
  hoveredPlatform.value = value;
  if (props.isSelectable) chosenPlatform.value = value;
};

const mouseLeave = () => {
  hoveredPlatform.value = null;
  chosenPlatform.value = null;
};

const checkIfNotSelected = (platform: PlatformName) => {
  return (
    (chosenPlatform.value && platform !== chosenPlatform.value) ||
    (hoveredPlatform.value && platform !== hoveredPlatform.value)
  );
};

const checkIfSelected = (platform: PlatformName) => {
  return platform === chosenPlatform.value;
};
</script>

<style module lang="scss">
@mixin choosenCard {
  filter: saturate(1.3);
  .card__img {
    transform: scale(1.1);
  }
}

.themes {
  backdrop-filter: blur(40px);
  display: flex;
  border-radius: 10px;
  overflow: hidden;

  &__title {
    max-width: 100px;
    line-height: 16px;
    font-size: 16px;
    @media screen and (max-width: 475px) {
      font-size: 14px;
    }
  }

  &__item {
    cursor: pointer;
    position: relative;
    background: var(--general-transparent-mid-35);
    width: 100%;
    line-height: 1.125rem;
    border-radius: 10px;
    transition: all 0.2s linear;
    overflow: hidden;
    color: var(--general-white);

    &:nth-child(n + 3) .card__img--md {
      width: 90%;
      height: 90%;
    }

    + .themes__item {
      &--sm {
        margin-left: 10px;
      }
    }

    &:hover {
      @include choosenCard;
    }

    .card__img {
      position: absolute;
      right: 0;
      bottom: 0;
      transition: all 0.2s linear;
      background-size: cover;
      background-repeat: no-repeat;
      background-position-y: bottom;
      background-position-x: right;

      &--standoff {
        background-image: url("~/assets/games/standoff2/switcher.png");
      }
      &--genshin {
        background-image: url("~/assets/games/genshin/switcher.png");
      }
      &--pubg {
        background-image: url("~/assets/games/pubg/switcher.png");
      }
      &--roblox {
        background-image: url("~/assets/games/roblox/switcher.png");
      }
      &--cs2 {
        background-image: url("~/assets/games/cs2/switcher.png");
      }

      &--sm {
        @include size(112px, 119px);
      }

      &--md {
        @include size(162px, 169px);
        right: 6%;
        @media screen and (max-width: 475px) {
          @include size(112px, 119px);
        }
      }
    }

    &--sm {
      @include size(120px, 153px);

      @media screen and (max-width: 750px) {
        @include size(105px, 127px);
        &:nth-child(-n + 2) {
          width: 100%;
        }
      }

      @media screen and (max-width: 475px) {
        height: 127px;
        width: 100%;
      }
      font-size: 16px;
    }

    &--md {
      @include size(100%, 180px);
      font-size: 20px;

      @media screen and (max-width: 475px) {
        @include size(100%, 162px);
        font-size: 16px;
      }
    }
  }
  &__placeholder {
    display: none;
  }
  &__wrapper {
    @include square(100%);

    &--sm {
      padding: 8px;
    }

    &--md {
      padding: 14px 12px;
    }
  }
  .standoff {
    background: var(--bdrop-theme-switcher-standoff);
  }
  .genshin {
    background: var(--bdrop-theme-switcher-genshin);
  }
  .pubg {
    background: var(--bdrop-theme-switcher-pubg);
  }
  .roblox {
    background: var(--bdrop-theme-switcher-roblox);
  }
  .cs2 {
    background: var(--bdrop-theme-switcher-cs2);
  }
  @media screen and (max-width: 750px) {
    display: grid;
    grid-template-areas:
      "a a a b b b"
      "c c d d e e";
    grid-template-rows: repeat(2, 1fr);
    grid-row-gap: 16px;
    grid-column-gap: 16px;

    & > :first-child {
      grid-area: a;
    }

    & > :nth-child(2) {
      grid-area: b;
    }
    & > :nth-child(3) {
      grid-area: c;
    }

    & > :nth-child(4) {
      grid-area: d;
    }

    & > :nth-child(5) {
      grid-area: e;
    }

    &--sm {
      grid-row-gap: 8px;
      grid-column-gap: 8px;
    }
    &__item {
      & + .themes__item {
        &--sm,
        &--md {
          margin-left: 0;
        }
      }
    }
  }
  @media screen and (max-width: 590px) {
    &__placeholder {
      display: flex;
      justify-content: center;
      border-radius: 10px;
      background: var(--general-underlay-2-lvl);
      align-items: center;
      padding: 5px;
      &__text {
        background: var(--bdrop-theme-switcher-placeholder-text-bg);
        opacity: 0.6;
        border-radius: 8px;
        max-width: 115px;
        width: 100%;
        text-align: center;
        font-size: 12px;
        padding: 6px 10px;
        color: var(--bdrop-theme-switcher-placeholder-text);
      }
    }
  }

  @media screen and (max-width: 475px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

.choosenCard {
  @include choosenCard;
}
.choosenCardNone {
  background-color: rgba(0, 0, 0, 1);
  opacity: 0.2;
}
</style>
