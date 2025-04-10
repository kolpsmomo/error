/**
 * Обрезает строку до указанного количества символов.
 *
 * @param {string} str - строка для обрезки.
 * @param {number} max - максимальное количество символов, которое должно оставаться в строке.
 * @returns {string}
 */
export default function truncateString(str: string, max: number): string {
  if (str.length <= max) {
    return str;
  } else {
    return `${str.slice(0, max)}...`;
  }
}
