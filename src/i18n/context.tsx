import { createSignal, createMemo, type JSX } from 'solid-js';
import { messages } from './dictionaries';
import { FALLBACK_LOCALE } from './types';
import type { TranslationDict, UserLocaleMessages } from './types';

export type { Locale } from './types';
export type { TranslationDict, UserLocaleMessages } from './types';

const LOCALE_KEY = 'sc-docs-locale';

function getInitial(): string {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(LOCALE_KEY);
    if (stored) return stored;
  }
  return 'zh-CN';
}

// ── Module-level reactive signals ──

const [locale, setLocale] = createSignal<string>(getInitial());

/** User-provided custom locale dictionaries. */
const [userMessages, setUserMessagesSignal] = createSignal<UserLocaleMessages>({});

// Sync across manager ↔ preview iframe via localStorage
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === LOCALE_KEY && e.newValue) {
      setLocale(e.newValue);
    }
  });
}

// ── Public API ──

/** Return the current locale string. */
export function useLocale(): string {
  return locale();
}

/** Switch locale globally (persisted to localStorage). */
export function setGlobalLocale(next: string) {
  setLocale(next);
  if (typeof localStorage !== 'undefined') localStorage.setItem(LOCALE_KEY, next);
}

/** Inject user-provided custom locale dictionaries (deep-merged with built-in). */
export function setUserMessages(msgs: UserLocaleMessages) {
  setUserMessagesSignal(msgs);
}

// ── Internal helpers ──

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Deep-merge `source` into `target`. Source wins on conflict. */
function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    const sv = source[key];
    const tv = result[key];
    if (isPlainObject(sv) && isPlainObject(tv)) {
      result[key] = deepMerge(tv, sv);
    } else if (sv !== undefined) {
      result[key] = sv;
    }
  }
  return result;
}

/**
 * Build the merged dictionary for a given locale:
 *   1. Start with built-in messages for that locale (may be empty).
 *   2. Deep-merge user-provided messages on top (user wins).
 *
 * Returns `null` if the locale has no built-in or user dictionary at all.
 */
function getMergedDict(loc: string): Record<string, unknown> | null {
  const builtIn = (messages as Record<string, TranslationDict>)[loc];
  const user = userMessages()[loc];

  if (!builtIn && !user) return null;

  const base = (builtIn ?? {}) as Record<string, unknown>;
  const overlay = (user ?? {}) as Record<string, unknown>;
  return deepMerge(base, overlay);
}

// Track already-warned keys to avoid console spam.
const warnedKeys = new Set<string>();

/**
 * A tiny translation function (nested key lookup) with fallback.
 *
 * Fallback chain:
 *   1. Current locale (merged built-in + user)
 *   2. en-US (merged built-in + user)
 *   3. Return the key path as-is
 *
 * Missing keys emit a single `console.warn` per key.
 */
export function useT(): (key: string) => string {
  const dict = createMemo(() => getMergedDict(locale()));
  const fallbackDict = createMemo(() => getMergedDict(FALLBACK_LOCALE));

  return (key: string): string => {
    // 1. Try current locale
    const val = lookup(dict(), key);
    if (val !== undefined) return val;

    // 2. Try en-US fallback (if different from current)
    if (locale() !== FALLBACK_LOCALE) {
      const fbVal = lookup(fallbackDict(), key);
      if (fbVal !== undefined) return fbVal;
    }

    // 3. Warn and return key path
    if (!warnedKeys.has(key)) {
      warnedKeys.add(key);
      console.warn(
        `[solid-mobile i18n] Missing translation for key "${key}" in locale "${locale()}" (and fallback "${FALLBACK_LOCALE}"). ` +
        `Provide it via <ProviderConfig localeMessages={{ "${locale()}": { ... } }}>.`,
      );
    }

    return key;
  };
}

/** Walk a dot-separated key path. Returns `undefined` if any segment is missing. */
function lookup(dict: Record<string, unknown> | null, key: string): string | undefined {
  if (!dict) return undefined;
  const parts = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = dict;
  for (const part of parts) {
    if (value == null || typeof value !== 'object') return undefined;
    value = value[part];
  }
  return typeof value === 'string' ? value : undefined;
}

/* -------------------------------------------------------------------------- */
/*  LocaleProvider — compatibility wrapper for external consumers             */
/* -------------------------------------------------------------------------- */

export interface LocaleProviderProps {
  locale: string;
  /** User-provided custom locale dictionaries (deep-merged with built-in). */
  messages?: UserLocaleMessages;
  children?: JSX.Element;
}

export function LocaleProvider(props: LocaleProviderProps) {
  // Sync provider locale to module-level signal
  setLocale(props.locale);
  if (props.messages) {
    setUserMessagesSignal(props.messages);
  }
  return props.children as JSX.Element;
}
