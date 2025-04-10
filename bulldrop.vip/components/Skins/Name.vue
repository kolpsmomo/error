<template>
  <div :class="$style.name">
    <slot />
  </div>
</template>

<style module lang="scss">
.name {
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  width: 100%;

  @media screen and (max-width: 834px) {
    font-size: 12px;
    line-height: 14px;
    letter-spacing: -0.12px;
  }

  @media screen and (max-width: 375px) {
    font-size: 10px;
    line-height: 12px;
    letter-spacing: -0.1px;
  }
}
</style>
