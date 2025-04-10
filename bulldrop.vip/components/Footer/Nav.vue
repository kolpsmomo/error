<template>
  <nav :class="$style['footer-nav']">
    <div
      :class="$style['footer-nav-column']"
      data-test="footer-column"
    >
      <NavLink to="/contacts/">{{ t("footer.contacts") }}</NavLink>
      <a
        target="__blank"
        href="https://t.me/Bulldrop_partner_bot"
        >{{ t("footer.cooperation") }}</a
      >
      <NavLink
        to="/privacy-policy/"
        :class="$style['legal-link']"
      >
        {{ t("footer.privacy_policy") }}
      </NavLink>
      <NavLink
        to="/terms-and-conditions/"
        :class="$style['legal-link']"
      >
        {{ t("footer.user_agreement") }}
      </NavLink>
      <span
        :class="$style['footer-support']"
        @click="userStore.openSupport()"
        >{{ t("footer.support") }}</span
      >
    </div>
    <div :class="[$style['footer-nav-column'], $style['social-links']]">
      <ClientOnly>
        <a
          v-if="!coreStore.isUserIndia"
          target="__blank"
          :href="coreStore.vk"
        >
          {{ t("footer.vk") }}
        </a>
        <a
          v-if="!coreStore.isUserIndia"
          target="__blank"
          :href="platform.tg"
        >
          {{ t("footer.tg") }}
        </a>
        <a
          v-if="coreStore.isUserIndia"
          target="__blank"
          :href="platform.ALL_PLATFORMS_DATA.bgmi.insta"
        >
          {{ t("footer.insta") }}
        </a>
      </ClientOnly>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { t } = useI18n();
const userStore = useUserStore();
const coreStore = useCoreStore();
const platform = computed(() => usePlatform());
</script>

<style lang="scss" module>
.footer-nav {
  .footer-nav-column {
    display: flex;
    gap: 48px;
  }

  .legal-link,
  .social-links {
    display: none;
  }
  a {
    color: var(--general-grey);
    text-decoration: none;
  }

  a:hover,
  span:hover {
    color: var(--general-grey);
    filter: brightness(130%);
  }

  a:active,
  span:active {
    color: var(--general-grey);
    filter: brightness(300%);
  }

  @media screen and (max-width: 1360px) {
    display: flex;
    justify-content: space-between;

    .legal-link {
      display: inline;
    }
    .footer-nav-column {
      min-width: 140px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  }
}
.footer-support {
  cursor: pointer;
}
</style>
