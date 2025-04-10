<template>
  <Container
    ref="containerRef"
    :class="$style.cases"
  >
    <div :class="$style['cases__all-cases']">
      <IconCases :class="$style['cases__all-cases-icon']" />
      <span :class="$style['cases__all-cases-title']">{{
        t("home.cases.all_cases")
      }}</span>
    </div>
    <div
      ref="filterBlockRef"
      :class="$style['cases__sticky-wrapper']"
      :style="{
        '--sticky-background': stickyBackground,
      }"
    >
      <CaseFilterBlock
        :class="$style['case-filter']"
        :cases-list="casesFilterList"
        :selected-case="selectedType"
        @sort="handleSort"
        @select-type="handleActiveCollectionChange"
      />
    </div>
    <div :class="$style['cases__collections-wrapper']">
      <CasesBlock
        v-for="caseBlock in unifiedCasesList"
        :key="caseBlock.name"
        :data-case-name="caseBlock.name"
      >
        <div :class="$style['cases__case-name']">
          <img
            v-if="caseBlock.icon"
            :class="$style['cases__case-name-icon']"
            :src="caseBlock.icon"
            alt=""
          />
          <GeneralName>{{ caseBlock.name }}</GeneralName>
        </div>
        <CaseLinksContainer>
          <CaseLink
            v-for="_case in caseBlock.cases"
            :key="_case.id"
            :_case="_case"
            :type="caseBlock.name"
          />
        </CaseLinksContainer>
      </CasesBlock>
    </div>
  </Container>
</template>

<script lang="ts" setup>
import Container from "./Cases/Container.vue";
import { debounce } from "@/utils/debounce";
import CaseFilterBlock from "~/components/CaseFilterBlock.vue";
import CasesBlock from "./Cases/CasesBlock.vue";
import GeneralName from "./Cases/GeneralName.vue";
import CaseLinksContainer from "./Cases/CaseLinksContainer.vue";
import CaseLink from "./Cases/CaseLink.vue";
import { useI18n } from "vue-i18n";
import { useFlag } from "@/composables/useFlag";
import { usePlatform } from "@/composables/usePlatform";
import { useCasesStore } from "@/stores/cases";
import { useCoreStore } from "@/stores/core";
import type { CaseList } from "~/api_gen";

const { t } = useI18n();
const platform = usePlatform();
const store = useCasesStore();
const coreStore = useCoreStore();
const stickyBackground = computed(() =>
  platform.is.standoff
    ? "var(--general-new-background)"
    : "var(--general-background)",
);

const vkCaseIsEnabled = useFlag("vk_case");
const tgCaseIsEnabled = useFlag("telegram_case");
const cypherTapCaseIsEnabled = useFlag("telegram_cypher_tap_case");

const selectedType = ref<number>(1);
const sortType = ref<string | null>(null);
const isUserScroll = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const filterBlockRef = ref<HTMLElement | null>(null);
const isMobile = ref(window?.innerWidth < 1301);
const collectionElements = ref<HTMLElement[]>([]);
const disableScrollSelection = ref(false);
const scrollTimeoutId = ref<ReturnType<typeof setTimeout> | null>(null);
const elementsRects = ref<DOMRect[]>([]);
const totalOffsetCache = ref<number>(0);
const needsRecalculation = ref(true);

const showFreeCases = computed(
  () =>
    !coreStore.isUserIndia &&
    !usePlatform().is.cs2 &&
    (vkCaseIsEnabled.value ||
      tgCaseIsEnabled.value ||
      cypherTapCaseIsEnabled.value) &&
    (store.cases[`${platform.code}`]?.freeCases?.cases ?? []).length > 0,
);

const paidCases = computed(() => store.cases[`${platform.code}`].paidCases);

const freeCasesList = computed(
  () => store.cases[`${platform.code}`].freeCases?.cases ?? [],
);

const casesFilterList = computed(() => {
  let id = 1;

  const allCases = paidCases.value.map((caseBlock) => ({
    id: id++,
    name: caseBlock.name,
    advantages: {
      discount: caseBlock.cases?.some(hasCaseDiscount),
    },
    icon: caseBlock.icon,
  }));

  if (showFreeCases.value && allCases.length > 0) {
    allCases.splice(1, 0, {
      id: id++,
      name: t("home.cases.free_cases"),
      advantages: { discount: false },
      icon: store.cases[`${platform.code}`].freeCases?.icon ?? "",
    });
  }

  return allCases;
});

const hasCaseDiscount = (caseItem: CaseList) => {
  if (!caseItem) return false;
  return (
    (typeof caseItem.discountPrice === "number" &&
      caseItem.discountPrice < caseItem.price) ||
    caseItem.oldPrice > caseItem.price
  );
};

const unifiedCasesList = computed(() => {
  const allCases: any[] = [...paidCases.value];

  if (showFreeCases.value && freeCasesList.value.length > 0) {
    allCases.splice(1, 0, {
      name: t("home.cases.free_cases"),
      cases: freeCasesList.value,
      icon: store.cases[`${platform.code}`].freeCases?.icon ?? "",
    });
  }

  return sortType.value ? sortCases(allCases) : allCases;
});

const sortCases = (cases: any[]) => {
  return cases.map((collection) => ({
    ...collection,
    cases: [...(collection.cases || [])].sort((a: any, b: any) => {
      switch (sortType.value) {
        case "priceUp":
          return (a.price || 0) - (b.price || 0);
        case "priceDown":
          return (b.price || 0) - (a.price || 0);
        default:
          return 0;
      }
    }),
  }));
};

const handleSort = (type: string) => {
  sortType.value = type;
};

const handleActiveCollectionChange = (id: number) => {
  selectedType.value = id;
  isUserScroll.value = false;

  if (scrollTimeoutId.value) clearTimeout(scrollTimeoutId.value);
  disableScrollSelection.value = true;
  scrollTimeoutId.value = setTimeout(() => {
    disableScrollSelection.value = false;
  }, 1000);
};

const scrollToCollection = (name: string) => {
  const collection = document.querySelector(`[data-case-name="${name}"]`);
  const filterBlock = filterBlockRef.value;
  if (!collection || !filterBlock) return;

  const filterHeight = filterBlock.getBoundingClientRect().height;
  const headerHeight = isMobile.value ? 0 : 88;
  const scrollOffset =
    collection.getBoundingClientRect().top +
    window.scrollY -
    (headerHeight + filterHeight + 16);
  window.scrollTo({ behavior: "smooth", top: scrollOffset });
};

const updateElementsCache = () => {
  nextTick(() => {
    collectionElements.value = Array.from(
      document.querySelectorAll<HTMLElement>("[data-case-name]"),
    );

    const scrollY = window.scrollY;
    elementsRects.value = collectionElements.value.map((el) => {
      const rect = el.getBoundingClientRect();
      return new DOMRect(rect.x, rect.y + scrollY, rect.width, rect.height);
    });

    const headerHeight = isMobile.value ? 0 : 88;
    const filterHeight =
      filterBlockRef.value?.getBoundingClientRect().height || 0;
    totalOffsetCache.value = headerHeight + filterHeight;

    needsRecalculation.value = false;
  });
};

const updateCollectionElements = updateElementsCache;

const findVisibleCollection = () => {
  if (collectionElements.value.length === 0) return null;

  if (needsRecalculation.value) {
    updateElementsCache();
  }

  const viewportTop = window.scrollY;
  const viewportBottom = viewportTop + window.innerHeight;

  let maxVisibility = 0;
  let mostVisibleIndex = -1;

  for (let i = 0; i < elementsRects.value.length; i++) {
    const rect = elementsRects.value[i];
    const elementTop = rect.y - totalOffsetCache.value;
    const elementBottom = rect.y + rect.height;

    const visibleTop = Math.max(elementTop, viewportTop);
    const visibleBottom = Math.min(elementBottom, viewportBottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    const visibility = visibleHeight / rect.height;

    if (visibility > maxVisibility) {
      maxVisibility = visibility;
      mostVisibleIndex = i;
    }
  }

  if (mostVisibleIndex === -1) return null;
  return collectionElements.value[mostVisibleIndex].dataset.caseName || null;
};

const handleScroll = debounce(() => {
  if (disableScrollSelection.value) return;

  isUserScroll.value = true;
  const visibleCollectionName = findVisibleCollection();
  if (!visibleCollectionName) return;

  const matchingCase = casesFilterList.value.find(
    (c) => c.name === visibleCollectionName,
  );
  if (matchingCase && matchingCase.id !== selectedType.value) {
    selectedType.value = matchingCase.id;
  }
}, 25);

const handleResize = debounce(() => {
  isMobile.value = window.innerWidth < 1301;
  needsRecalculation.value = true;
  updateElementsCache();
}, 1000);

watch(
  unifiedCasesList,
  (newValue, oldValue) => {
    if (!oldValue || newValue.length !== oldValue.length) {
      updateCollectionElements();
    }
  },
  { immediate: true },
);

watch(
  selectedType,
  (newId: number) => {
    if (!newId || isUserScroll.value) return;

    const selectedCase = casesFilterList.value.find((c) => c.id === newId);
    if (selectedCase) {
      scrollToCollection(selectedCase.name);
    }
  },
  { immediate: true },
);

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" module>
.cases {
  font-family: "PP-Pangram-Sans-BC-Rounded";
  margin-top: 80px;

  @media screen and (max-width: $tablet-case-filter) {
    margin-top: 56px;
  }
}

.cases__sticky-wrapper {
  position: sticky;
  top: 68px;
  z-index: 10;
  background: var(--sticky-background);

  @media screen and (max-width: 1300px) {
    top: 0;
  }
}

.cases__collections-wrapper {
  gap: 40px;
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  @media screen and (max-width: $tablet-case-filter) {
    margin-top: 24px;
  }
}

.cases__all-cases {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 16px;

  @media screen and (max-width: $tablet-case-filter) {
    margin-bottom: 8px;
    gap: 12px;
  }

  @media screen and (max-width: $tablet-case-filter) {
    gap: 8px;
  }
}

.cases__all-cases-icon {
  width: 56px;
  height: 56px;
  fill: var(--general-transparent-light-10);

  @media screen and (max-width: $tablet-case-filter) {
    width: 40px;
    height: 40px;
  }

  @media screen and (max-width: $mobile-case-filter) {
    width: 32px;
    height: 32px;
  }
}

.cases__all-cases-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.48px;

  @media screen and (max-width: $tablet-case-filter) {
    font-size: 32px;
    letter-spacing: -0.32px;
  }

  @media screen and (max-width: $mobile-case-filter) {
    font-size: 26px;
    letter-spacing: -0.13px;
  }
}

.cases__case-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cases__case-name-icon {
  width: 64px;
  height: 64px;

  @media screen and (max-width: $tablet-case-filter) {
    width: 52px;
    height: 52px;
  }

  @media screen and (max-width: $mobile-case-filter) {
    width: 32px;
    height: 32px;
  }
}

.case-filter {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
