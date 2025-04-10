<template>
  <div :class="$style.ribbon">
    <slot name="top-item" />
    <div :class="$style['ribbon-inner-wrapper']">
      <div
        :class="$style['ribbon-inner-container']"
        data-role="ribbon-inner-container"
      >
        <div
          :class="$style['ribbon-bunch-container']"
          data-role="ribbon-bunch-container"
        >
          <slot name="bunch" />
        </div>
        <div :class="$style['ribbon-items-container']">
          <slot name="items" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.ribbon,
.ribbon-inner-container {
  position: relative;
}

.ribbon {
  display: flex;

  &::after {
    content: "";
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    width: 15%;
    background-image: var(--general-fade-horizontal);
  }
}

.ribbon-inner-wrapper {
  overflow: hidden;
}

.ribbon-bunch-container,
.ribbon-items-container {
  display: flex;
}

.ribbon-bunch-container {
  position: absolute;
  left: 0;
  top: 0;
  height: 120px;
  transform: translateX(-100%);
}

.ribbon-items-container {
  width: 99999px;
}

.hidden {
  display: none;
}
</style>
