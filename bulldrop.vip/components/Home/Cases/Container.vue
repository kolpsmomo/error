<template>
  <div
    :class="$style.cases"
    data-test="cases-all"
  >
    <slot />
  </div>
</template>

<style lang="scss" module>
.cases {
  position: relative;
  max-width: $page-content-max-width;
  margin: auto;
  padding: 15px;
  padding-top: 0;
}
</style>
