<template>
  <FlagProvider
    :unleash-client="unleashClient"
    :start-client="false"
  >
    <NuxtLayout>
      <NuxtPage />
      <ClientOnly>
        <Transition name="notification">
          <Notification v-if="notificationsStore.notificationIsRequired" />
        </Transition>
      </ClientOnly>
    </NuxtLayout>
  </FlagProvider>
</template>

<script setup lang="ts">
import { FlagProvider } from "@unleash/proxy-client-vue";
import {
  LOGIN_EVENT,
  LOGIN_EVENT_TARGET,
} from "~/event-targets/loginEventTarget";

const notificationsStore = useNotificationsStore();
const userStore = useUserStore();
const unleashManager = useUnleashManager();
const unleashClient = unleashManager.useUnleashClient();
const posthog = usePosthog();

unleashClient.on("impression", (event: any) => {
  if (!posthog) return;
  posthog.capture(event.eventType, {
    ...event.context,
    featureName: event.featureName,
    enabled: event.enabled,
    variant: event.variant,
  });
});

onNuxtReady(async () => {
  if (isClient()) {
    await pause();
    await userStore.handleVisit();
    await pause();
    await unleashClient.start();
    await pause(5000);
    // если пользователь уже авторизован и дал согласие на уведомления
    useFirebasePushes();
    // если предыдущий шаг был пропущен
    LOGIN_EVENT_TARGET.addEventListener(LOGIN_EVENT, async () => {
      useFirebasePushes();
    });
  }
});
</script>
