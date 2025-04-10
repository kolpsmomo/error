import { useMonthCookie } from "~/utils/cookie";

export const setTokens = ({
  access,
  refresh,
}: {
  access: string;
  refresh: string;
}) => {
  const accessCookie = useMonthCookie("access");
  const refreshCookie = useMonthCookie("refresh");
  accessCookie.value = access;
  refreshCookie.value = refresh;
};
