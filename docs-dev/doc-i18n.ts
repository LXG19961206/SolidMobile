/**
 * 文档站 i18n —— 简单直接，零魔法。
 *
 * 每个 doc 页 import 自己组件的 locale 文件：
 *   import zh from './i18n/ellipsis/zh-CN'
 *   import en from './i18n/ellipsis/en-US'
 *   registerLocale({ 'zh-CN': zh, 'en-US': en })
 *
 * Common 词条（nav, shared）在启动时自动加载。
 */
import { messages as libMessages } from '../src/i18n/dictionaries';

function deepMerge(target: any, source: any) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])
      && target[key] && typeof target[key] === 'object') {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

export function registerLocale(messages: Record<string, Record<string, unknown>>) {
  for (const locale of Object.keys(messages)) {
    if (!(libMessages as any)[locale]) (libMessages as any)[locale] = {};
    deepMerge((libMessages as any)[locale], messages[locale]);
  }
}

// 启动时加载 common
import zhCN from './i18n/common/zh-CN';
import enUS from './i18n/common/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export { useLocale, useT, setGlobalLocale, LocaleProvider } from '../src/i18n';
export const docI18nReady = true;
