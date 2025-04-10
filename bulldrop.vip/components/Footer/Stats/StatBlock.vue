<template>
  <div :class="$style['stat-block']">
    <div :class="$style['stat-block-icon']">
      <slot name="icon" />
    </div>
    <div :class="$style['stat-block-info']">
      <div :class="$style['stat-block-value']">
        <slot name="value" />
      </div>
      <div :class="$style['stat-block-name']">
        <span><slot name="name" /></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.stat-block {
  flex: 0 0;
  display: flex;
  gap: 12px;

  @media screen and (max-width: 330px) {
    gap: 13px;
  }

  &-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: var(--bdrop-footer-counter-bg);
    border: 1px solid var(--general-stroke);
    border-radius: 10px;
    flex: 0 0 40px;

    svg {
      width: 20px;
      fill: var(--bdrop-footer-counter-icon-color);
    }
  }

  &-value {
    color: var(--general-white);
    font-size: 18px;
    line-height: 20px;
    letter-spacing: -0.01em;
    white-space: nowrap;
  }
  &-name {
    color: var(--general-grey);
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.01em;
    white-space: nowrap;
  }
  @media screen and (max-width: 360px) {
    &-name,
    &-value {
      white-space: normal;
    }
  }
}
</style>
