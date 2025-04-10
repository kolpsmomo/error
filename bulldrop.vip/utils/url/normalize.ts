import { normalizeURL, cleanDoubleSlashes } from "ufo";

export const normalize = (path: string) =>
  normalizeURL(cleanDoubleSlashes(path));
