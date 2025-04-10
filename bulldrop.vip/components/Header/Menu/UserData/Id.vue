<template>
  <div :class="$style.id">
    id: {{ userStore.session.user?.id }} <CopyButton @click="copy" />
  </div>
</template>

<script setup lang="ts">
import CopyButton from "./Id/CopyButton.vue";

const userStore = useUserStore();
const clipboard = useClipboard();
const copy = async () => {
  if (userStore.session.user) {
    await clipboard.copy(userStore.session.user?.id.toString());
  }
};
</script>

<style lang="scss" module>
.id {
  color: var(--general-white);
  font-size: 0.875rem;
  text-transform: uppercase;
  margin-top: 4px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.14px;
}
</style>
