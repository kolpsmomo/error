<template>
  <div
    :class="[$style['form-label'], errorMsg && $style['error']]"
    data-test="form-label-error-msg"
  >
    <template v-if="!isMsgBottom && label && !errorMsg">{{ label }}</template>
    <template v-if="!isMsgBottom && errorMsg">{{ errorMsg }}</template>
    <slot />
    <template v-if="isMsgBottom && errorMsg">{{ errorMsg }}</template>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

interface Props {
  // label input'а.
  label?: string;
  // Содержание ошибки для указанного поля.
  errorMsg?: string;
  isMsgBottom?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  errorMsg: "",
  isMsgBottom: true,
});

const { label, errorMsg } = toRefs(props);
</script>

<style lang="scss" module>
.form-label {
  margin-bottom: 16px;
  display: block;
  width: 100%;
  letter-spacing: -0.01em;
  font-size: 12px;
  line-height: 16px;
  color: var(--general-white);

  & > input,
  & > select,
  & > textarea,
  & > div {
    margin-top: 8px !important;
  }
  &.error {
    color: $red-1;
  }
}
</style>
