<template>
  <div
    :class="$style['auth-is-required']"
    @click="showAuth"
  >
    {{ t("misc.auth_is_required") }}
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const coreStore = useCoreStore();
const userStore = useUserStore();

const showAuth = () => {
  if (coreStore.headerMenuIsRequired) {
    coreStore.hideMenuHeader();
  }
  userStore.showAuth("login");
};
</script>

<style lang="scss" module>
.auth-is-required {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  border-radius: 0;
}
</style>
