<template>
  <span :class="$style['loading-spinner-container']">
    <span :class="$style['loading-spinner']" />
  </span>
</template>

<style lang="scss" module>
.loading-spinner-container,
.loading-spinner {
  display: block;
}

.loading-spinner-container {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
}

.loading-spinner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid transparent;
  border-bottom: 2px solid transparent;
  animation: spin 0.5s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
