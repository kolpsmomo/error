export const usePlatformSelection = () => {
  const coreStore = useCoreStore();
  if (!useCookie("platform").value && coreStore.userCountry)
    coreStore.showPlatformSwitcher();
};
