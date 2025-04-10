<template>
  <div :class="$style.price">฿ <slot /></div>
</template>

<style lang="scss" module>
.price {
  font-family: "PP-Pangram-Sans-BC-Rounded";
  color: var(--general-bullcoin);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.14px;

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
