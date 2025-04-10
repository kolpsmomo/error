/**
 * Возвращает текущую дату и время в Москве.
 * @returns Объект с текущей датой и временем в Москве.
 */

export function useServerDateTime(): { serverDateTime: Date } {
  try {
    const serverDateTime = new Date(
      /**
       * используем локаль "en-US" для корректного отображения времени, т.к. данная ф-ия
       * переиспользуется и формат возвращаемой даты с сервера зачастую соответствует
       * английской локали
       *
       * В локали "en-US" используется формат месяц/день/год (MM/DD/YYYY) и 12-часовой формат времени
       * В локали "ru-RU" используется формат день.месяц.год (DD.MM.YYYY) и 24-часовой формат времени
       */
      new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" }),
    );
    return {
      serverDateTime,
    };
  } catch (error) {
    return {
      serverDateTime: new Date(),
    };
  }
}
