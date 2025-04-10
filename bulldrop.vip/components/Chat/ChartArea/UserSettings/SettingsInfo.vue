<template>
  <div :class="$style['info-wrapper']">
    <div :class="$style['info-main']">
      <div :class="$style['info-main__title']">{{ infoItem.title }}</div>
      <div
        :class="[
          +infoItem.value >= 0 && $style.positive,
          (+infoItem.value < 0 || infoItem.negative) && $style.negative,
        ]"
      >
        {{ infoItem.fmtValue }}
      </div>
    </div>
    <div :class="$style['info-date']">{{ infoItem.date }}</div>
  </div>
</template>

<script setup lang="ts">
import type { ChatInfoItem } from "~/types";

type Props = {
  infoItem: ChatInfoItem;
};

const props = defineProps<Props>();
const { infoItem } = toRefs(props);
</script>

<style module lang="scss">
.info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 1rem;
  padding: 1rem 0 0.75rem;

  &:not(:last-child) {
    border-bottom: 0.6px solid var(--button-outlined-stroke-default);
  }

  .info-main {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 1rem;

    &__title {
      color: var(--general-white);
    }

    .positive {
      color: var(--functional-mint-additional);
    }

    .negative {
      color: var(--general-red);
    }
  }

  .info-date {
    font-size: 0.75rem;
    line-height: 1rem;
    color: #79767d;
  }
}
</style>
