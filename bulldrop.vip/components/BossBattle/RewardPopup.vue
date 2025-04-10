<template>
  <Container
    :class="$style.container"
    @hide-form="store.showRewardPopup = false"
  >
    <Form
      style="width: 575px"
      @hide-form="store.showRewardPopup = false"
    >
      <template #header>
        <PopupTitle>{{ t(`${BATTLE_KEY}.rules.title`) }}</PopupTitle>
      </template>
      <MainMessage>{{ description }}</MainMessage>
      <RewardWrapper v-if="rewards && rewards.length > 1">
        <template
          v-for="(reward, index) in rewards"
          :key="index"
        >
          <Gold
            v-if="reward.bullcoins"
            :amount="getAmountDesc(reward.bullcoins)"
            :class="$style['reward-popup-gold']"
          />
          <Skin
            v-if="reward.subject"
            :data="reward.subject"
            :class="$style['reward-popup-skin']"
          />
        </template>
      </RewardWrapper>
      <template v-else>
        <Gold :amount="getAmountDesc(rewards[0].bullcoins!)" />
      </template>
      <CashReward>{{ toLocalNumber(bullcoinsTotalAmount) }}</CashReward>
      <SubmitButton @click="store.showRewardPopup = false">{{
        t(`${BATTLE_KEY}.reward_popup.submit`)
      }}</SubmitButton>
    </Form>
  </Container>
</template>

<script setup lang="ts">
// @ts-nocheck
import Container from "~/components/Form/Container.vue";
import Form from "~/components/Form/Form.vue";
import RewardWrapper from "./RewardPopup/RewardWrapper.vue";
import PopupTitle from "./Popup/PopupTitle.vue";
import MainMessage from "./Popup/MainMessage.vue";
import SubmitButton from "./Popup/SubmitButton.vue";
import Gold from "./RewardPopup/Gold.vue";
import CashReward from "./RewardPopup/CashReward.vue";
import Skin from "~/components/Skins/Skin.vue";
import { BATTLE_KEY } from "~/components/BossBattle/composables/initMainView";

const store = useExchangerEventStore();
const description = store.rewardPopupData?.description;
const rewards = store.rewardPopupData?.rewards;
const { t } = useI18n();

const bullcoinsTotalAmount = computed<number>(() => {
  let amount = 0;
  if (rewards) {
    for (let i = 0; i < rewards.length; i++) {
      amount += rewards[i].bullcoins || 0;
    }
  }
  return amount;
});

function getAmountDesc(bullcoins: number) {
  if (bullcoins <= 100) {
    return "few";
  } else if (bullcoins > 100 && bullcoins <= 1000) {
    return "average";
  } else {
    return "lot";
  }
}
</script>

<style lang="scss" module>
.container {
  @media screen and (max-width: 500px) {
    height: 100%;
  }
}

.reward-popup-gold {
  height: auto;
}
.reward-popup-skin {
  aspect-ratio: unset;
  height: auto;

  img {
    max-width: 80% !important;
  }
  @media screen and (max-width: 475px) {
    aspect-ratio: 120 / 55;
    img {
      max-width: 65% !important;
    }
  }
}
</style>
