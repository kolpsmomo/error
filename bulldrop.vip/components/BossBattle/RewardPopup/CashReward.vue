<template>
  <div :class="$style['cash-reward']">
    <slot /><IconBullcoin style="margin-left: 5px" />
  </div>
</template>

<style lang="scss" module>
.cash-reward {
  margin: 15px auto;
  font-size: 1.5rem;
  color: var(--bdrop-balance-color);
  text-align: center;
}
</style>
