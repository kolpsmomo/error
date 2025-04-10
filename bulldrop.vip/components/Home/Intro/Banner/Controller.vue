<template>
  <a
    v-if="isExternal"
    :href="to"
    target="_blank"
    :class="$style.controller"
  >
    <slot />
  </a>
  <NavLink
    v-else
    :to="normalize(`/${to}`)"
    :class="$style.controller"
  >
    <slot></slot>
  </NavLink>
</template>

<script lang="ts" setup>
import { normalize } from "~/utils/url/normalize";

const props = defineProps<{
  to?: string;
}>();

const { to } = toRefs(props);
const isExternal = computed<boolean>(() => !!to.value?.startsWith("http"));
</script>

<style lang="scss" module>
.controller {
  position: absolute;
  bottom: 28px;
  margin-top: 64px;
  display: flex;
  justify-content: center;
  width: 380px;
  height: 68px;
  flex-shrink: 0;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 15px 60px;
  border-radius: 16px;
  color: var(--general-white);
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  background-color: var(--button-tonal-default);
  transition: all 0.25s linear;
  backdrop-filter: blur(20px);
  white-space: nowrap;
  backdrop-filter: blur(20px);

  &:hover {
    background-color: var(--button-tonal-hover);
  }

  &:active {
    background-color: var(--button-tonal-active);
    color: var(--general-background);
  }

  @media screen and (max-width: 834px) {
    padding: 15px 30px;
    border-radius: $br10;
  }

  @media screen and (max-width: 600px) {
    left: 50%;
    bottom: 38px;
    transform: translateX(-50%);
    width: 90%;
    height: 48px;
    margin-top: 32px;
    font-size: 1.125rem;
    z-index: 1;
    padding: 10.5px 30px;
  }

  @media screen and (max-width: 345px) {
    margin-top: 20px;
  }
}
</style>
