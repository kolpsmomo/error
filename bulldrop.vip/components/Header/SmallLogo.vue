<template>
  <NavLink
    :to="'/'"
    :class="$style['small-logo-link']"
    :consider-platform="false"
  >
    <IconSmallLogo />
  </NavLink>
</template>

<script setup lang="ts"></script>

<style lang="scss" module>
.small-logo-link {
  margin-right: 20px;
  svg {
    width: 33px;
  }
}
</style>
