<template>
  <div
    :class="$style.controls"
    data-test="menu-controls"
  >
    <button
      v-if="userStore.userIsAuthorized"
      data-test="profile_button"
      @click="redirect('/profile')"
    >
      <IconUser /> {{ t("header.personal_account") }}
    </button>
    <button
      data-test="support_desktop_button"
      @click="userStore.openSupport"
    >
      <IconHelp /> {{ t("header.help") }}
    </button>
    <SetLanguageMobile
      data-test="set_language_mobile"
      :class="$style.mobile"
      @hideMenuHeader="coreStore.hideMenuHeader"
    />
    <Volume
      v-if="userStore.userIsAuthorized"
      data-test="volume_button_mobile"
      :class="$style.mobile"
    />
    <div :class="[$style.mobile, $style.chapter]">
      {{ t("header.sections.entertainment") }}
    </div>
    <button
      :class="$style.mobile"
      data-test="cases_button_mobile"
      @click="redirect('/')"
    >
      <IconCases /> {{ t("header.cases") }}
    </button>
    <button
      :class="$style.mobile"
      data-test="games_button_mobile"
      @click="redirect('/mini-games')"
    >
      <IconGames /> {{ t("header.games") }}
    </button>
    <a
      v-if="isGenshin && buyGemsEnabled"
      :class="$style.mobile"
      data-test="gensgin_shop_button_mobile"
      :href="coreStore.gamelight"
    >
      <IconGem /> {{ t("shop.buy_gems") }}
    </a>
    <button
      v-if="bullpassIsAvailable"
      :class="$style.mobile"
      data-test="bullpass_button_mobile"
      @click="redirect('/event')"
    >
      <IconEvent /> Bullpass
    </button>
    <button
      v-if="exchangerEventIsEnabled"
      :class="$style.mobile"
      @click="redirect(`/${EVENT_NAME}`)"
    >
      <IconMenuElf />
      {{ t(`header.elf_factory`) }}
    </button>
    <button
      v-if="bossBattleIsEnabled"
      :class="$style.mobile"
      data-test="boss_battle_button_mobile"
      @click="redirect('/boss-battle')"
    >
      <IconBossBattle />
      {{ t(`${BATTLE_KEY}.title`) }}
    </button>
    <template v-if="userStore.userIsAuthorized">
      <div :class="[$style.mobile, $style.chapter]">
        {{ t("header.sections.finance") }}
      </div>
      <button
        data-test="promocode_button"
        @click="() => promocodeStore.showPromocodePopup()"
      >
        <IconPromocode /> {{ t("header.promocode") }}
      </button>
      <button
        data-test="top_up_balance_button"
        @click="redirect('/balance/top-up')"
      >
        <IconWallet /> {{ t("header.top_up_balance") }}
      </button>
      <button
        data-test="withdraw_button"
        @click="redirect('/balance/withdrawal')"
      >
        <IconGold />{{
          platform.is.bgmi ? t("header.withdraw_codes") : t("header.withdraw")
        }}
        {{ currency }}
      </button>
    </template>
    <a
      v-if="platform.is.pubg"
      :class="$style['mobile-special']"
      :href="coreStore.gamelightPubg"
    >
      <IconGold />{{ t("header.buy_uc_cheap") }}
    </a>
    <a
      v-if="platform.is.cs2"
      :class="$style['mobile-special']"
      :href="coreStore.steamUrl"
    >
      <IconGold />{{ t("header.top_up_steam") }}
    </a>
    <div :class="[$style.mobile, $style.chapter]">
      {{ t("header.sections.other") }}
    </div>
    <a
      v-if="!coreStore.isUserIndia"
      :href="coreStore.tg"
      data-test="tg_button_mobile"
      target="__blank"
      :class="$style.mobile"
    >
      <IconTelegram />{{ t("header.telegram") }}
    </a>
    <a
      v-if="!coreStore.isUserIndia"
      :href="coreStore.vk"
      data-test="vk_button_mobile"
      target="__blank"
      :class="$style.mobile"
    >
      <IconVk />{{ t("header.vkontakte") }}
    </a>
    <a
      v-if="coreStore.isUserIndia"
      :href="platform.ALL_PLATFORMS_DATA.bgmi.insta"
      target="__blank"
      :class="$style['social-link']"
    >
      <IconInstagram /> {{ t("header.instagram") }}
    </a>
    <template v-if="userStore.userIsAuthorized">
      <button
        :class="$style.mobile"
        data-test="profile_settings_buttonMobile"
        @click="redirect('/user-settings')"
      >
        <IconGear />{{ t("header.profile_settings") }}
      </button>
      <button
        data-test="logout_button"
        @click="handleLogoutButtonClick"
      >
        <IconLogout /> {{ t("auth.logout") }}
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { normalize } from "~/utils/url/normalize";
import SetLanguageMobile from "~/components/SetLanguage/SetLanguageMobile.vue";
import Volume from "./Controls/Volume.vue";
import { EVENT_NAME } from "~/stores/exchanger";
import { BATTLE_KEY } from "~/components/BossBattle/composables/initMainView";

const { t } = useI18n();
const coreStore = useCoreStore();
const userStore = useUserStore();
const promocodeStore = usePromocodesStore();
const platform = computed(() => usePlatform());
const currency = computed(() => {
  if (platform.value.is.standoff) {
    return t("header.gold");
  } else if (platform.value.is.genshin) {
    return t("header.gems");
  } else if (platform.value.is.pubg) {
    return "UC";
  } else if (platform.value.is.roblox) {
    return t("header.robux");
  } else if (platform.value.is.cs2) {
    return t("header.skins");
  } else {
    return "";
  }
});
const isGenshin = computed(() => platform.value.is.genshin);
const buyGemsEnabled = useABFlag("buy_gems");
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

const redirect = (to: string) => {
  navigateTo(normalize(`/${to}`));
  coreStore.hideMenuHeader();
};

const handleLogoutButtonClick = () => {
  userStore.logout();
  coreStore.hideMenuHeader();
};

const exchangerEventIsEnabled = computed(() => {
  const platform = usePlatform();
  if (!platform.is.genshin && !platform.is.roblox) {
    return coreStore.showExchanger;
  } else {
    return false;
  }
});
</script>

<style lang="scss" module>
.controls {
  margin-top: 16px;
  @include safe-area-header;

  a,
  button,
  svg {
    transition: 0.25s;
  }

  a,
  button,
  .volume {
    position: relative;
    display: flex;
    align-items: center;
    width: 95%;
    margin: auto;
    padding: 13px 0px;
    padding-left: 24px;
    font-size: 0.875rem;
    color: var(--general-white);
    font-weight: 500;
    background-color: transparent;
    border: none;
    outline: none;
    text-decoration: none;
    border-radius: 14px;

    @media screen and (max-width: 1300px) {
      width: 100%;
    }

    &:hover {
      background: var(--button-ghost-active);
    }
  }

  svg {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    fill: var(--general-white);
  }
}

.desktop {
  width: 95%;
  margin: auto;
  @media screen and (max-width: 1300px) {
    display: none !important;
  }
}

.mobile {
  @media screen and (min-width: 1301px) {
    display: none !important;
  }
  &-special:hover {
    background: var(--gamelight-general) !important;
  }
}

.chapter {
  font-size: 12px;
  color: var(--general-white);
  margin-top: 25px;
  margin-bottom: 8px;
  padding-left: 24px;
}

.dot {
  position: absolute;
  left: 38px;
  top: 25px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: $red-1;
}
</style>
