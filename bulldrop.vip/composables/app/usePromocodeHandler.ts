export const usePromocodeHandler = async () => {
  const route = useRoute();
  const { promocode } = route.query;
  if (promocode) {
    return usePromocodesStore().showPromocodePopup(promocode.toString());
  }
};
