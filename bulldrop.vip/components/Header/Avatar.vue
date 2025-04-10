<template>
  <div :class="$style['avatar-wrapper']">
    <div
      :class="$style.avatar"
      :style="{
        backgroundImage: `url(${session.user?.avatar})`,
        width: session.user?.avatarBorder ? '97%' : '100%',
        height: session.user?.avatarBorder ? '97%' : '100%',
      }"
    />
    <div
      :class="$style.frame"
      :style="{
        backgroundImage: `url(${
          session.user?.avatarBorder
            ? session.user.avatarBorder.icon
            : defaultBorder
        })`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import defaultBorder from "~/assets/event/default-border.png";

const userStore = useUserStore();
const { session } = storeToRefs(userStore);
</script>

<style lang="scss" module>
.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.frame,
.avatar {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.avatar {
  border-radius: 12px;
}

.frame {
  position: absolute;
  transform: scale(1.2);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
