import { createSignal, createMemo, Show, type Component } from 'solid-js';
import { NavBar } from '../../../src/components/NavBar';
import { SafeArea } from '../../../src/components/SafeArea';
import { Icon } from '../../../src/components/Icon';
import { useLocale, setGlobalLocale, useT } from '../../../src/i18n';
import { useDrawer } from './DrawerContext';
import { docThemeColor, persistThemeColor } from '../doc-theme';
import { ThemeColorPicker } from '../ThemeColorPicker';
import rawStyles from './MobilePreview.module.css';
import { scopedStyle } from '../../../src/utils';
const styles = scopedStyle(rawStyles, 'sc-doc-mobile-preview');

/* ── Stable ordered key list for prev/next navigation ──
   Mirrors the mobile drawer order exactly so prev/next always
   follows the sidebar directory, independent of locale or filtering. */
const MOBILE_PAGE_KEYS: string[] = [
  'home',
  'config', 'design-tokens', 'i18n', 'eventbus',
  'solidjs', 'about',
  'button', 'icon', 'center', 'divider', 'card', 'layout', 'safearea',
  'avatar', 'badge', 'tag', 'image', 'empty', 'lazyload', 'list',
  'swipecell', 'swiper', 'ellipsis', 'tooltip', 'floatingball', 'backtop',
  'pullrefresh', 'scrollbar',
  'tabs', 'tabbar', 'navbar', 'cell',
  'picker', 'calendar', 'cascader', 'datepicker', 'citypicker', 'timepicker',
  'toast', 'notify', 'dialog', 'overlay', 'actionsheet', 'loading',
  'form', 'input', 'textarea', 'radio', 'checkbox', 'switch',
  'rate', 'stepper', 'slider', 'select', 'upload',
];

/** Extract the current page key from URL (hash or ?mobile= query). */
function getCurrentKey(): string | null {
  try {
    // iframe mode: ?mobile=button
    const q = new URLSearchParams(window.location.search).get('mobile');
    if (q) return q;
    // standalone mode: #/components/button → button
    const raw = window.location.hash.replace('#', '') || '';
    if (raw.startsWith('/')) {
      const parts = raw.split('/').filter(Boolean);
      return parts[1] || null;
    }
    return raw || null;
  } catch {
    return null;
  }
}

const DARK_KEY = 'sc-docs-dark-mode';
let i18nNoticeShown = false;

function getDark(): boolean {
  try { return localStorage.getItem(DARK_KEY) === '1'; } catch { return false; }
}

async function showI18nNotice() {
  if (i18nNoticeShown) return;
  i18nNoticeShown = true;
  const { DialogAPI } = await import('../../../src/components/Dialog/DialogManager');
  setTimeout(() => {
    DialogAPI.confirm({
      title: '🌐 关于国际化 / About i18n',
      message: '组件描述、属性说明等主要内容已做了基本的国际化，组件库自身也具备完善的多语言支持。\n\n限于个人维护精力，文档 demo 中的示例数据（姓名、选项、提示文案等）仅提供一套简单英文，没有做双语对照。不过用的都是基础词汇，不影响理解。\n\n——\n\nMain content (component descriptions, prop docs) has been internationalized. The library itself has full i18n support.\n\nDue to limited solo-maintainer bandwidth, demo placeholder data (names, options, labels) is shown in simple English only. Nothing fancy — just basic vocabulary.',
      confirmText: 'Got it',
      showCancelButton: false,
    });
  }, 100);
}

export interface ComponentEntry {
  name: string;
  key: string;
}

export interface MobilePreviewProps {
  /** 组件名称 */
  title: string;
  /** 隐藏顶部导航栏，默认 false。悬浮类组件（FloatingBall）推荐开启 */
  hideTitle?: boolean;
  /** 属性列表 */
  props?: { name: string; type: string; desc: string }[];
  /** @deprecated 组件列表，由 App 层抽屉统一管理，此处不再使用 */
  components?: ComponentEntry[];
  /** @deprecated 导航回调，由 App 层抽屉统一管理，此处不再使用 */
  onNavigate?: (key: string) => void;
  /** 打开抽屉回调（由 App 层注入） */
  onOpenDrawer?: () => void;
  /** 隐藏底部 prev/next 导航 */
  hideNav?: boolean;
  children: any;
}

export const MobilePreview: Component<MobilePreviewProps> = (props) => {
  const [showProps, setShowProps] = createSignal(false);
  const [isDark, setIsDark] = createSignal(getDark());
  const t = useT();
  const openDrawer = useDrawer() || props.onOpenDrawer;

  const toggleDark = () => {
    const next = !isDark();
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem(DARK_KEY, next ? '1' : '0'); } catch { }
    setIsDark(next);
  };

  /* ── Prev / Next navigation ──
     Uses the stable MOBILE_PAGE_KEYS order (mirrors drawer) and matches
     by URL hash key — immune to locale switches and group boundaries. */
  const nav = createMemo(() => {
    const currentKey = getCurrentKey();
    if (currentKey) {
      const idx = MOBILE_PAGE_KEYS.indexOf(currentKey);
      if (idx >= 0) {
        const prevKey = idx > 0 ? MOBILE_PAGE_KEYS[idx - 1] : null;
        const nextKey = idx < MOBILE_PAGE_KEYS.length - 1 ? MOBILE_PAGE_KEYS[idx + 1] : null;
        return {
          prev: prevKey ? { key: prevKey, name: t('nav.' + prevKey) || prevKey } : null,
          next: nextKey ? { key: nextKey, name: t('nav.' + nextKey) || nextKey } : null,
        };
      }
    }
    // Fallback: try old name-based matching (for pages not in MOBILE_PAGE_KEYS)
    const list = props.components || [];
    const idx = list.findIndex(c => c.name === props.title);
    const prev = idx > 0 ? list[idx - 1] : null;
    const next = idx < list.length - 1 ? list[idx + 1] : null;
    return { prev, next };
  });

  const navigateTo = (key: string) => {
    if (inIframe() && window.top) {
      const sec = ['home','config','design-tokens','i18n','eventbus','solidjs','about'].includes(key) ? 'guide' : 'components';
      window.top.location.hash = `#/${sec}/${key}`;
    } else {
      props.onNavigate?.(key);
    }
  };

  const inIframe = () => typeof window !== 'undefined' && window.top !== window.self;

  return (
    <div class={styles.shell}>
      <Show when={!props.hideTitle && !inIframe()}>
        <SafeArea position="top" />
        <NavBar
          title={props.title}
          fixed
          border
          placeholder
          left={
            openDrawer ? (
              <span class={styles.navBtn} onClick={openDrawer}>
                <Icon name="dashboard" size={20} />
              </span>
            ) : undefined
          }
          right={
            <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
              <span class={styles.navBtn} onClick={toggleDark} title="Toggle dark mode">
                <Icon name={isDark() ? 'sun' : 'moon'} size={18} />
              </span>
              <ThemeColorPicker color={docThemeColor()} onChange={(c) => persistThemeColor(c)} />
              <span style={{ display: 'inline-flex', border: '1px solid var(--sc-color-border, #e5e7eb)', 'border-radius': '6px', overflow: 'hidden', height: '28px', 'align-items': 'center' }}>
                <span onClick={() => { if (useLocale() !== 'zh-CN') { showI18nNotice(); setGlobalLocale('zh-CN'); } }}
                  style={{ padding: '0 8px', cursor: 'pointer', 'font-size': '0.7rem', 'font-weight': useLocale() === 'zh-CN' ? 600 : 400, height: '100%', display: 'inline-flex', 'align-items': 'center', background: useLocale() === 'zh-CN' ? 'var(--sc-color-primary, #1677ff)' : 'transparent', color: useLocale() === 'zh-CN' ? '#fff' : 'var(--sc-color-text-secondary, #6b7280)', transition: 'all 0.15s' }}>CN</span>
                <span style={{ width: '1px', height: '16px', background: 'var(--sc-color-border, #e5e7eb)', 'flex-shrink': 0 }} />
                <span onClick={() => { if (useLocale() !== 'en-US') { showI18nNotice(); setGlobalLocale('en-US'); } }}
                  style={{ padding: '0 8px', cursor: 'pointer', 'font-size': '0.7rem', 'font-weight': useLocale() === 'en-US' ? 600 : 400, height: '100%', display: 'inline-flex', 'align-items': 'center', background: useLocale() === 'en-US' ? 'var(--sc-color-primary, #1677ff)' : 'transparent', color: useLocale() === 'en-US' ? '#fff' : 'var(--sc-color-text-secondary, #6b7280)', transition: 'all 0.15s' }}>EN</span>
              </span>
            </div>
          }
        />
      </Show>

      {/* iframe 中用占位 div 保持同样的顶部间距 */}
      <Show when={inIframe()}>
        <div style={{ height: 'var(--sc-navbar-height, 46px)', 'flex-shrink': 0 }} />
      </Show>

      {/* Scrollable demo area */}
      <div class={styles.body}>
        {props.children}
      </div>

      {/* Prev / Next — fixed footer below scroll area, hidden in iframe */}
      <Show when={!props.hideNav && (nav().prev || nav().next) && !inIframe()}>
        <div style={{
          display: 'flex', 'justify-content': 'space-between',
          padding: '10px 16px', 'flex-shrink': 0,
          'border-top': '1px solid var(--sc-color-border, #e5e7eb)',
        }}>
          <Show when={nav().prev} fallback={<span />}>
            <span
              onClick={() => navigateTo(nav().prev!.key)}
              style={{
                'font-size': '0.85rem', color: 'var(--sc-color-primary, #1677ff)',
                cursor: 'pointer', display: 'inline-flex', 'align-items': 'center', gap: '4px',
              }}
            >
              <Icon name="arrow-left" size={14} />
              {nav().prev!.name}
            </span>
          </Show>
          <Show when={nav().next}>
            <span
              onClick={() => navigateTo(nav().next!.key)}
              style={{
                'font-size': '0.85rem', color: 'var(--sc-color-primary, #1677ff)',
                cursor: 'pointer', display: 'inline-flex', 'align-items': 'center', gap: '4px',
              }}
            >
              {nav().next!.name}
              <Icon name="arrow-right" size={14} />
            </span>
          </Show>
        </div>
      </Show>

      {/* ══ Bottom Sheet — Props ══ */}
      <Show when={showProps()}>
        <div
          class={styles.overlay}
          classList={{ [styles.overlayVisible!]: true }}
          onClick={() => setShowProps(false)}
        />
        <div class={styles.sheet}>
          <div class={styles.sheetHeader}>
            <span class={styles.sheetTitle}>属性 / Props</span>
            <button class={styles.closeBtn} onClick={() => setShowProps(false)}>✕</button>
          </div>
          <div class={styles.sheetBody}>
            {props.props?.length ? (
              <table class={styles.propsTable}>
                <thead>
                  <tr><th>属性</th><th>说明</th></tr>
                </thead>
                <tbody>
                  {props.props.map((p) => (
                    <tr>
                      <td class={styles.propName}>{p.name}</td>
                      <td class={styles.propDesc}>{t(p.desc) || p.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div class={styles.empty}>暂无属性</div>
            )}
          </div>
        </div>
      </Show>

      <SafeArea position="bottom" />
    </div>
  );
};
