<template>
  <div :class="['slide', $style.contracts_slide, $style[platform?.code!]]">
    <div :class="$style['banner-image']" />
    <Title>{{ t("home.banner.upgrade") }}</Title>
    <Content>{{ t("home.banner.upgrade_text") }}</Content>
    <Controller to="/games/upgrade">{{
      t("home.banner.upgrade_play")
    }}</Controller>
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
  background-position:
    center center,
    right top !important;
  background: radial-gradient(
    70.46% 259.86% at 63.46% 127.54%,
    #6e7bd8 0%,
    #161c3b 100%
  );

  .banner-image {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background-image: url("/banners/upgrade/large.webp");
    background-size: contain;
    width: 100%;
    background-repeat: no-repeat;
    background-position: right bottom !important;

    @media screen and (max-width: 900px) {
      background-image: url("/banners/upgrade/medium.webp");
    }

    @media screen and (max-width: 475px) {
      background-image: url("/banners/upgrade/small.webp");
    }
  }
}
</style>
