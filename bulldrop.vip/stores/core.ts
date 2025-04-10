export const useCoreStore = defineStore("coreStore", () => {
  const showBossBattle = ref(true);
  const showExchanger = ref(false);
  const refreshMutex = ref<Promise<void>>();
  const vk = ref("https://vk.com/bulldrop");
  const inst = ref("https://vk.com/bulldrop");

  const cdn = computed(() => {
    if (useRequestURL().hostname === "bulldrop.vip") {
      return `https://bulldrop.vip/cdn-cgi/image`;
    } else if (useRequestURL().hostname === "bulldrop.uz") {
      return `https://bulldrop.uz/cdn-cgi/image`;
    } else {
      return `https://dev.bulltrade.org/cdn-cgi/image`;
    }
  });

  const tg = computed(() => {
    const platform = usePlatform();
    if (platform.is.pubg) return "https://t.me/bulldrop_pubg";
    if (platform.is.cs2) return "https://t.me/bulldrop_cs2";
    if (platform.is.genshin) return "https://t.me/bulldrop_genshin";
    if (platform.is.roblox) return "https://t.me/bulldroproblox";
    if (platform.is.bgmi) return "https://t.me/bulldrop_bgmi";
    return "https://t.me/bulldron";
  });
  const tgSupportBot = ref("https://t.me/BulldropSupportBot");
  const discord = ref("https://discord.gg/bulldrop");
  const gamelight = ref("https://gamelight.ru");
  const gamelightPubg = ref("https://gamelight.ru/products/15");
  const steamUrl = ref("https://gamelight.ru/products/19");
  const imageSrcsetExceptions = ["DragonEgg.webp"];
  const percent = ref<number | null>(null);
  const topUpBalanceFormIsRequired = ref(false);
  const withdrawFormIsRequired = ref(false);
  const headerMenuIsRequired = ref(false);
  const languageSubmenuIsRequired = ref(false);
  const platformSwitcherIsRequired = ref(false);
  const topUpInitialSum = ref(101);
  const audioIsRequired = ref(true);
  const userCountry = ref<string | null>(null);
  const isUserIndia = computed(() =>
    userCountry && userCountry.value === "IN" ? true : false,
  );
  const intersectionObserverIsSupported = computed(() => {
    if ("IntersectionObserver" in window) {
      return true;
    } else {
      return false;
    }
  });
  const gameStats = ref({
    players: 0,
    casesOpened: 0,
    ladderBets: 0,
    crashBets: 0,
    minerBets: 0,
    wheelBets: 0,
  });
  const gameStatsFetched = ref(false);

  async function getGameStats() {
    if (gameStatsFetched.value) return;
    const api = useApi();
    try {
      const data = await api.games.overviewFooterValuesRetrieve();
      gameStats.value = data;
      gameStatsFetched.value = true;
    } catch (error) {
      /* error */
    }
  }

  function toggleAudio() {
    audioIsRequired.value = !audioIsRequired.value;
    useCookie("audioIsRequired").value = JSON.stringify(audioIsRequired.value);
  }

  function showMenuHeader() {
    headerMenuIsRequired.value = true;
    languageSubmenuIsRequired.value = false;
  }

  function hideMenuHeader() {
    headerMenuIsRequired.value = false;
    document.getElementById("layout")!.style.removeProperty("overflow");
  }

  function toggleLanguageSubmenu() {
    languageSubmenuIsRequired.value = !languageSubmenuIsRequired.value;
  }

  function showLanguageSubmenu() {
    languageSubmenuIsRequired.value = true;
  }

  function hideLanguageSubmenu() {
    languageSubmenuIsRequired.value = false;
  }

  function showPlatformSwitcher() {
    platformSwitcherIsRequired.value = true;
  }

  function hidePlatfromSwitcher() {
    platformSwitcherIsRequired.value = false;
  }

  function togglePlatformSwitcher() {
    platformSwitcherIsRequired.value = !platformSwitcherIsRequired.value;
  }

  function showLanguageSubmenuMobile() {
    headerMenuIsRequired.value = false;
    languageSubmenuIsRequired.value = true;
  }

  function toggleMenuHeader() {
    headerMenuIsRequired.value = !headerMenuIsRequired.value;
    if (headerMenuIsRequired.value) {
      document.getElementById("layout")!.style.overflow = "hidden";
    } else {
      document.getElementById("layout")!.style.removeProperty("overflow");
    }
  }

  function showTopUpBalanceForm(initialSum: number = 0) {
    document.documentElement.style.overflow = "hidden";
    topUpBalanceFormIsRequired.value = true;
    topUpInitialSum.value = initialSum;
  }

  function hideTopUpBalanceForm() {
    topUpBalanceFormIsRequired.value = false;
    topUpInitialSum.value = 0;
    document.documentElement.style.overflow = "";
  }

  function showWithdrawForm() {
    document.documentElement.style.overflow = "hidden";
    withdrawFormIsRequired.value = true;
  }

  function hideWithdrawForm() {
    withdrawFormIsRequired.value = false;
    document.documentElement.style.overflow = "";
  }

  return {
    showBossBattle,
    showExchanger,
    refreshMutex,
    vk,
    cdn,
    tg,
    inst,
    tgSupportBot,
    discord,
    gamelight,
    gamelightPubg,
    steamUrl,
    percent,
    topUpBalanceFormIsRequired,
    withdrawFormIsRequired,
    headerMenuIsRequired,
    platformSwitcherIsRequired,
    languageSubmenuIsRequired,
    topUpInitialSum,
    audioIsRequired,
    intersectionObserverIsSupported,
    imageSrcsetExceptions,
    gameStats,
    userCountry,
    isUserIndia,
    getGameStats,
    toggleAudio,
    showMenuHeader,
    hideMenuHeader,
    toggleLanguageSubmenu,
    showLanguageSubmenu,
    hideLanguageSubmenu,
    showPlatformSwitcher,
    hidePlatfromSwitcher,
    togglePlatformSwitcher,
    showLanguageSubmenuMobile,
    toggleMenuHeader,
    showTopUpBalanceForm,
    hideTopUpBalanceForm,
    showWithdrawForm,
    hideWithdrawForm,
  };
});
