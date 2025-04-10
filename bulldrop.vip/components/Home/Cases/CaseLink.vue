<template>
  <Container :to="`/case/open/?id=${getRouteId}`">
    <div :class="$style['case-link-container__top']">
      <CaseImage
        :src="getCaseImage"
        :case-name="_case.name"
        :case-price="getCasePrice"
        :case-type="type"
      />
      <CaseName>{{ _case.name }}</CaseName>
    </div>
    <div>
      <CasePrice>
        <template v-if="isFreeCase">
          {{ t("open_case.open_case") }}
        </template>
        <template v-else-if="priceDisplay.currentPrice !== null">
          ฿
          <template v-if="priceDisplay.hasDiscount">
            <CasePriceDiscount>{{
              priceDisplay.currentPrice
            }}</CasePriceDiscount>
            <CasePriceOld>{{ priceDisplay.oldPrice }}</CasePriceOld>
          </template>
          <template v-else>{{ priceDisplay.currentPrice }}</template>
        </template>
      </CasePrice>
    </div>
    <CaseStatus
      v-if="!isFreeCase && priceDisplay.hasDiscount"
      :discount="discountPercentage"
    />
  </Container>
</template>

<script lang="ts" setup>
import Container from "./CaseLink/Container.vue";
import CaseImage from "./CaseLink/CaseImage.vue";
import CaseName from "./CaseLink/CaseName.vue";
import CasePrice from "./CaseLink/CasePrice.vue";
import CasePriceOld from "./CaseLink/CasePriceOld.vue";
import CasePriceDiscount from "./CaseLink/CasePriceDiscount.vue";
import type { VkCase, TelegramCase, CaseList } from "~/api_gen";
import CaseStatus from "~/components/Home/Cases/CaseLink/CaseStatus.vue";

type CaseType = CaseList | VkCase | TelegramCase;

const props = defineProps<{
  _case: CaseType;
  type: string;
}>();

const { t } = useI18n();

const isFreeCase = computed(() => props.type === t("home.cases.free_cases"));

const getRouteId = computed(() => {
  if ("id" in props._case) return props._case.id;
  if ("location" in props._case) return props._case.location;
  return "";
});

const getCaseImage = computed(() => {
  const img = props._case.img;
  if (!img) {
    return;
  }

  return img;
});

const getCasePrice = computed(() => {
  if (isFreeCase.value) return 0;
  return "price" in props._case ? props._case.price : 0;
});

const priceDisplay = computed(() => {
  let currentPrice = null;
  let oldPrice = null;

  if (!("price" in props._case) || !("oldPrice" in props._case)) {
    return {
      hasDiscount: false,
      currentPrice,
      oldPrice,
    };
  }

  currentPrice = props._case.price;
  oldPrice = props._case.oldPrice;

  if (typeof props._case.discountPrice === "number") {
    currentPrice = props._case.discountPrice;
    oldPrice = props._case.price;
  }

  const hasDiscount = currentPrice !== oldPrice;

  return {
    hasDiscount,
    currentPrice,
    oldPrice,
  };
});

const discountPercentage = computed(() => {
  if (!priceDisplay.value.hasDiscount) return "";

  const currentPrice = priceDisplay.value.currentPrice ?? 0;
  const oldPrice = priceDisplay.value.oldPrice ?? 0;

  const discountPercent = Math.max(
    0,
    100 - (currentPrice / oldPrice) * 100,
  ).toFixed();
  return `-${discountPercent}%`;
});
</script>

<style lang="scss" module>
.case-link-container__top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;

  @media screen and (max-width: 800px) {
    gap: 8px;
  }

  @media screen and (max-width: 425px) {
    gap: 6px;
  }
}
</style>
