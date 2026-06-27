import { createSignal, createMemo, type ParentProps, type JSX } from 'solid-js';
import { messages } from './dictionaries';
import type { Locale } from './types';

export type { Locale } from './types';

const LOCALE_KEY = 'sc-docs-locale';

function getInitial(): Locale {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(LOCALE_KEY);
    if (stored === 'en-US' || stored === 'zh-CN') return stored;
  }
  return 'zh-CN';
}

// Module-level reactive signal — no Provider needed for simple use
const [locale, setLocale] = createSignal<Locale>(getInitial());

// Sync across manager ↔ preview iframe via localStorage
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === LOCALE_KEY && (e.newValue === 'zh-CN' || e.newValue === 'en-US')) {
      setLocale(e.newValue);
    }
  });
}

/** Return the current locale string. */
export function useLocale(): Locale {
  return locale();
}

/** Switch locale globally (persisted to localStorage). */
export function setGlobalLocale(next: Locale) {
  setLocale(next);
  if (typeof localStorage !== 'undefined') localStorage.setItem(LOCALE_KEY, next);
}

/**
 * A tiny translation function (nested key lookup).
 */
export function useT(): (key: string) => string {
  const dict = createMemo(() => messages[locale()]);

  return (key: string): string => {
    const parts = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = dict();
    for (const part of parts) {
      if (value == null || typeof value !== 'object') return key;
      value = value[part];
    }
    return typeof value === 'string' ? value : key;
  };
}

/* -------------------------------------------------------------------------- */
/*  LocaleProvider — compatibility wrapper for external consumers             */
/* -------------------------------------------------------------------------- */

export interface LocaleProviderProps {
  locale: Locale;
  children?: JSX.Element;
}

export function LocaleProvider(props: LocaleProviderProps) {
  // Sync provider locale to module-level signal
  setLocale(props.locale);
  return props.children as JSX.Element;
}
