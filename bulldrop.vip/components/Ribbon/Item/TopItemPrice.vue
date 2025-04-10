<template>
  <div :class="$style['top-item-price']">
    <IconCrown2 :class="$style.crown" />
    ฿ <slot />
  </div>
</template>

<style lang="scss" module>
.top-item-price {
  font-family: "PP-Pangram-Sans-BC-Rounded";
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  gap: 6px;
  border-radius: 12px;
  color: $yellow;
  border: 1px solid $yellow;
  transition: 0.25s;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: -0.1px;
}

.crown {
  fill: $yellow;
}

.crown {
  width: 14px;
  height: 14px;
}
</style>
