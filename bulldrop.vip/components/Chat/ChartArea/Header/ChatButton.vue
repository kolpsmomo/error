<template>
  <button :class="[$style['chat-button'], active && $style.active]">
    <slot />
  </button>
</template>

<script setup lang="ts">
type Props = {
  active?: boolean;
};

const props = defineProps<Props>();
const { active } = toRefs(props);
</script>

<style lang="scss" module>
.chat-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
  border: none;
  outline: none;
  background-color: var(--button-filled-disabled);
  color: var(--bdrop-chat-color2);
  transition: 0.25s;
}

.active {
  background-color: var(--button-filled-default);
  color: var(--general-background);
}
</style>
