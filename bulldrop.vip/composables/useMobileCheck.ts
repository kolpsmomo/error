/**
 * Проверяет, выполняется ли код на мобильном устройстве.
 */
export default function useMobileCheck(): boolean {
  if (
    isClient() &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
    return true;
  } else {
    return false;
  }
}
