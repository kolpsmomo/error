export function formattedDate(date: string) {
  const options = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  } as Intl.DateTimeFormatOptions;

  return new Intl.DateTimeFormat("ru", options).format(new Date(date));
}

export function numberWithCommas(val: number) {
  return new Intl.NumberFormat().format(val);
}

export function debounce(cb: Function, timeout = 500) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(null, [...args]);
    }, timeout);
  };
}
