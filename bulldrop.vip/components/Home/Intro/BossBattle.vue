<template>
  <div :class="['slide', $style['boss-battle-slide']]">
    <Title>{{ t(`${BATTLE_KEY}.banner.title`) }}</Title>
    <Content>{{ t(`${BATTLE_KEY}.banner.content`) }}</Content>
    <Controller to="/boss-battle"
      >{{ t(`${BATTLE_KEY}.banner.attack`) }}
    </Controller>
  </div>
</template>

<script lang="ts" setup>
import Title from "~/components/Home/Intro/Banner/Title.vue";
import Content from "~/components/Home/Intro/Banner/Content.vue";
import Controller from "~/components/Home/Intro/Banner/Controller.vue";
import { BATTLE_KEY } from "~/components/BossBattle/composables/initMainView";

const { t } = useI18n();
</script>

<style lang="scss" module>
.boss-battle-slide {
  background-size: contain !important;
  background-position: right top !important;

  background-image: url("@/assets/banners/boss-battle/large.png"),
    radial-gradient(193.47% 208.62% at 28.48% -59.91%, #259eb9 0%, #031633 100%),
    radial-gradient(
      65.64% 260.69% at 70.89% 64.02%,
      #965ad1 0%,
      rgba(22, 11, 63, 0) 51.76%
    ),
    radial-gradient(
      45.65% 176.39% at 71.21% 148.32%,
      #5381d9 0%,
      rgba(22, 11, 63, 0) 100%
    ),
    radial-gradient(69.39% 168.01% at 52.96% 0%, #353883 0%, #1a0c22 100%);

  @media screen and (max-width: 930px) {
    background-image: url("@/assets/banners/boss-battle/medium.png"),
      radial-gradient(
        193.47% 208.62% at 28.48% -59.91%,
        #259eb9 0%,
        #031633 100%
      ),
      radial-gradient(
        65.64% 260.69% at 70.89% 64.02%,
        #965ad1 0%,
        rgba(22, 11, 63, 0) 51.76%
      ),
      radial-gradient(
        45.65% 176.39% at 71.21% 148.32%,
        #5381d9 0%,
        rgba(22, 11, 63, 0) 100%
      ),
      radial-gradient(69.39% 168.01% at 52.96% 0%, #353883 0%, #1a0c22 100%);
  }

  @media screen and (max-width: 734px) {
    background-image: url("@/assets/banners/boss-battle/small.png"),
      radial-gradient(
        193.47% 208.62% at 28.48% -59.91%,
        #259eb9 0%,
        #031633 100%
      ),
      radial-gradient(
        65.64% 260.69% at 70.89% 64.02%,
        #965ad1 0%,
        rgba(22, 11, 63, 0) 51.76%
      ),
      radial-gradient(
        45.65% 176.39% at 71.21% 148.32%,
        #5381d9 0%,
        rgba(22, 11, 63, 0) 100%
      ),
      radial-gradient(69.39% 168.01% at 52.96% 0%, #353883 0%, #1a0c22 100%);

    .text {
      margin-top: 2rem;
    }
  }

  @media screen and (max-width: 600px) {
    .text {
      width: 85%;
      max-width: 400px;
    }
  }

  @media screen and (max-width: 375px) {
    background-image: url("@/assets/banners/boss-battle/extra_small.png"),
      radial-gradient(
        193.47% 208.62% at 28.48% -59.91%,
        #259eb9 0%,
        #031633 100%
      ),
      radial-gradient(
        65.64% 260.69% at 70.89% 64.02%,
        #965ad1 0%,
        rgba(22, 11, 63, 0) 51.76%
      ),
      radial-gradient(
        45.65% 176.39% at 71.21% 148.32%,
        #5381d9 0%,
        rgba(22, 11, 63, 0) 100%
      ),
      radial-gradient(69.39% 168.01% at 52.96% 0%, #353883 0%, #1a0c22 100%);

    .text {
      max-width: 80%;
    }
  }
}
</style>
