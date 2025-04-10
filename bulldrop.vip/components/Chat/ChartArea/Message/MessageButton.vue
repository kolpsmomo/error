<template>
  <button :class="$style['message-button']">
    <slot />
  </button>
</template>

<style lang="scss" module>
.message-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    svg {
      fill: var(--general-white);
    }
  }

  svg {
    width: 16px;
    height: 16px;
    fill: var(--general-dark-grey);
  }

  div {
    display: none;
  }

  @media screen and (max-width: 800px) {
    position: relative;
    width: 168px;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;

    &:not(:last-child):before {
      content: "";
      position: absolute;
      left: 8px;
      bottom: 0;
      height: 1px;
      width: calc(100% - 16px);
      border-bottom: 0.6px solid var(--general-stroke);
    }

    div {
      display: block;
      color: var(--general-white);
      font-weight: 500;
      font-size: 0.75rem;
      line-height: 1rem;
    }

    svg {
      fill: var(--general-white);
    }

    &:hover {
      svg {
        fill: var(--general-white);
      }
    }
  }
}
</style>
