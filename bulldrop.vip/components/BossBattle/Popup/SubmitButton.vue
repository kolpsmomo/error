<template>
  <button :class="$style['reward-popup-submit-button']">
    <slot />
  </button>
</template>

<style lang="scss" module>
.reward-popup-submit-button {
  cursor: pointer;
  display: block;
  width: 100%;
  padding: 16px;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 500;
  color: var(--general-white);
  background: linear-gradient(
    135deg,
    #54e5e5 0%,
    #45a9e1 48%,
    #2c72ee 100%
  ) !important;

  &:hover {
    background: linear-gradient(
      135deg,
      #54e5e5 10%,
      #45a9e1 68%,
      #2c72ee 91%
    ) !important;
  }

  &:active {
    background: linear-gradient(
      135deg,
      #54e5e5 20%,
      #45a9e1 48%,
      #2c72ee 91%
    ) !important;
  }
}
</style>
