<template>
  <div :class="$style['desktop-language']">
    <div
      v-if="coreStore.languageSubmenuIsRequired"
      :class="$style['desktop-language-menu']"
      @click="coreStore.hideLanguageSubmenu"
    >
      <Locales />
    </div>
    <div
      :class="[
        $style['toggle-language'],
        coreStore.languageSubmenuIsRequired &&
          $style['toggle-language--active'],
      ]"
      @click="coreStore.toggleLanguageSubmenu"
    >
      <LocaleFlag />
      <IconChevronDown :class="$style['language-dd']" />
    </div>
  </div>
</template>

<script setup>
import Locales from "./Locales.vue";
import LocaleFlag from "~/components/SetLanguage/LocaleFlag.vue";

const coreStore = useCoreStore();
</script>

<style lang="scss" module>
.desktop-language {
  position: relative;

  &-menu {
    padding: 0.5rem;
    border-radius: 18px;
    background-color: var(--general-underlay-3-lvl);
    width: 216px;
    position: absolute;
    right: 0;
    top: 52px;
    gap: 2px;
    display: flex;
    flex-direction: column;
  }

  .toggle-language {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    margin-right: 1.5rem;
  }

  .toggle-language--active .language-dd {
    transform: rotate(180deg);
  }

  .language-dd {
    fill: var(--general-grey);
    width: 1rem;
    height: 1rem;
    transition: all 0.15s ease-in;
  }
}
</style>

<style lang="scss">
.fi {
  height: 28px;
  width: 24px;
}
</style>
