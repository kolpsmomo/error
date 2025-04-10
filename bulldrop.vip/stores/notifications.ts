import type { INotificationOptions } from "~/types";

export const useNotificationsStore = defineStore("notificationsStore", () => {
  const notificationIsRequired = ref(false);
  const notificationsWindowIsRequired = ref(false);
  const notification = ref<INotificationOptions>();

  function showNotification(settings: INotificationOptions) {
    notificationIsRequired.value = true;
    notification.value = settings;
  }

  function hideNotification() {
    notificationIsRequired.value = false;
    notification.value = undefined;
  }

  return {
    notificationIsRequired,
    notificationsWindowIsRequired,
    notification,
    showNotification,
    hideNotification,
  };
});
