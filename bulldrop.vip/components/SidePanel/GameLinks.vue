<template>
  <div :class="$style['game-links']">
    <div
      ref="links"
      :class="$style['game-links-inner']"
      data-test="game-links-inner"
    >
      <NavLink
        v-for="game in games"
        :key="game.name"
        :to="game.url"
        :class="$style['game-link']"
        @mouseenter="showGameName($event, game.name)"
        @mouseleave="hideGameName"
      >
        <component :is="components[game.icon]"></component>
      </NavLink>
      <Transition name="game-name">
        <div
          v-if="gameNameIsRequired"
          :style="{
            top: `${gameNameTop}px`,
            left: `${gameNameLeft}px`,
          }"
          :class="$style['game-name']"
        >
          {{ gameName }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import CrashIcon from "~/components/Icon/Crash.vue";
import LadderIcon from "~/components/Icon/Ladder.vue";
import RouletteIcon from "~/components/Icon/Roulette.vue";
import SapperIcon from "~/components/Icon/Sapper.vue";
import TowerIcon from "~/components/Icon/Tower.vue";
import UpgradeIcon from "~/components/Icon/Upgrade.vue";
import WheelIcon from "~/components/Icon/Wheel.vue";
import ContractsIcon from "~/components/Icon/Contracts.vue";
import { normalize } from "~/utils/url/normalize";

const components: Record<string, any> = {
  CrashIcon,
  LadderIcon,
  RouletteIcon,
  SapperIcon,
  TowerIcon,
  UpgradeIcon,
  WheelIcon,
  ContractsIcon,
};
const { t } = useI18n();
const links = ref<HTMLElement | null>(null);
const gameName = ref<string | null>(null);
const gameNameTop = ref<number | null>(null);
const gameNameLeft = ref<number | null>(null);
const gameNameIsRequired = ref(false);
const isSapperEnabled = useFlag("miner");

const games = computed(() => {
  const list = [
    {
      icon: "UpgradeIcon",
      url: normalize(`/games/upgrade`),
      name: "upgrade",
    },
    {
      icon: "ContractsIcon",
      url: normalize(`/games/contracts`),
      name: "contracts",
    },
    {
      icon: "RouletteIcon",
      url: normalize(`/games/roulette`),
      name: "roulette",
    },
    {
      icon: "LadderIcon",
      url: normalize(`/games/ladder`),
      name: "ladder",
    },
    {
      icon: "CrashIcon",
      url: normalize(`/games/crash`),
      name: "crash",
    },
    {
      icon: "WheelIcon",
      url: normalize(`/games/wheel`),
      name: "wheel",
    },
    {
      icon: "TowerIcon",
      url: normalize(`/games/tower`),
      name: "tower",
    },
  ];
  if (isSapperEnabled.value) {
    list.push({
      icon: "SapperIcon",
      url: normalize(`/games/sapper`),
      name: "sapper",
    });
  }
  return list;
});

const showGameName = (e: MouseEvent, gameNameValue: string) => {
  if (
    !links.value ||
    !(links.value instanceof HTMLElement) ||
    !e.target ||
    !(e.target instanceof HTMLElement)
  )
    return;

  const { top: containerTop, left: containerLeft } =
    links.value.getBoundingClientRect();
  const { top, left, width } = e.target.getBoundingClientRect();

  gameName.value = t(`mini_games.${gameNameValue}`);
  gameNameTop.value = top - containerTop; // Убрали деление height на 2
  gameNameLeft.value = left - containerLeft + width / 2;
  gameNameIsRequired.value = true;
};

const hideGameName = () => {
  gameNameIsRequired.value = false;
  gameName.value = null;
  gameNameTop.value = null;
  gameNameLeft.value = null;
};
</script>

<style lang="scss" scoped>
.game-name-enter-from,
.game-name-leave-to {
  opacity: 0;
  transform: translate(
    -50%,
    -50%
  ); /* Начальная позиция - выше на 150% от высоты */
}

.game-name-enter-active,
.game-name-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.game-name-enter-to,
.game-name-leave-from {
  opacity: 1;
  transform: translate(
    -50%,
    -150%
  ); /* Конечная позиция - выше на 150% от высоты */
}

.router-link-exact-active {
  background: var(--general-accident);
  svg {
    fill: var(--button-accident-content);
  }
}
</style>

<style lang="scss" module>
.game-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 10;
  border-radius: 14px;
  transition: background-color 0.2s linear;

  &:hover {
    background-color: var(--button-tonal-hover);
    svg {
      fill: var(--general-white);
    }
  }

  svg {
    width: 24px;
    fill: var(--general-grey);
    transition: 0.25s;
  }
}

.game-links {
  position: relative;
  height: 100%;
  backdrop-filter: blur(20px);
  border-radius: 20px;
  &-inner {
    display: flex;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: var(--general-transparent-dark-95);
    border-radius: 20px;
    padding: 8px;
    width: 100%;
    gap: 8px;
    border: 0.6px solid var(--general-stroke);
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
      width: 3px;
      border-radius: $br5;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      margin: 20px 0;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $grey-3;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: lighten($color: $grey-3, $amount: 5%);
    }
  }
}
.game-name {
  position: absolute;
  z-index: 1000;
  transform: translate(-50%, -150%);
  width: 100px;
  padding: 8px;
  border-radius: $br10;
  background-color: var(--button-tonal-hover);
  // backdrop-filter: blur(40px);
  font-size: 0.8125rem;
  color: var(--general-white);
  text-align: center;
  box-shadow: 0 5px 5px rgba($color: #000, $alpha: 0.25);
  pointer-events: none;
  will-change: transform, opacity;
}
</style>
