ч
<template>
  <div :class="['slide', $style.contracts_slide, $style[platform?.code!]]">
    <div :class="$style['banner-image']" />
    <Title>{{ t("home.banner.contracts") }}</Title>
    <Content>{{ t("home.banner.contracts_text") }}</Content>
    <Controller
      class="contract-controller"
      to="/games/contracts"
      >{{ t("home.banner.create_contract") }}</Controller
    >
  </div>
</template>

<script lang="ts" setup>
import Title from "~/components/Home/Intro/Banner/Title.vue";
import Content from "~/components/Home/Intro/Banner/Content.vue";
import Controller from "~/components/Home/Intro/Banner/Controller.vue";

const { t } = useI18n();
const platform = usePlatform();
</script>

<style lang="scss" module>
.contracts_slide {
  .banner-image {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background-size: contain;
    width: 100%;
    background-repeat: no-repeat;
    background-position: right bottom !important;
    @media screen and (max-width: 1100px) {
      background-size: cover;
    }
  }
  &.standoff,
  &.pubg,
  &.cs2 {
    background-image: radial-gradient(
      397.86% 822.1% at 81.19% 409.15%,
      #ff595f 29.36%,
      #181822 56.23%,
      #1d1d25 100%
    );

    .banner-image {
      background-image: url("/banners/contracts/large_standoff.webp");
      background-position:
        right center,
        right top !important;

      @media screen and (max-width: 900px) {
        background-position: 40% top !important;
      }
    }
    @media screen and (max-width: 800px) {
      &:after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.2);
        pointer-events: none;
      }
    }
  }
  &.genshin {
    background-image: radial-gradient(
      1073.11% 517.69% at 81.19% 409.15%,
      #9ad6fd 32.15%,
      #4168af 66.61%,
      #16306d 100%
    );

    .banner-image {
      background-image: url("/banners/contracts/large.webp");
      background-position:
        right center,
        right top !important;

      @media screen and (max-width: 900px) {
        background-position: 40% top !important;
      }
    }

    @media screen and (max-width: 800px) {
      &:after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.2);
        pointer-events: none;
      }
    }
  }
}
.contract-controller {
  @media screen and (min-width: 600px) {
    width: 340px;
  }
}
</style>
