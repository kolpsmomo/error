<template>
  <div :class="$style['footer-stats']">
    <StatBlock>
      <template #icon>
        <IconUser />
      </template>
      <template #name> {{ t("footer.players") }} </template>
      <template #value>
        {{ valueToShortAbbr(coreStore.gameStats.players) }}
      </template>
    </StatBlock>
    <StatBlock>
      <template #icon>
        <IconCases />
      </template>
      <template #name> {{ t("footer.cases") }} </template>
      <template #value>
        {{ valueToShortAbbr(coreStore.gameStats.casesOpened) }}
      </template>
    </StatBlock>
    <StatBlock>
      <template #icon>
        <IconLadder />
      </template>
      <template #name> {{ t("footer.ladder_games") }} </template>
      <template #value>
        {{ valueToShortAbbr(coreStore.gameStats.ladderBets) }}
      </template>
    </StatBlock>
    <StatBlock>
      <template #icon>
        <IconCrash />
      </template>
      <template #name> {{ t("footer.crash_games") }} </template>
      <template #value>
        {{ valueToShortAbbr(coreStore.gameStats.crashBets) }}
      </template>
    </StatBlock>
    <StatBlock>
      <template #icon>
        <IconSapper />
      </template>
      <template #name> {{ t("footer.sapper_games") }} </template>
      <template #value>
        {{ valueToShortAbbr(coreStore.gameStats.minerBets) }}
      </template>
    </StatBlock>
    <StatBlock>
      <template #icon>
        <IconWheel />
      </template>
      <template #name> {{ t("footer.wheel_games") }} </template>
      <template #value>
        {{ valueToShortAbbr(coreStore.gameStats.wheelBets) }}
      </template>
    </StatBlock>
  </div>
</template>

<script lang="ts" setup>
import type { Locales } from "~/types";

import StatBlock from "./Stats/StatBlock.vue";

const { t, locale } = useI18n();
const coreStore = useCoreStore();

onBeforeMount(coreStore.getGameStats);

// todo fix for uz
function valueToShortAbbr(value: number) {
  const absValue = Math.abs(Number(value));
  if (isNaN(absValue)) return;
  const numbers = {
    billions: {
      value: 1.0e9,
      text: {
        en: "+ b",
        ru: "+ млрд",
        uz: "+ млрд",
      },
    },
    millions: {
      value: 1.0e6,
      text: {
        en: "+ mln",
        ru: "+ млн",
        uz: "+ млн",
      },
    },
    thousands: {
      value: 1.0e3,
      text: {
        en: "+ k",
        ru: "+ тыс",
        uz: "+ тыс",
      },
    },
  };

  if (absValue >= numbers.billions.value)
    return (
      (absValue / numbers.billions.value).toFixed(0) +
      numbers.billions.text[locale.value as Locales]
    );
  if (absValue >= numbers.millions.value)
    return (
      (absValue / numbers.millions.value).toFixed(0) +
      numbers.millions.text[locale.value as Locales]
    );
  if (absValue >= numbers.thousands.value)
    return (
      (absValue / numbers.thousands.value).toFixed(0) +
      numbers.thousands.text[locale.value as Locales]
    );

  return absValue;
}
</script>

<style lang="scss" module>
.footer-stats {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1070px;
  @media screen and (max-width: 1360px) {
    justify-content: space-between;
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: repeat(3, auto);
    grid-row-gap: 42px;
  }
  @media screen and (max-width: 680px) {
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-template-columns: repeat(2, auto);
    grid-row-gap: 42px;
  }
}
</style>
