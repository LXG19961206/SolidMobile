/// <reference types="vite/client" />
/**
 * 文档站 i18n 层。
 * 启动时通过 import.meta.glob 一次性加载所有组件词条 + common 词条。
 * 各 doc 页无需任何 i18n 相关 boilerplate，只需 import { useT } from 'doc-i18n'。
 */
import { messages as libMessages } from '../src/i18n/dictionaries';

function deepMerge(target: any, source: any) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) && target[key] && typeof target[key] === 'object') {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

function register(mod: any) {
  const data = mod.default || mod;
  for (const locale of Object.keys(data)) {
    if (!(libMessages as any)[locale]) (libMessages as any)[locale] = {};
    deepMerge((libMessages as any)[locale], data[locale]);
  }
}

// ── Eager-load all locale files ──
const zhModules = import.meta.glob('./i18n/**/zh-CN.ts', { eager: true });
const enModules = import.meta.glob('./i18n/**/en-US.ts', { eager: true });

for (const [path, mod] of Object.entries(zhModules)) {
  register({ 'zh-CN': (mod as any).default });
}
for (const [path, mod] of Object.entries(enModules)) {
  register({ 'en-US': (mod as any).default });
}

export { useLocale, useT, setGlobalLocale, LocaleProvider } from '../src/i18n';
export const docI18nReady = true;
