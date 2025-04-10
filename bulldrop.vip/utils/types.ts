export type MaybeString = string | null;
export type MaybeArray<T> = T[] | null;
export type Mutable<T> = { -readonly [K in keyof T]: T[K] };
export type Immutable<T> = { +readonly [K in keyof T]: T[K] };
export type WithMutableFields<T, U extends keyof T> = Omit<T, U> &
  Mutable<Pick<T, U>>;

export const exhaustiveMatchGuard = (value: never): never => {
  throw new Error("Exhaustive match guard" + value);
};
