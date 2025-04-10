<template>
  <Container
    :class="$style['general-exchanger-modal']"
    @hide-form="store.showRewardPopup = false"
  >
    <div :class="$style['ellipse']"></div>
    <BaseForm
      :class="$style['general-exchanger-modal-form']"
      @hide-form="store.showRewardPopup = false"
    >
      <template #header>
        <BaseTitle
          >{{ title || t(`${EVENT_KEY}.prize_modal.title`) }}
        </BaseTitle>
      </template>
      <div :class="$style['general-exchanger-modal-info']">
        <IconInfo />
        <div>
          {{ description || t(`${EVENT_KEY}.prize_modal.info`) }}
        </div>
      </div>
      <Skin
        v-if="rewards[0]?.subject"
        :data="rewards[0]?.subject"
        :class="$style['skin-wrapper']"
      />
      <SubmitButton
        :class="$style['general-exchanger-modal-button']"
        @click="store.showRewardPopup = false"
      >
        <span>{{ t(`${EVENT_KEY}.prize_modal.button`) }}</span>
      </SubmitButton>
    </BaseForm>
  </Container>
</template>

<script setup lang="ts">
// @ts-nocheck
import Container from "~/components/Form/Container.vue";
import Skin from "~/components/Skins/Skin.vue";
import SubmitButton from "~/components/Form/SubmitButton.vue";
import type { RewardPopupData } from "./types/RewardPopupData";
import BaseForm from "~/components/Form/Form.vue";
import BaseTitle from "~/components/Form/Title.vue";
import { EVENT_KEY } from "~/stores/exchanger";

const store = useExchangerEventStore();
const title: string = store.rewardPopupData!.title;
const description: string = store.rewardPopupData!.description;
const rewards: RewardPopupData["rewards"] = store.rewardPopupData!.rewards;
const { t } = useI18n();
</script>

<style lang="scss" module>
.general-exchanger-modal {
  background-color: #1a1b1d;
  overflow: hidden;

  &-form {
    width: 436px;
  }

  &-info {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    flex-direction: row;
    background: var(--button-tonal-default);
    border-radius: 10px;
    color: var(--general-white);
    gap: 12px;
    line-height: 20px;
    margin-bottom: 24px;

    svg {
      flex: 0 0 20px;
      fill: var(--general-white);
    }
  }

  .skin-wrapper {
    aspect-ratio: 120 / 55;
    height: auto;
  }

  &-image {
    width: 100%;
  }

  &-prise {
    text-align: center;
    color: $yellow;
  }

  &-button {
    font-size: 14px;
    line-height: 16px;
  }

  .ellipse {
    width: 1416px;
    height: 540px;
    position: absolute;
    margin: auto 0;
    border-radius: 1416px;
    background: rgba(255, 255, 255, 0.3);
    mix-blend-mode: overlay;
    filter: blur(160px);
  }
}
</style>
