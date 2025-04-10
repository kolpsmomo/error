/**
 * Возвращает дату спустя 30 дней от текущей.
 */
export const getDateInAMonth = () =>
  new Date(new Date().setDate(new Date().getDate() + 30));

/**
 * Возвращает дату спустя год от текущей.
 */
export const getDateInAYear = () =>
  new Date(new Date().setDate(new Date().getDate() + 365));
