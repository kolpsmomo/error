<template>
  <DecoratedNickname
    v-if="session.user"
    :value="session.user?.selectedNicknameDecoration"
    :class="[$style.nickname]"
  >
    {{ truncateString(session.user.nickname, 10) }}
  </DecoratedNickname>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const { session } = storeToRefs(userStore);
</script>

<style lang="scss" module>
.nickname {
  margin-bottom: 5px;
  font-weight: 500;
  color: var(--general-white);
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -0.18px;
  text-transform: none;
}
</style>
