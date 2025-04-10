<template>
  <div
    id="layout"
    :class="[$style['default-layout']]"
  >
    <Header />
    <RibbonPlaceholder v-if="route.meta.ribbonVisible">
      <Ribbon />
    </RibbonPlaceholder>
    <ClientOnly>
      <LazyChat
        v-if="chatIsRequired"
        :chat-area-is-required="chatAreaIsRequired"
        @hide-chat-area="chatAreaIsRequired = false"
        @show-chat-area="chatAreaIsRequired = true"
      />
      <LazySupportWidget v-if="supportWidgetIsRequired" />
      <Transition name="popup">
        <LazyPlatformSwitcher v-if="coreStore.platformSwitcherIsRequired" />
      </Transition>
      <Transition name="popup">
        <LazyPromocode v-if="promocodesStore.promocodeWindowIsRequired" />
      </Transition>
      <Transition name="popup">
        <LazyAuth v-if="userStore.authPopupIsRequired" />
      </Transition>
      <Transition name="popup">
        <LazyPhoneVerify v-if="phoneVerifyStore.verifyWindowIsRequired" />
      </Transition>
      <Transition name="popup">
        <LazyPhoneReVerify v-if="phoneVerifyStore.ReVerifyWindowIsRequired" />
      </Transition>
      <Transition name="popup">
        <template v-if="exchangerEventStore.showRewardPopup">
          <LazyExchangerRewardPopup v-if="exchangerEventEnable" />
          <LazyBossBattleRewardPopup v-else-if="bossBattleEnable" />
        </template>
      </Transition>
      <LazySliderPopup
        v-model="userStore.onboardingPopupIsRequired"
        media-type="video"
        :steps="onboardingData"
        :inverted="true"
        :finish-btn-text="t('onboarding.buttons.close_btn')"
        data-test="onboarding"
      />
      <Transition name="popup">
        <LazyNameRegister v-if="userStore.nameRegisterPopupIsRequired" />
      </Transition>
      <LazyBottomSheet
        v-if="coreStore.languageSubmenuIsRequired"
        :title="t('languages.choose_language')"
        @close="coreStore.hideLanguageSubmenu"
      >
        <SetLanguageLocales />
      </LazyBottomSheet>
    </ClientOnly>
    <SidePanel :footer-ref="footerRef" />
    <ClientOnly>
      <LazyTabBarMobile />
    </ClientOnly>
    <PageContent><slot /></PageContent>
    <Footer ref="footerRef" />
  </div>
</template>

<script setup lang="ts">
import PageContent from "~/components/Containers/PageContent.vue";
import LazyTabBarMobile from "~/components/TabBar/TabBarMobile.vue";
import LazyPlatformSwitcher from "~/components/PlatformSwitcher/PopupSwitcher.vue";
import LazyExchangerRewardPopup from "~/components/ExchangerEvent/RewardPopup.vue";
import LazyBossBattleRewardPopup from "~/components/BossBattle/RewardPopup.vue";
import LazySliderPopup from "~/components/Shared/Popup/SliderPopup.vue";
import { usePlatformSelection } from "~/composables/app/usePlatformSelection";
import { usePromocodeHandler } from "~/composables/app/usePromocodeHandler";
import { useAudioState } from "~/composables/app/useAudioState";
import { BATTLE_NAME } from "~/components/BossBattle/composables/initMainView";
import { EVENT_NAME } from "~/stores/exchanger";
import slide1 from "~/assets/Onboarding/01.mp4";
import slide2 from "~/assets/Onboarding/02.mp4";
import slide3 from "~/assets/Onboarding/03.mp4";
import slide1En from "~/assets/Onboarding/01_ENG.mp4";
import slide2En from "~/assets/Onboarding/02_ENG.mp4";
import slide3En from "~/assets/Onboarding/03_ENG.mp4";

const { t, locale } = useI18n();
const route = useRoute();
const userStore = useUserStore();
const coreStore = useCoreStore();
const platform = usePlatform();
const promocodesStore = usePromocodesStore();
const phoneVerifyStore = usePhoneVerifyStore();
const exchangerEventStore = useExchangerEventStore();
const footerRef = ref<HTMLElement | null>(null);
const chatIsRequired = ref(false);
const supportWidgetIsRequired = ref(false);
const chatAreaIsRequired = ref(false);
const isLoad = ref(false);

onNuxtReady(async () => {
  await pause(250);

  chatIsRequired.value = true;
  supportWidgetIsRequired.value = true;
  if (!userStore.nameRegisterPopupIsRequired) {
    await pause(1000);
    usePlatformSelection();
  }
  await pause(1000);
  usePromocodeHandler();
  await pause(1000);
  await pause(1000);
  useAudioState();
});

watchEffect(() => {
  if (usePlatform().is.standoff && route.name === "platform") {
    document?.body?.classList.add("main-standoff");
  } else {
    document?.body?.classList.remove("main-standoff");
  }
});

onMounted(() => {
  isLoad.value = true;

  // Не даём индусам зайти на pubg, а остальным на bgmi
  setTimeout(() => {
    if (coreStore.userCountry === "IN" && platform.is.pubg) {
      platform.change("bgmi");
    } else if (coreStore.userCountry !== "IN" && platform.is.bgmi) {
      platform.change("pubg");
    }
  }, 500);
});

const exchangerEventEnable = computed(() =>
  exchangerEventStore.rewardPopupData?.event?.slug.includes(EVENT_NAME),
);

const bossBattleEnable = computed(() =>
  exchangerEventStore.rewardPopupData?.event?.slug.includes(BATTLE_NAME),
);

const onboardingData = [
  {
    id: "1",
    name: t("onboarding.video_slides[0].name"),
    title: t("onboarding.video_slides[0].subtitle"),
    text: t("onboarding.video_slides[0].text"),
    media: locale.value === "ru" ? slide1 : slide1En,
  },
  {
    id: "2",
    name: t("onboarding.video_slides[1].name"),
    title: t("onboarding.video_slides[1].subtitle"),
    text: t("onboarding.video_slides[1].text"),
    media: locale.value === "ru" ? slide2 : slide2En,
  },
  {
    id: "3",
    name: t("onboarding.video_slides[2].name"),
    title: t("onboarding.video_slides[2].subtitle"),
    text: t("onboarding.video_slides[2].text"),
    media: locale.value === "ru" ? slide3 : slide3En,
  },
];
</script>

<style lang="scss" module>
.default-layout {
  position: relative;
  padding-top: 68px; // высота Header
  @media screen and (max-width: 1300px) {
    padding-top: 0 !important;
  }
}

.main {
  background: var(--general-new-background);
}
</style>
