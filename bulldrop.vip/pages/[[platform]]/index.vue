<template>
  <Intro />
  <!-- <HomeEvent /> -->
  <CasesSkeleton v-if="casesStore.showCasesSkeleton" />
  <Cases v-else />
</template>

<script setup lang="ts">
import promoCodeEventTarget, {
  CASE,
} from "~/event-targets/promoCodeEventTarget";
import Intro from "~/components/Home/Intro.vue";
import Cases from "~/components/Home/Cases.vue";
import CasesSkeleton from "~/components/Home/CasesSkeleton.vue";

// const HomeEvent = defineAsyncComponent(
//   () => import("@/components/Home/HomeEvent.vue"),
// );
const platform = usePlatform();
const { t } = useI18n();
const casesStore = useCasesStore();
const coreStore = useCoreStore();

definePageMeta({ ribbonVisible: true, isHome: true });

useSeoMeta({
  title: t(
    `home.seo.${coreStore.isUserIndia && platform.code === "pubg" ? "bgmi" : platform.code}.title`,
  ),
  description: t(
    `home.seo.${coreStore.isUserIndia && platform.code === "pubg" ? "bgmi" : platform.code}.description`,
  ),
  keywords: t("home.keywords", { platform: platform.title }),
  ogTitle: t("home.og.title", { platform: platform.title }),
  ogDescription: t("home.og.description", { platform: platform.title }),
});

const fetchCasesData = async () => {
  await pause();
  await getPaidCases();
  await getFreeCases();
};

onBeforeMount(async () => {
  if (
    !casesStore.cases[`${platform.code}`].paidCases.length ||
    casesStore.refreshCasesCollection
  ) {
    await fetchCasesData();
    casesStore.refreshCasesCollection = false;
  }
  promoCodeEventTarget.addEventListener(CASE, getPaidCases);
});

onBeforeUnmount(() => {
  promoCodeEventTarget.removeEventListener(CASE, getPaidCases);
});

onUserLogin(async () => {
  if (!casesStore.cases[`${platform.code}`].paidCases.length) {
    await fetchCasesData();
  }
});

onUserLogout(async () => {
  if (!casesStore.cases[`${platform.code}`].paidCases.length) {
    await fetchCasesData();
  }
});

onLocaleChange(async () => {
  casesStore.dropCases();
  await fetchCasesData();
});

function getPaidCases() {
  return casesStore.getCases();
}

function getFreeCases() {
  return casesStore.getFreeCases();
}
</script>
