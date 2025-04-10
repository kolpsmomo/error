<template>
  <div :class="['slide', $style.exchanger_event_slide]">
    <div :class="$style['banner-image']" />
    <Title>{{ t(`${EVENT_KEY}.banner.title`) }}</Title>
    <Content>{{ t(`${EVENT_KEY}.banner.${platform.code}_content`) }}</Content>
    <Controller :to="`/${EVENT_NAME}`">{{
      t(`${EVENT_KEY}.banner.play`)
    }}</Controller>
  </div>
</template>

<script lang="ts" setup>
import { EVENT_KEY } from "~/stores/exchanger";
import { EVENT_NAME } from "~/stores/exchanger";
import Title from "~/components/Home/Intro/Banner/Title.vue";
import Content from "~/components/Home/Intro/Banner/Content.vue";
import Controller from "~/components/Home/Intro/Banner/Controller.vue";

const { t } = useI18n();
const platform = usePlatform();
</script>

<style lang="scss" module>
.exchanger_event_slide {
  background: radial-gradient(
    92.38% 1260.96% at -1.16% -3.05%,
    #fc7d89 0%,
    #9f3d50 27.6%,
    #312d3e 66.15%,
    #272432 100%
  );

  .banner-image {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background-image: url("/banners/elf-factory/large.webp");
    background-size: contain;
    width: 100%;
    background-repeat: no-repeat;
    background-position: right bottom !important;

    @media screen and (max-width: 930px) {
      background-image: url("/banners/elf-factory/medium.webp");
      background-size: cover;
    }
  }

  @media screen and (max-width: 734px) {
    .text {
      margin-top: 2rem;
    }
  }

  .title {
    font-size: 2rem;
    width: min-content;
  }

  .text {
    max-width: 80%;
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
</style>
