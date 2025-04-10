<template>
  <div :class="$style['skeleton-base-block']" />
</template>

<style lang="scss" module>
@keyframes skeleton-base-block-loading {
  0% {
    transform: translate(-100%, -100%) rotate(45deg);
  }
  100% {
    transform: translate(100%, 100%) rotate(45deg);
  }
}

.skeleton-base-block {
  position: relative;
  background-color: rgba(255, 255, 255, 0.02);
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-100%, -100%) rotate(45deg);
    width: 100%;
    aspect-ratio: 1 / 3;
    background: linear-gradient(
      96deg,
      rgba(255, 255, 255, 0.01) 0%,
      rgba(255, 255, 255, 0.02) 37.12%,
      rgba(255, 255, 255, 0.01) 100%
    );
    filter: blur(35px);
    animation: skeleton-base-block-loading 3s 2s infinite;
  }
}
</style>
