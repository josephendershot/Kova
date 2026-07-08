import { en } from "./en";
import { es } from "./es";
import type { Lang, Translations } from "./types";

export type { Lang, Translations };
export { en, es };

export const translations: Record<Lang, Translations> = { en, es };

export function getTranslations(lang: Lang): Translations {
  return translations[lang];
}
