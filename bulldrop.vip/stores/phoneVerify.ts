export const usePhoneVerifyStore = defineStore("phoneVerifyStore", () => {
  const verifyWindowIsRequired = ref(false);
  const ReVerifyWindowIsRequired = ref(false);

  function showVerifyWindow() {
    document.documentElement.style.overflow = "hidden";
    verifyWindowIsRequired.value = true;
  }

  function hideVerifyWindow() {
    verifyWindowIsRequired.value = false;
    document.documentElement.style.overflow = "";
  }

  function showReVerifyWindow() {
    document.documentElement.style.overflow = "hidden";
    ReVerifyWindowIsRequired.value = true;
  }

  function hideReVerifyWindow() {
    ReVerifyWindowIsRequired.value = false;
    document.documentElement.style.overflow = "";
  }

  return {
    verifyWindowIsRequired,
    ReVerifyWindowIsRequired,
    showReVerifyWindow,
    hideReVerifyWindow,
    showVerifyWindow,
    hideVerifyWindow,
  };
});
