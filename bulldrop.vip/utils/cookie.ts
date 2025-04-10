import { getDateInAMonth } from "./date";
import { getDateInAYear } from "./date";

/**
 * Возвращает куку, которая истекает спустя месяц с момента вызова функции.
 *
 * @param cookieName - наименование куки
 * @param options - опции куки, см. https://nuxt.com/docs/api/composables/use-cookie#options
 */
export const useMonthCookie = (
  cookieName: string,
  options: Record<string, any> = {},
) => {
  return useCookie(cookieName, {
    ...options,
    expires: getDateInAMonth(),
  });
};

/**
 * Возвращает куку, которая истекает спустя год с момента вызова функции.
 *
 * @param cookieName - наименование куки
 * @param options - опции куки, см. https://nuxt.com/docs/api/composables/use-cookie#options
 */
export const useYearCookie = (
  cookieName: string,
  options: Record<string, any> = {},
) => {
  return useCookie(cookieName, {
    ...options,
    expires: getDateInAYear(),
  });
};
