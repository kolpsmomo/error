<template>
  <nav
    :class="$style['desktop-nav']"
    data-test="desktop-nav"
  >
    <NavLink
      :to="casesPath"
      :consider-platform="false"
    >
      <IconCases /> {{ $t("header.cases") }}
    </NavLink>
    <NavLink
      :to="miniGamesPath"
      :consider-platform="false"
    >
      <IconGames />{{ $t("header.games") }}
    </NavLink>
    <NavLink
      v-if="bullpassIsAvailable"
      :to="eventPath"
      :consider-platform="false"
    >
      <IconEvent />Bullpass
    </NavLink>
    <ClientOnly>
      <a
        v-if="isGenshin && buyGemsEnabled"
        :href="coreStore.gamelight"
      >
        <IconGem /> {{ $t("shop.buy_gems") }}
      </a>
    </ClientOnly>
    <NavLink
      v-if="bossBattleIsEnabled"
      :to="bossBattlePath"
      :consider-platform="false"
    >
      <IconBossBattle />
      {{ t(`${BATTLE_KEY}.title`) }}
    </NavLink>
    <NavLink
      v-if="exchangerEventIsEnabled"
      :to="exchangerEventPath"
      :consider-platform="false"
    >
      <IconMenuElf />
      {{ t(`header.${EVENT_KEY}`) }}
    </NavLink>
    <a
      v-if="platform.is.pubg"
      :class="$style['desktop-nav-special']"
      :href="coreStore.gamelightPubg"
    >
      <IconGold />{{ t("header.buy_uc_cheap") }}
    </a>
    <a
      v-if="platform.is.cs2"
      :class="$style['desktop-nav-special']"
      :href="coreStore.steamUrl"
    >
      <IconGold />{{ t("header.top_up_steam") }}
    </a>
  </nav>
</template>

<script setup lang="ts">
import { EVENT_KEY } from "~/stores/exchanger";
import { EVENT_NAME } from "~/stores/exchanger";
import { normalize } from "~/utils/url/normalize";
import { BATTLE_KEY } from "~/components/BossBattle/composables/initMainView";

const { t } = useI18n();

const coreStore = useCoreStore();
const platform = computed(() => usePlatform());

const isGenshin = computed(() => platform.value.is.genshin);
const buyGemsEnabled = useABFlag("buy_gems");
const casesPath = computed(() => normalize(`/`));

const miniGamesPath = computed(() => normalize(`/mini-games`));

const eventPath = computed(() => normalize(`/event`));

const exchangerEventPath = computed(() => normalize(`/${EVENT_NAME}`));

const bossBattlePath = computed(() => normalize(`/boss-battle`));

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
.router-link-exact-active {
  color: var(--general-white);
  background-color: var(--button-ghost-active);

  svg {
    fill: var(--general-white);
  }
}
</style>

<style lang="scss" module>
.desktop-nav {
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;

  a,
  button,
  svg {
    transition: 0.25s;
  }

  a,
  button {
    margin: 0 6px;
    padding: 0 16px;
    font-size: 0.875rem;
    color: $white-3;
    letter-spacing: 0.01em;
    font-weight: 500;
    border-radius: 10px;
    color: var(--general-grey);
    height: 40px;

    svg {
      flex-shrink: 0;
      fill: var(--general-grey);
    }

    &:not(.router-link-exact-active):hover {
      background-color: var(--button-ghost-hover);

      svg {
        fill: var(--general-grey);
      }
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }

  button {
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;
  }

  svg {
    width: 15px;
    height: 15px;
    margin-right: 10px;
    fill: $white-3;
  }

  &-special {
    border: 1px solid var(--button-outlined-stroke-default);
    color: var(--general-white) !important;
    svg {
      fill: var(--general-white) !important;
    }
    &:hover {
      background-color: var(--gamelight-general) !important;
    }
  }
}
</style>
