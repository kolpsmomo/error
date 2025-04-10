<template>
  <div :class="$style.new__msg">{{ t("chat.new_messages") }}</div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style lang="scss" module>
.new__msg {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -110%);
  width: 200px;
  text-align: center;
  background-color: var(--general-transparent-mid-35);
  border-radius: 10px;
  color: var(--general-white);
  padding: 4px 0;
  cursor: pointer;
  z-index: 20;
}
</style>
