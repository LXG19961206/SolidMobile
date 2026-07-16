/**
 * 文档站 i18n 层 — 按需增量加载。
 *
 * 每个组件 doc 页 import 自己的 i18n 文件并调用 registerLocale() 注册。
 * Common 通用词条在此自动注册。
 */
import { messages as libMessages } from '../src/i18n/dictionaries';

// Deep-merge utility
function deepMerge(target: any, source: any) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

/** 运行时注册一组 locale 词条（按需增量加载） */
export function registerLocale(messages: Record<string, Record<string, unknown>>) {
  for (const locale of Object.keys(messages)) {
    if (!(libMessages as any)[locale]) (libMessages as any)[locale] = {};
    deepMerge((libMessages as any)[locale], messages[locale]);
  }
}

// 自动导入 common 通用词条
import zhCN from './i18n/common/zh-CN';
import enUS from './i18n/common/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

// Re-export everything from the library's i18n module
export { useLocale, useT, setGlobalLocale, LocaleProvider } from '../src/i18n';

// Exported so Rollup cannot tree-shake this module
export const docI18nReady = true;
