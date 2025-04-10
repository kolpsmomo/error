<template>
  <div
    :class="$style.pc"
    data-test="pc"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "Pc",
};
</script>

<style lang="scss" module>
.pc {
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1300px) {
    display: none;
  }
}
</style>
