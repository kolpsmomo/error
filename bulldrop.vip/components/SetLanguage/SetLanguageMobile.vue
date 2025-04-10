<template>
  <div :class="$style['mobile-language']">
    <div
      :class="$style['toggle-language']"
      @click="coreStore.showLanguageSubmenuMobile"
    >
      <LocaleFlag />
      <span>{{ t(`languages.${locale}`) }}</span>
    </div>
  </div>
</template>

<script setup>
import LocaleFlag from "~/components/SetLanguage/LocaleFlag.vue";

const coreStore = useCoreStore();
defineEmits("hideMenuHeader");

const { locale, t } = useI18n();
</script>

<style lang="scss" module>
.mobile-language {
  .toggle-language {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 13px 0 13px 24px;
    font-size: 0.875rem;
    color: var(--general-white);
    font-weight: 500;
    background-color: transparent;
    border: none;
    outline: none;
    text-decoration: none;
    gap: 0.5rem;

    &:hover {
      background: var(--button-ghost-active);
    }
  }
}
</style>
