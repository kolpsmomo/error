export function usePluralize(num: number, words: string[] = []): string {
  if (typeof num !== "number" || !words)
    throw new Error("function doesn`t have any agruments");
  return words[
    num % 100 > 4 && num % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
  ];
}
