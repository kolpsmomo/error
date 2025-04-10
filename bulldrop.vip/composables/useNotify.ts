import type { INotificationOptions } from "~/types";

export const useNotify = () => {
  const store = useNotificationsStore();
  return (settings: INotificationOptions) => {
    store.showNotification(settings);
  };
};
