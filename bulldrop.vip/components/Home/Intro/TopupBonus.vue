<template>
  <div :class="['slide', $style['topup-bonus']]">
    <div :class="$style['topup-bonus__banner-image']" />
    <Title>{{ t("home.banner.topup_bonus") }}</Title>
    <Content :class="$style['topup-bonus__text']">{{
      t("home.banner.topup_bonus_text")
    }}</Content>
    <Controller
      :class="$style['topup-bonus__controller']"
      :to="`/balance/top-up`"
      >{{ t("home.banner.topup_now") }}</Controller
    >
  </div>
</template>

<script lang="ts" setup>
import Title from "~/components/Home/Intro/Banner/Title.vue";
import Content from "~/components/Home/Intro/Banner/Content.vue";
import Controller from "~/components/Home/Intro/Banner/Controller.vue";

const { t } = useI18n();
</script>

<style lang="scss" module>
.topup-bonus {
  background-image: radial-gradient(
    ellipse 78.06% 120.82% at 67.41% 88.06%,
    #ffe41a 0%,
    #f1823c 35%,
    #e5492e 69%,
    #731767 100%
  );

  &__banner-image {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background-size: contain;
    width: 100%;
    background-repeat: no-repeat;
    background-position: right bottom !important;
    background-image: url("/banners/topup/large.avif");
    background-position:
      right center,
      right top !important;

    @media screen and (max-width: 900px) {
      background-position: 40% bottom !important;
    }

    @media screen and (max-width: 560px) {
      background-image: url("/banners/topup/small.avif");
      background-position: 40% bottom !important;
      top: unset;
      bottom: -10%;
    }

    @media screen and (max-width: 375px) {
      bottom: 0;
    }
  }

  &__text {
    @media screen and (max-width: 800px) {
      display: none;
    }
  }

  &__controller {
    border-radius: 18px;
    background: var(--button-filled-default);
    color: var(--general-background);
    height: 72px;
    padding: 22px 60px;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.2px;

    &:hover {
      background: var(--button-filled-hover);
    }

    &:active {
      background: var(--button-filled-pressed);
    }

    @media screen and (max-width: 560px) {
      font-size: 16px;
      line-height: 16px;
      letter-spacing: -0.16px;
      height: 48px;
      padding: 16px 12px;
    }
  }
}
</style>
