<template>
  <button
    :class="$style['login-button']"
    data-test="login-button"
    @click="handleClick"
  >
    {{ $t("auth.login") }}
  </button>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const coreStore = useCoreStore();

const handleClick = () => {
  if (coreStore.headerMenuIsRequired) {
    coreStore.hideMenuHeader();
  }
  userStore.showAuth("login");
};
</script>

<style lang="scss" module>
.login-button {
  cursor: pointer;
  height: 48px;
  padding: 10px 20px;
  border-radius: $br10;
  background-color: var(--button-accident-default);
  border: none;
  outline: none !important;
  font-size: 1rem;
  font-weight: 500;
  color: var(--button-accident-content);
  letter-spacing: -1%;
  transition: 0.25s;

  &:hover {
    background-color: var(--button-accident-hover);
  }

  @media screen and (max-width: 1100px) {
    margin: 0;
  }

  svg {
    width: 8px;
    margin-left: 5px;
    fill: $white-3;
  }
}
</style>
