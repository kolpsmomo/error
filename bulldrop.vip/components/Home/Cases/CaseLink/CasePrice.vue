<template>
  <div
    :class="$style['case__price']"
    data-role="case-price"
  >
    <slot />
  </div>
</template>

<style lang="scss" module>
.case__price {
  display: flex;
  height: 40px;
  padding: 0 1rem;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  gap: 0.25rem;
  border-radius: 0.875rem;
  background: var(--general-transparent-mid-35);
  font-size: 0.875rem;
  font-family: "PP-Pangram-Sans-BC-Rounded";
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: -0.14px;
  color: var(--general-white);
  transition: 0.25s;

  @media screen and (max-width: 425px) {
    padding: 0 10px;
    font-size: 0.75rem;
    line-height: 0.75rem;
    letter-spacing: -0.12px;
  }
}
</style>
