<template>
  <div :class="$style['page-header']">
    <div :class="$style['inner-container']">
      <div
        :class="$style['left-side']"
        data-test="left-right-side"
      >
        <slot name="left-side" />
      </div>
      <div
        :class="$style['center-side']"
        data-test="center-right-side"
      >
        <slot name="center-side" />
      </div>
      <div
        :class="$style['right-side']"
        data-test="header-right-side"
      >
        <slot name="right-side" />
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" module>
.page-header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  background-color: var(--general-transparent-dark-100);
  padding: 0;
  border-bottom: 0.6px solid var(--general-stroke);

  @media screen and (max-width: 1300px) {
    position: relative !important;
  }
  @include safe-area-header("true");
}

.inner-container {
  display: flex;
  justify-content: space-between;
  padding-left: 80px;
  padding-right: 60px;
  align-items: center;
  height: 68px;
  margin: auto;

  @media screen and (max-width: 1300px) {
    padding: 0 25px;
  }

  @media screen and (max-width: 475px) {
    padding: 0 16px;
  }
}

.left-side,
.right-side {
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-side {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.right-side {
  position: relative;
  min-width: 40px;
}
</style>
