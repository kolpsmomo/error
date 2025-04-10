<template>
  <div :class="$style['critical-error']">
    <slot />
  </div>
</template>

<style lang="scss" module>
.critical-error {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 75%;
  padding: 15px;
  font-size: 0.875rem;
  color: var(--general-white);
  text-align: center;
  transform: translate(-50%, -50%);
}
</style>
