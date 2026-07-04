export type Locale = 'zh-CN' | 'en-US';

/** Deeply nested translation dictionary. Keys are section → key → message. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TranslationDict = Record<string, Record<string, any>> & {
  demo?: Record<string, any>;
  common?: Record<string, any>;
  section?: Record<string, any>;
  nav?: Record<string, any>;
  componentIntro?: Record<string, any>;
  [key: string]: Record<string, any> | undefined;
};

export type LocaleMessages = Record<Locale, TranslationDict>;
