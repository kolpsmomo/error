<template>
  <div :class="$style.overlay">
    <slot />
  </div>
</template>

<style module lang="scss">
.overlay {
  background: var(--general-transparent-dark-75);
  position: fixed;
  @include square(100%);
  top: 0;
  left: 0;
}
</style>
