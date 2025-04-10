<template>
  <div :class="$style['case-links-container']">
    <slot />
  </div>
</template>

<style lang="scss" module>
.case-links-container {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(324px, 1fr));

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(auto-fill, minmax(192px, 1fr));
    gap: 12px;
  }

  @media screen and (max-width: 425px) {
    gap: 6px;
    grid-template-columns: repeat(auto-fill, minmax(142px, 1fr));
  }
}
</style>
