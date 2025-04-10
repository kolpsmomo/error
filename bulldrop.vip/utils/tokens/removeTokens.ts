export const removeTokens = () => {
  const accessCookie = useMonthCookie("access");
  const refreshCookie = useMonthCookie("refresh");
  accessCookie.value = null;
  refreshCookie.value = null;
};
