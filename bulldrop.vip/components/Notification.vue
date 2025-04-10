<template>
  <div
    :class="[
      $style.notification,
      notificationCopy?.type === 'error' && $style.error,
      countdown && $style.animate,
    ]"
    data-test="notifications"
    @animationend="handleAnimationEnd"
  >
    <div :class="$style['icon-container']">
      <IconClose
        v-if="notificationCopy?.type === 'error'"
        :class="$style['error-icon']"
      />
      <IconOk
        v-else
        :class="$style['success-icon']"
      />
    </div>
    <div
      :class="$style['notification-text']"
      data-test="notification-text"
    >
      {{ notificationCopy?.text }}
    </div>
    <button
      :class="$style['close-button']"
      @click="notificationsStore.hideNotification"
    >
      <IconClose />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { INotificationOptions } from "~/types";

const notificationsStore = useNotificationsStore();
const notificationCopy = ref<INotificationOptions | undefined>(undefined);
const countdown = ref(false);
const stack = ref<INotificationOptions[]>([]);
let timer: ReturnType<typeof setTimeout> | undefined;

watch(
  () => notificationsStore.notification,
  (newNotification: INotificationOptions | undefined) => {
    if (!newNotification) return;
    clearTimeout(timer);
    if (
      notificationCopy.value &&
      notificationCopy.value.text === newNotification.text &&
      notificationCopy.value.type === newNotification.type
    ) {
      countdown.value = false;
      timer = setTimeout(() => (countdown.value = true), 10);
    } else {
      stack.value.push(JSON.parse(JSON.stringify(newNotification)));
    }
  },
);

onMounted(() => {
  notificationCopy.value = JSON.parse(
    JSON.stringify(notificationsStore.notification),
  );
  nextTick(() => (countdown.value = true));
});

onBeforeMount(() => clearTimeout(timer));

const handleAnimationEnd = () => {
  if (stack.value.length) {
    const copiedValue = stack.value.shift();
    if (!copiedValue) return;
    notificationCopy.value = copiedValue;
    countdown.value = false;
    timer = setTimeout(() => (countdown.value = true), 10);
  } else {
    notificationsStore.hideNotification();
  }
};
</script>

<style lang="scss" module>
.notification {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px 16px;
  background: $gradient-notification-success;
  box-sizing: border-box;
  position: fixed;
  right: 15px;
  top: 80px;
  z-index: 10000;
  width: 300px;
  border-radius: $br10;
  color: var(--general-white);
  overflow: hidden;
  backdrop-filter: blur(40px);
  box-shadow: 2px 4px 10px rgba(19, 17, 41, 0.3);

  @media screen and (max-width: 1300px) {
    top: 60px;
  }

  @media screen and (max-width: 425px) {
    width: auto;
    right: 15px;
    left: 15px;
  }
}

.error {
  background: $gradient-notification-error;
}

.animate {
  animation: disappear-animation 2s 3s ease forwards;

  &:hover {
    animation: none;
  }
}

@keyframes disappear-animation {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.notification-text {
  margin-left: 12px;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bdrop-banner-btn);
  border-radius: 10px;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;

  svg {
    fill: #fff;
  }
}

.error-icon {
  width: 26px;
}

.success-icon {
  width: 16px;
}

.close-button {
  background-color: transparent;
  border: none;
  width: auto;
  height: auto;
  padding: 0;
  margin-left: auto;

  &:hover {
    svg {
      fill: #fff;
    }
  }

  &:focus {
    outline: none;
  }

  svg {
    width: 22px;
    height: 22px;
    fill: #e3e3e5;
  }
}
</style>
