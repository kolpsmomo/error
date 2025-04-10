<template>
  <div :class="['slide', $style.first_slide]">
    <Title>{{ t("home.banner.bullpass_summer") }}</Title>
    <Content>
      <span v-html="t('home.banner.bullpass_summer_text')"></span>
    </Content>
    <Controller to="/event">{{ t("home.banner.to_tasks") }}</Controller>
  </div>
</template>

<script lang="ts" setup>
import Title from "~/components/Home/Intro/Banner/Title.vue";
import Content from "~/components/Home/Intro/Banner/Content.vue";
import Controller from "~/components/Home/Intro/Banner/Controller.vue";

const { t } = useI18n();
</script>

<style lang="scss" module>
.first_slide {
  background-image: url("~/assets/banners/second/summer/home-intro-bg-big.png"),
    radial-gradient(
      308.18% 427.41% at 107.78% 341.79%,
      #00f0ff 0%,
      #283394 100%
    ),
    radial-gradient(193.47% 208.62% at 28.48% -59.91%, #258db9 0%, #003464 100%);
  background-size: contain;
  background-position: center !important;

  @media screen and (max-width: 834px) {
    background-image: url("~/assets/banners/second/summer/home-intro-bg-medium.png"),
      radial-gradient(
        213.61% 171.36% at 76.34% 54.73%,
        #010611 0%,
        #733ea8 100%
      );
    .text {
      max-width: 400px;
    }
  }
  @media screen and (max-width: 600px) {
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.15);
    }
  }
  @media screen and (max-width: 475px) {
    background-image: url("~/assets/banners/second/summer/home-intro-bg-small.png"),
      radial-gradient(
        213.61% 171.36% at 76.34% 54.73%,
        #010611 0%,
        #733ea8 100%
      );
    background-position-x: 0 !important;
    background-size: cover !important;
    .text {
      max-width: 260px;
    }
  }
}
</style>
