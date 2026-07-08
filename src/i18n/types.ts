/** Built-in locales. */
export type Locale = 'zh-CN' | 'en-US';

/** Fallback locale when a key is missing in the current locale. */
export type FallbackLocale = 'en-US';
export const FALLBACK_LOCALE: FallbackLocale = 'en-US';

/** Deeply nested translation dictionary. Keys are section → key → message. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TranslationDict = Record<string, any>;

/** Built-in locale → dictionary mapping. */
export type LocaleMessages = Record<Locale, TranslationDict>;

/** User-provided custom locale dictionaries (any locale string). */
export type UserLocaleMessages = Record<string, TranslationDict>;
