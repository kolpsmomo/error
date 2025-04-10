<template>
  <div
    :class="[
      $style.skin,
      type !== SkinEnum.BULLCOIN && $style[`${qualityClass}-skin`],
      size === 'table' && $style['table-skin'],
      hoverable && $style.hoverable,
    ]"
  >
    <div :class="$style['skin-bg']"></div>
    <Bar
      v-if="showBar"
      :quality-class="qualityClass"
      :size="size"
    />
    <div
      v-if="type !== SkinEnum.BULLCOIN"
      :class="$style['skin-descr']"
    >
      <Image
        v-if="showImage"
        :src="data.img"
        :alt="data.name ?? ''"
        data-test="img"
      />
      <div
        :data-role="dataRole"
        :class="[
          $style['skin-descr-main'],
          type === SkinEnum.ROULETTE && $style.roulette,
        ]"
      >
        <NameBlock v-if="showDescription">
          <Type
            v-if="data.type || data.subject?.type"
            data-test="type"
          >
            {{ data.type || data.subject!.type }}
          </Type>
          <Name>
            <Stattrack
              v-if="
                (('stattrack' in data && data.stattrack) ||
                  data.subject?.stattrack) &&
                stVisible &&
                data.name
              "
              data-test="stattrack"
            />
            {{ data.name }}
          </Name>
        </NameBlock>
        <div
          v-if="showPrice"
          :class="$style['wear-price']"
        >
          <Wear
            v-if="'wear' in data && data.wear"
            :wear="data.wear"
          />
          <Price data-test="price">{{ toLocalNumber(data.price) }} </Price>
        </div>
      </div>
    </div>
    <div
      v-else-if="type === SkinEnum.BULLCOIN"
      :class="[$style['skin-bullcoin']]"
    >
      ฿ {{ data.price ? toLocalNumber(data.price) : "" }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BullpassSubject } from "~/types";
import type { Size } from "./types";
import toLocalNumber from "~/utils/toLocalNumber";
import type { Skin } from "~/types";
import { SkinEnum } from "~/types";
import Bar from "~/components/Skins/Bar.vue";
import Image from "~/components/Skins/Image.vue";
import NameBlock from "~/components/Skins/NameBlock.vue";
import Type from "~/components/Skins/Type.vue";
import Name from "~/components/Skins/Name.vue";
import Stattrack from "~/components/Skins/Stattrack.vue";
import Price from "~/components/Skins/Price.vue";
import Wear from "~/components/Skins/Wear.vue";
import type { PlatformName } from "~/types";

type Props = {
  data: Skin & { alt?: string } & { subject?: BullpassSubject };
  showStattrack?: boolean;
  showPrice?: boolean;
  showDescription?: boolean;
  showImage?: boolean;
  showBar?: boolean;
  type?: SkinEnum;
  hoverable?: boolean;
  dataRole?: string;
  size?: Size;
  manualPlatform?: PlatformName;
};

const props = withDefaults(defineProps<Props>(), {
  showStattrack: true,
  showPrice: true,
  showDescription: true,
  showImage: true,
  showBar: true,
  type: SkinEnum.DEFAULT,
  dataRole: "",
  hoverable: false,
  size: "regular",
});

const { getItemQualityClass } = useItemQualityUtils(props.manualPlatform);

const {
  data,
  showStattrack,
  showPrice,
  showImage,
  showBar,
  type,
  dataRole,
  size,
} = toRefs(props);

const qualityClass = computed(() => {
  return type.value === SkinEnum.BULLCOIN
    ? "red"
    : getItemQualityClass(data.value?.qualityColor);
});

const stVisible = computed(
  () =>
    (showStattrack.value &&
      "stattrack" in data.value &&
      data.value.stattrack) ||
    (showStattrack.value &&
      "subject" in data.value &&
      data.value.subject &&
      "stattrack" in data.value.subject &&
      data.value.subject.stattrack),
);
</script>

<style lang="scss" module>
.skin {
  position: relative;
  width: 100%;
  height: 144px;
  padding: 0 12px 12px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (max-width: 834px) {
    padding: 0 12px 10px;
    height: 108px;
  }

  @media screen and (max-width: 475px) {
    padding: 0 12px 6px;
    height: 74px;
  }

  &-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &.hoverable:hover &-bg {
    background: var(--general-transparent-light-10);
  }

  &-descr {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .wear-price {
      text-align: right;
      flex-shrink: 0;
    }

    &-main {
      z-index: 1;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: end;
      gap: 5px;
      @media screen and (min-width: 834px) {
        gap: 12px;
      }
    }
  }

  .roulette {
    opacity: 0;
  }
}

.table-skin {
  width: 62px;
  height: 36px;
  border-radius: 4px;
  flex-shrink: 0;
}

.skin-bullcoin {
  font-family: "PP-Pangram-Sans-BC-Rounded";
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 6px;
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: -0.24px;
}

.red-skin {
  background: var(--bdrop-ribbon-item-red);
}

.pink-skin {
  background: var(--bdrop-ribbon-item-pink);
}

.violet-skin {
  background: var(--bdrop-ribbon-item-violet);
}

.blue-skin {
  background: var(--bdrop-ribbon-item-blue);
}

.light-blue-skin {
  background: var(--bdrop-ribbon-item-light-blue);
}

.gold-skin {
  background: var(--bdrop-ribbon-item-gold);
}

.grey-skin {
  background: var(--bdrop-ribbon-item-grey);
}

.green-skin {
  background: var(--bdrop-ribbon-item-green);
}

.img {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  max-width: 75%;
  max-height: 55%;
  transform: translate(-50%, -65%);
}

.bar {
  position: absolute;
  left: 50%;
  top: 0;
  height: 4px;
  width: 40%;
  border-radius: 10px;
  transform: translateX(-50%);
}

.red-bar {
  background-color: var(--bdrop-red-prize);
  box-shadow: 0px 0px 20px var(--bdrop-red-prize);
}

.pink-bar {
  background-color: var(--bdrop-pink-prize);
  box-shadow: 0px 0px 20px var(--bdrop-pink-prize);
}

.violet-bar {
  background-color: var(--bdrop-violet-prize);
  box-shadow: 0px 0px 20px var(--bdrop-violet-prize);
}

.blue-bar {
  background-color: var(--bdrop-blue-prize);
  box-shadow: 0px 0px 20px var(--bdrop-blue-prize);
}

.light-blue-bar {
  background-color: var(--bdrop-light-blue-prize);
  box-shadow: 0px 0px 20px var(--bdrop-light-blue-prize);
}

.gold-bar {
  background-color: var(--bdrop-gold-prize);
  box-shadow: 0px 0px 20px var(--bdrop-gold-prize);
}

.green-bar {
  background-color: var(--bdrop-green-prize);
  box-shadow: 0px 0px 20px var(--bdrop-green-prize);
}

.grey-bar {
  background-color: var(--bdrop-grey-prize);
  box-shadow: 0px 0px 20px var(--bdrop-grey-prize);
}

.description {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-flow: row nowrap;
  width: 100%;
  padding: 16px;
  gap: 5px;
}

.inner-wrapper {
  max-width: 60%;
}

.full-width {
  max-width: 100%;
}

.type,
.name,
.price {
  line-height: 18px;
}

.name,
.price {
  font-size: 0.875rem;
  letter-spacing: -0.14px;
}

.type {
  font-size: 0.75rem;
  color: var(--general-transparent-light-35);
  letter-spacing: -0.12px;
}

.name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
}

.price {
  flex-shrink: 0;
  text-align: right;
  color: var(--bdrop-price);
}

.icon {
  margin-left: 3px;
}

.stattrack {
  margin-right: 5px;
}
</style>
