
import { DialogAPI } from '../src/components/Dialog/DialogManager';

/* ── i18n first-switch notice (in-memory, once per session) ── */
let i18nNoticeShown = false;
export function showI18nNotice() {
  if (i18nNoticeShown) return;
  i18nNoticeShown = true;
  setTimeout(() => {
    DialogAPI.confirm({
      title: '🌐 关于国际化 / About i18n',
      message: '组件功能描述、属性说明等主要内容已做了基本的国际化，组件库自身也具备完善的多语言支持能力。\n\n受限于个人维护精力，文档 demo 中的示例数据（姓名、选项、提示文案等）仅提供一套简单英文，没有做中英双语对照。不过用的都是基础词汇，不影响理解。\n\n——\n\nMain content — component descriptions, prop docs, etc. — has been internationalized, and the library itself has full i18n support.\n\nDue to limited solo-maintainer bandwidth, demo placeholder data (names, options, labels, etc.) is shown in simple English only. Nothing fancy — just basic vocabulary.',
      confirmText: '知道了 / Got it',
      showCancelButton: false,
    });
  }, 100);
}

export type Section = 'guide' | 'components' | 'mobile';

export function parseHash(): { section: Section; pageKey: string } {
  const raw = window.location.hash.replace('#', '') || '';
  // #mobile/<key> → mobile demo route
  if (raw.startsWith('mobile/')) {
    const key = raw.replace('mobile/', '');
    return { section: 'mobile', pageKey: key };
  }
  if (raw.startsWith('/')) {
    const parts = raw.split('/').filter(Boolean);
    const section = (parts[0] || 'guide') as Section;
    const pageKey = parts[1] || (section === 'guide' ? 'guide' : 'button');
    return { section, pageKey };
  }
  return { section: 'components', pageKey: raw || 'button' };
}

export function buildHash(section: Section, key?: string): string {
  if (section === 'components') return `#/components/${key || 'button'}`;
  if (section === 'guide' && key) return `#/guide/${key}`;
  return `#/${section}`;
}

const DARK_KEY = 'sc-docs-dark-mode';
export function getDark(): boolean {
  try { return localStorage.getItem(DARK_KEY) === '1'; } catch { return false; }
}
export function applyDark(on: boolean) {
  document.documentElement.classList.toggle('dark', on);
  localStorage.setItem(DARK_KEY, on ? '1' : '0');
}
