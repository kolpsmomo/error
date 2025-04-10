<template>
  <div :class="$style.separator"></div>
</template>

<style lang="scss" module>
.separator {
  height: 0.6px;
  margin-left: -0.25rem;
  border-bottom: 0.6px solid var(--general-stroke);
  width: calc(100% + 0.5rem);
}
</style>
