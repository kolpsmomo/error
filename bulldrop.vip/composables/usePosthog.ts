export const usePosthog = () => {
  if (isServer() || isDev()) {
    return null;
  } else {
    return useNuxtApp().$clientPosthog;
  }
};
