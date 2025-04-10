export const useFirebasePushes = async () => {
  const nuxtApp = useNuxtApp();
  const userStore = useUserStore();
  if (
    !nuxtApp.$firebaseManager.isMessagingDeviceTokenSaved() &&
    userStore.session.user
  ) {
    try {
      await nuxtApp.$firebaseManager.saveMessagingDeviceToken(
        userStore.session.user.id,
      );
      await nuxtApp.$firebaseManager.initializeAnalytics();
    } catch (error) {
      /* empty */
    }
  }
};
