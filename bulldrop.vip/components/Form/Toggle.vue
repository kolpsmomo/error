<template>
  <label :class="[modelValue && $style.checked, $style.toggle]">
    <div :class="$style.circle" />
    <input
      type="checkbox"
      :checked="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
    />
  </label>
</template>

<script setup lang="ts">
type Props = {
  modelValue?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

const { modelValue } = toRefs(props);
</script>

<style lang="scss" module>
.toggle {
  cursor: pointer;
  flex-shrink: 0;
  width: 52px;
  height: 32px;
  padding: 5px;
  border-radius: 20px;
  background-color: var(--toggle-switch-off);
  transition: 0.25s;

  &:hover {
    .circle {
      opacity: 0.75;
    }
  }

  .circle {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: var(--general-white);
    transition: 0.25s;
  }

  input[type="checkbox"] {
    display: none;
  }
}

.checked {
  background-color: var(--toggle-switch-on);

  .circle {
    transform: translateX(20px);
  }
}
</style>
