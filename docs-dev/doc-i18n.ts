/**
 * Documentation i18n layer.
 *
 * Merges documentation-only i18n keys into the component library's
 * dictionaries at import time. Doc pages import from here instead of
 * directly from 'src/i18n' so that the component library's bundle
 * stays lean for end users.
 */
import { messages as libMessages } from '../src/i18n/dictionaries';
import { docMessages } from './doc-dictionaries';
import type { LocaleMessages } from '../src/i18n/types';

// Deep-merge: doc keys are appended to the library's dictionary for each locale.
// If a key exists in both, the doc version wins (should not happen in practice).
function deepMerge(target: any, source: any): any {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

for (const locale of Object.keys(docMessages) as Array<keyof LocaleMessages>) {
  if (!libMessages[locale]) {
    (libMessages as any)[locale] = {};
  }
  deepMerge((libMessages as any)[locale], (docMessages as any)[locale]);
}

// Re-export everything from the library's i18n module.
// The dictionaries have been mutated in-place so all t() calls
// automatically include doc keys.
export { useLocale, useT, setGlobalLocale, LocaleProvider } from '../src/i18n';

// Exported so Rollup cannot tree-shake this module — the merge above
// is the side-effect we need to preserve.
export const docI18nReady = true;
