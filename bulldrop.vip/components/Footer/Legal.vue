<template>
  <nav :class="$style['footer-legal']">
    <div :class="$style['footer-legal-copyright']">
      {{ domain }}
      <span :class="$style.text">
        &copy; 2025 {{ t("footer.all_rights_reserved") }}
      </span>
    </div>
    <NavLink
      :to="privacyPolicy"
      :class="$style['footer-legal-link']"
    >
      {{ t("footer.privacy_policy") }}
    </NavLink>
    <NavLink
      :to="termsAndConditions"
      :class="$style['footer-legal-link']"
    >
      {{ t("footer.user_agreement") }}
    </NavLink>
  </nav>
</template>

<script setup lang="ts">
import { normalize } from "~/utils/url/normalize";

const { t } = useI18n();
const privacyPolicy = computed(() => normalize(`/privacy-policy/`));
const termsAndConditions = computed(() => normalize(`/terms-and-conditions/`));
const domain = useRequestURL().hostname.toUpperCase();
</script>

<style lang="scss" module>
.footer-legal {
  color: var(--general-grey);
  display: flex;
  gap: 48px;

  &-link {
    color: var(--general-grey);
    text-decoration: none;

    &:hover {
      color: var(--general-grey);
      filter: brightness(130%);
    }

    &:active {
      color: var(--general-grey);
      filter: brightness(300%);
    }
  }

  @media screen and (max-width: 1360px) {
    justify-content: space-between;

    &-link {
      display: none;
    }
  }

  @media screen and (max-width: 395px) {
    &-copyright {
      text-align: center;
    }
  }
}

@media screen and (max-width: 395px) {
  .text {
    display: block;
  }
}
</style>
