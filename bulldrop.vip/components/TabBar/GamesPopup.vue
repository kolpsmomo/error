<template>
  <div
    ref="gamesRef"
    :class="$style['games']"
  >
    <NavLink
      v-for="game in games"
      :key="game.name"
      :class="$style['game']"
      :to="game.url"
      @click="goToGame(game.url)"
    >
      <div :class="$style['game__icon']">
        <img
          :src="components[game.icon]"
          :alt="game.icon"
        />
        <div :class="$style['game__icon--bg']"></div>
      </div>
      <span :class="$style['game__title']">{{
        t(`side_panel.${game.name}`)
      }}</span>
    </NavLink>
  </div>
</template>

<script setup lang="ts">
import CrashIcon from "~/assets/games/logo/Crash_tab_icon.png";
import LadderIcon from "~/assets/games/logo/Ladder_tab_icon.png";
import RouletteIcon from "~/assets/games/logo/Roulete_tab_icon.png";
import SapperIcon from "~/assets/games/logo/Sapper_tab_icon.png";
import TowerIcon from "~/assets/games/logo/Tower_tab_icon.png";
import UpgradeIcon from "~/assets/games/logo/Upgrade_tab_icon.png";
import WheelIcon from "~/assets/games/logo/Wheel_tab_icon.png";
import ContractsIcon from "~/assets/games/logo/Contracts_tab_icon.png";
import { normalize } from "~/utils/url/normalize";
import { useClickOutside } from "~/composables/useClickOutside";

const emits = defineEmits<{
  (e: "hide"): void;
}>();

const { t } = useI18n();
const isSapperEnabled = useFlag("miner");
const gamesRef = ref<Element | null>(null);
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

const goToGame = (url: string) => {
  emits("hide");
  navigateTo(url);
};

onMounted(async () => {
  await pause(1000);
  useClickOutside(gamesRef, () => {
    emits("hide");
  });
});
</script>

<style lang="scss" module>
.games {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: dense;
  grid-row-gap: 24px;
  grid-column-gap: 28px;
  background: var(--general-new-fill-2);
  border-radius: 20px;
  padding: 20px;
}

.game {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  .game__icon {
    width: 64px;
    height: 64px;
    background: $white-transparent-5;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }

    .game__icon--bg {
      background-color: black;
      position: absolute;
      display: none;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    &:hover .game__icon--bg {
      display: block;
      opacity: 0.4;
    }
  }

  .game__title {
    font-size: 12px;
    line-height: 12px;
    letter-spacing: -0.01em;
  }

  color: var(--general-white);
  text-decoration: none;
}
</style>
