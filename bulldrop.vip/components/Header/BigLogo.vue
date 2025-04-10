<template>
  <NavLink
    :to="'/'"
    :class="$style['big-logo-link']"
    :consider-platform="false"
  >
    <IconBigLogo />
  </NavLink>
</template>

<script setup lang="ts"></script>

<style lang="scss" module>
.big-logo-link {
  margin-right: 16px;
  svg {
    fill: var(--bdrop-logo);
  }
}
</style>
