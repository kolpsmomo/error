<template>
  <div :class="$style['avatar-wrapper']">
    <div
      :class="$style.avatar"
      :style="{
        backgroundImage: `url(${src})`,
        width: avatarBorder ? '97%' : '100%',
        height: avatarBorder ? '97%' : '100%',
      }"
    />
    <div
      :class="$style.frame"
      data-test="user-chat-frame"
      :style="{
        backgroundImage: `url(${
          avatarBorder ? avatarBorder.icon : defaultBorder
        })`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import type { AvatarBorder } from "~/api_gen";
import defaultBorder from "~/assets/event/default-border.png";

const props = defineProps<{
  src?: string;
  avatarBorder?: AvatarBorder;
}>();
const { src, avatarBorder } = toRefs(props);
</script>

<style lang="scss" module>
.avatar-wrapper {
  position: absolute;
  left: 2px;
  top: 5px;
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $br5;
  background-color: var(--button-tonal-default);
}

.frame,
.avatar {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.avatar {
  border-radius: 0.5rem;
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
