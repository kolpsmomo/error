<template>
  <div :class="$style['reward-wrapper']">
    <slot />
  </div>
</template>

<style lang="scss" module>
.reward-wrapper {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media screen and (max-width: 475px) {
    grid-template-columns: 1fr;
  }
}
</style>
