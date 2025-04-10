<template>
  <button
    v-for="loc in localeWithFlags"
    :key="loc.code"
    :class="[
      locale === loc.code && $style.active,
      $style['localization-button'],
    ]"
    @click="handleClick(loc.code)"
  >
    <span :class="['fi', `fi-${loc.flag}`]"></span>
    <span>{{ t(`languages.${loc.code}`) }}</span>
  </button>
</template>

<script setup lang="ts">
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { locales } from "~/locales";

const { locale, setLocale, t } = useI18n();
const coreStore = useCoreStore();

const handleClick = (value: string) => {
  setLocale(value);
  coreStore.hideLanguageSubmenu();
};

const localeWithFlags = computed(() =>
  locales.map((loc) => {
    let flag = loc.code;
    if (loc.code === "en") {
      flag = "us";
    }

    return {
      ...loc,
      flag,
    };
  }),
);
</script>

<style lang="scss" module>
.localization-button {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  color: var(--general-white);
  padding: 14px;
  background-color: transparent;
  border: none;
  outline: none;
  text-decoration: none;
  gap: 8px;
  transition: 0.25s;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: -0.16px;

  @media screen and (max-width: 1300px) {
    padding: 10px 14px;
  }
  &.active,
  &:hover {
    background: var(--general-transparent-mid-35);
    align-items: center;
    border-radius: 14px;
  }

  svg {
    transition: 0.25s;
  }
}
</style>
