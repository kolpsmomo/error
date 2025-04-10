/**
 * Форматирует число согласно локальным настройкам.
 *
 * @param {number} value - значение для форматирования.
 * @param {number} minimumFractionDigits - минимальное количество чисел после запятой.
 * @param {number} maximumFractionDigits - максимальное количество чисел после запятой.
 * @returns {string}
 */
export default function toLocalNumber(
  value: number,
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 2,
): string {
  return new Intl.NumberFormat("ru", {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}
