<template>
  <div :class="$style['buttons-container']">
    <slot />
  </div>
</template>

<style lang="scss" module>
.buttons-container {
  position: absolute;
  right: 20px;
  top: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;

  @media screen and (max-width: 800px) {
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
    background: var(--general-transparent-mid-35);
    padding: 0.25rem;
    border-radius: 0.75rem;
    box-shadow: 2px 4px 10px 0 rgba(20, 22, 26, 0.3);
    backdrop-filter: blur(40px);
    z-index: 15;
    top: 100%;
    margin-top: 6px;
  }
}
</style>
