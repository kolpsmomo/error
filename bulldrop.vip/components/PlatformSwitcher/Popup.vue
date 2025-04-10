<template>
  <div
    :class="$style.popup"
    data-test="popup"
  >
    <IconClose
      v-if="closable"
      :class="$style.close"
      @click="coreStore.hidePlatfromSwitcher"
    />
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{ closable: boolean }>();
const coreStore = useCoreStore();
</script>

<style lang="scss" module>
.popup {
  background: var(--general-underlay-1-lvl);
  border-radius: 20px;
  padding: 24px;
  color: var(--general-white);
  position: relative;
}

.close {
  position: absolute;
  right: 20px;
  top: 24px;
  cursor: pointer;
  fill: var(--general-grey);
  transition: fill linear 0.05s;
  &:hover {
    fill: var(--general-white);
  }
}
</style>
