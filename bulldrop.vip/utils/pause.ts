export const pause = (howLong: number = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, howLong);
  });
