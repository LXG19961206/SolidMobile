export type Locale = 'zh-CN' | 'en-US';

/** Deeply nested translation dictionary. Keys are section → key → message. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TranslationDict = Record<string, Record<string, any>>;

export type LocaleMessages = Record<Locale, TranslationDict>;
