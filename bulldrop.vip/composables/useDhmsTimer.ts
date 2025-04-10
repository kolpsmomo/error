type HMS = {
  readonly d: string;
  readonly h: string;
  readonly m: string;
  readonly s: string;
  readonly expired: boolean;
};

/**
 * Принимая в качестве первого аргумента строку, представляющую дату,
 * возвращает объект со следующими ключами и значениями:
 * d - количество дней, которое осталось до указанной даты;
 * h - количество часов, которое осталось до указанной даты;
 * m - количество минут, которое осталось до указанной даты;
 * s - количество секунд, которое осталось до указанной даты.
 * expired - true|false, индикатор того, что время истекло.
 *
 * Второй аргумент является опциональным.
 * Если он передан, то также должен представлять собой дату, которая должна использоваться в качестве точки отсчета.
 * Если не передан, то используется текущая системная дата.
 *
 * @example
 * // end = '2023-04-01T15:36:55+03:00'
 * // start = '2023-04-01T14:27:40+03:00'
 * // returns { d: '00', h: '01', m: '09': s: '15', expired: false }
 *
 * @param end - строчное представление даты, до которой необходимо произвести расчет.
 * @param start - строчное представление даты, от которой необходимо произвести расчет.
 */
export default function useDhmsTimer(
  end: string,
  start: string | undefined = undefined,
): HMS {
  const end_date: Date = new Date(end);
  const start_date: Date = start ? new Date(start) : new Date();
  const delta: number = (end_date.getTime() - start_date.getTime()) / 1000;

  if (delta < 0) {
    return {
      d: "00",
      h: "00",
      m: "00",
      s: "00",
      expired: true,
    };
  } else {
    const _d: number = Math.floor(delta / (24 * 60 * 60));
    const _h: number = Math.floor((delta - _d * (24 * 60 * 60)) / (60 * 60));
    const _m: number = Math.floor(
      (delta - _d * (24 * 60 * 60) - _h * (60 * 60)) / 60,
    );
    const _s: number = Math.floor(
      delta - _d * (24 * 60 * 60) - _h * (60 * 60) - _m * 60,
    );
    const d: string = _d < 10 ? `0${_d}` : `${_d}`;
    const h: string = _h < 10 ? `0${_h}` : `${_h}`;
    const m: string = _m < 10 ? `0${_m}` : `${_m}`;
    const s: string = _s < 10 ? `0${_s}` : `${_s}`;

    return { d, h, m, s, expired: false };
  }
}
