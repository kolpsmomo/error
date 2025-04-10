import type { PromoCode } from "~/api_gen";

export const usePromocodesStore = defineStore("promocodesStore", () => {
  const { t } = useI18n();
  const promocodeWindowIsRequired = ref(false);
  const userStore = useUserStore();
  const coreStore = useCoreStore();
  const promocodeData = ref<PromoCode | undefined>(undefined);
  const isCodeChecking = ref<boolean>(false);

  function transformPlatform(promocodeDataValue: any) {
    const transformedData = { ...promocodeDataValue };

    if (!coreStore.isUserIndia) return transformedData;

    if (promocodeDataValue.platform === "pubg") {
      transformedData.platform = "bgmi";
    }

    if (
      promocodeDataValue._case &&
      promocodeDataValue._case.platform === "pubg"
    ) {
      transformedData._case = {
        ...promocodeDataValue._case,
        platform: "bgmi",
      };
    }

    return transformedData;
  }

  function activatePromocode(promocode: string) {
    const api = useApi();
    return api.promoCodes.codesActivate({
      activatePromoCodeRequest: {
        code: promocode,
      },
    });
  }

  const checkCode = async (code: string) => {
    try {
      promocodeData.value = undefined;
      isCodeChecking.value = true;
      const data = await useApi().promoCodes.codesShow({
        activatePromoCodeRequest: { code },
      });
      if (data) {
        promocodeData.value = transformPlatform(data);
      } else {
        promocodeData.value = undefined;
      }
    } finally {
      isCodeChecking.value = false;
    }
  };

  function cancelPromocode() {
    const api = useApi();
    return api.promoCodes.codesDeactivate().then((response) => {
      userStore.getUser();
      return response;
    });
  }

  async function showPromocodePopup(promocode?: string) {
    const api = useApi();
    if (promocode) {
      const notify = useNotify();

      if (!userStore.userIsAuthorized) {
        notify({
          type: "error",
          text: t("auth.errors.auth_needed"),
        });
      } else {
        try {
          promocodeData.value = await api.promoCodes.codesShow({
            activatePromoCodeRequest: {
              code: promocode,
            },
          });
        } catch (e: any) {
          const errorData = await e.response.json();
          if (Array.isArray(errorData?.code) && errorData?.code.length) {
            notify({
              type: "error",
              text: errorData.code[0],
            });
          } else if (typeof errorData?.code === "string" && errorData?.code) {
            notify({
              type: "error",
              text: errorData.code,
            });
          } else {
            notify({
              type: "error",
              text: t("promocode.failed_to_activate"),
            });
          }
        }
      }
    }

    document.documentElement.style.overflow = "hidden";
    promocodeWindowIsRequired.value = true;
  }

  function hidePromocodeWindow() {
    promocodeWindowIsRequired.value = false;
    document.documentElement.style.overflow = "";
  }

  return {
    promocodeWindowIsRequired,
    activatePromocode,
    cancelPromocode,
    showPromocodePopup,
    hidePromocodeWindow,
    checkCode,
    isCodeChecking,
    promocodeData,
  };
});
