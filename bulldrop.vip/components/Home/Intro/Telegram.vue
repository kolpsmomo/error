<template>
  <div
    class="slide"
    :class="$style['second-slide']"
  >
    <div :class="$style['banner-image']" />
    <Title>{{ t("home.banner.telegram_bonuses") }}</Title>
    <Content>{{ t("home.banner.telegram_bonuses_text") }}</Content>
    <div :class="$style.few_banner_buttons">
      <div :class="$style.few_banner_buttons_wrapper">
        <ClientOnly>
          <Controller :to="platform.tg"
            >Telegram
            <IconTelegram />
          </Controller>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Title from "~/components/Home/Intro/Banner/Title.vue";
import Content from "~/components/Home/Intro/Banner/Content.vue";
import Controller from "~/components/Home/Intro/Banner/Controller.vue";

const platform = usePlatform();
const { t } = useI18n();
</script>

<style lang="scss" module>
.second-slide {
  display: flex;
  flex-direction: column;
  position: relative;
  background-size: contain;
  background-position: right !important;
  background-image: radial-gradient(
      132.97% 199.05% at 64.11% -38.41%,
      rgba(126, 124, 202, 0.1) 0%,
      rgba(125, 125, 202, 0) 100%
    ),
    radial-gradient(
      78.32% 102.59% at 68.77% 128.35%,
      rgba(255, 81, 121, 0.1) 0%,
      rgba(255, 128, 157, 0) 100%
    ),
    radial-gradient(
      91% 234.41% at 60.33% 290.85%,
      #ff5179 0%,
      rgba(255, 128, 157, 0) 100%
    );

  .banner-image {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background-image: url("/banners/third/large.webp");
    background-size: contain;
    width: 100%;
    background-repeat: no-repeat;
    background-position: right bottom !important;

    @media screen and (max-width: 1060px) {
      background-image: url("/banners/third/medium.webp");
      background-position: 60% center !important;
      background-size: cover;
    }

    @media screen and (max-width: 475px) {
      background-image: url("/banners/third/small.webp");
    }
  }

  .few_banner_buttons {
    position: absolute;
    bottom: 28px;

    .few_banner_buttons_wrapper {
      position: relative;
      display: flex;

      a {
        position: relative;
        width: 229px;
        bottom: 0;
        margin-right: 10px;
        margin-top: 35px;
        text-transform: capitalize;
        font-size: 20px;
        line-height: 40px;
      }

      svg {
        margin-left: 8px;
        width: 20px;
        min-width: 20px;
        fill: var(--general-white);
        height: unset;
      }
    }

    @media screen and (max-width: 600px) {
      width: 90%;
      bottom: 40px;
      .few_banner_buttons_wrapper {
        justify-content: space-between;

        a {
          width: 182px;
          font-size: 18px;
          line-height: 30px;
          margin-right: 0;
          transform: translateX(0%);
          left: 0;
        }
      }
    }
    @media screen and (max-width: 475px) {
      .few_banner_buttons_wrapper {
        a {
          width: 150px;
          font-size: 16px;
          line-height: 30px;
          margin-top: 70px;
        }
      }
    }
    @media screen and (max-width: 400px) {
      .few_banner_buttons_wrapper {
        a {
          margin-top: 25px;
          width: 125px;

          svg {
            width: 17px;
          }
        }
      }
    }
    @media screen and (max-width: 340px) {
      .few_banner_buttons_wrapper {
        a {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
