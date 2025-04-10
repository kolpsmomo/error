<template>
  <NavLink
    :to="`/case/open/?id=${props.itemData.caseId}`"
    :class="[
      $style[`${qualityClass}-item`],
      props.top ? $style['top-item'] : '',
      $style.item,
    ]"
  >
    <Bar :quality-class="qualityClass" />
    <NicknameBlock
      :class="$style.nicknameBlock"
      :style="{ opacity: props.top ? 0 : 1 }"
    >
      <Avatar
        :class="$style.avatar"
        :src="props.itemData.avatarImg"
      />{{ nickname }}
    </NicknameBlock>
    <TopItemPrice
      v-if="props.top"
      :class="$style.topItemPrice"
      >{{ price }}</TopItemPrice
    >
    <TimeCircle
      v-if="props.top && props.value"
      :class="$style.timeCircle"
      :value="props.value"
    />
    <Image
      :class="$style.itemNameBlock"
      :src="props.itemData.itemImg"
    />
    <NameBlock :class="$style.itemNameBlock">
      <Type>{{ itemType }}</Type>
      <Name>
        <Stattrack v-if="props.itemData.stattrack" />
        {{ itemName }}
      </Name>
    </NameBlock>
    <NameBlock :class="$style.caseNameBlock">
      <Type>
        {{ t("ribbon.item.case_name_label") }}
      </Type>
      <Name>
        {{ props.itemData.caseName }}
      </Name>
    </NameBlock>
    <CaseImage
      :class="$style.caseImage"
      :src="props.itemData.caseImg"
    />
  </NavLink>
</template>

<script lang="ts" setup>
import type { RibbonItem } from "./types";
import NavLink from "~/components/NavLink.vue";
import NicknameBlock from "./Item/NicknameBlock.vue";
import Avatar from "./Item/Avatar.vue";
import CaseImage from "./Item/CaseImage.vue";
import TopItemPrice from "./Item/TopItemPrice.vue";
import TimeCircle from "./Item/TimeCircle.vue";
import Bar from "~/components/Skins/Bar.vue";
import Image from "~/components/Skins/Image.vue";
import NameBlock from "~/components/Skins/NameBlock.vue";
import Type from "~/components/Skins/Type.vue";
import Name from "~/components/Skins/Name.vue";
import Stattrack from "~/components/Skins/Stattrack.vue";

const { getItemQualityClass } = useItemQualityUtils();
const props = withDefaults(
  defineProps<{
    // данные предмета
    itemData: RibbonItem;
    // индикатор того, что данный предмет является лучшим
    top?: boolean;
    // ценность данного предмета в ленте от 0 до 1
    value?: number;
  }>(),
  {
    top: false,
    value: 0,
  },
);

const { t } = useI18n();
const qualityClass = computed(() =>
  getItemQualityClass(props.itemData.qualityColor),
);
const itemName = computed(() =>
  truncateString(props.itemData.itemName || "", 15),
);
const itemType = computed(() =>
  truncateString(props.itemData.itemType || "", 15),
);
const nickname = computed(() => truncateString(props.itemData.nickname, 15));
const price = computed(() => toLocalNumber(props.itemData.price));
</script>

<style lang="scss" module>
.item {
  cursor: pointer;
  position: relative;
  color: var(--general-white);
  font-size: 0.875rem;
  font-weight: 500;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 12px 12px;

  .caseNameBlock {
    position: absolute;
    left: 12px;
    bottom: 12px;
    z-index: 1;
    color: var(--general-white);
    opacity: 0;
    transition: 0.25s;

    @media screen and (max-width: 834px) {
      left: 10px;
      bottom: 10px;
    }
    @media screen and (max-width: 475px) {
      left: 8px;
      bottom: 8px;
    }
  }

  &:hover {
    .itemImage,
    .itemNameBlock,
    .topItemPrice,
    .timeCircle {
      opacity: 0 !important;
      transition: 0.25s;
    }

    .caseImage,
    .caseNameBlock,
    .nicknameBlock {
      opacity: 1 !important;
    }

    .nicknameBlock {
      color: var(--general-white) !important;
    }

    .avatar {
      display: block;
    }
  }
}

.top-item {
  width: 210px;
}

.red-item {
  background: var(--bdrop-ribbon-item-red);
}

.pink-item {
  background: var(--bdrop-ribbon-item-pink);
}

.violet-item {
  background: var(--bdrop-ribbon-item-violet);
}

.blue-item {
  background: var(--bdrop-ribbon-item-blue);
}

.light-blue-item {
  background: var(--bdrop-ribbon-item-light-blue);
}

.gold-item {
  background: var(--bdrop-ribbon-item-gold);
}

.grey-item {
  background: var(--bdrop-ribbon-item-grey);
}

.green-item {
  background: var(--bdrop-ribbon-item-green);
}
</style>
