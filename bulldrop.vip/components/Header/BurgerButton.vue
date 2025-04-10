<template>
  <button
    :class="[
      $style['burger-button'],
      coreStore.headerMenuIsRequired ? $style.active : '',
    ]"
    data-test="menu_button_desktop"
  >
    <IconBars />
  </button>
</template>

<script setup lang="ts">
const coreStore = useCoreStore();
</script>

<style lang="scss" module>
.burger-button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;

  @media screen and (max-width: 1300px) {
    margin-left: 0;
  }

  svg {
    width: 100%;
    fill: var(--general-white);
    transform: 0.25;
  }
}
.active {
  transform: rotate(180deg);
}
</style>
