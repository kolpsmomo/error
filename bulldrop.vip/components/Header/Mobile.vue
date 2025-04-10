<template>
  <div :class="$style.mobile">
    <slot />
  </div>
</template>

<style lang="scss" module>
.mobile {
  display: none;

  @media screen and (max-width: 1300px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
