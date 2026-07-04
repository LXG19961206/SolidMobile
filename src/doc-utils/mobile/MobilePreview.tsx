import { createSignal, createMemo, Show, type Component } from 'solid-js';
import { NavBar } from '../../components/NavBar';
import { SafeArea } from '../../components/SafeArea';
import { Icon } from '../../components/Icon';
import { useLocale, setGlobalLocale, useT } from '../../i18n';
import { useDrawer } from './DrawerContext';
import { docThemeColor, persistThemeColor } from '../doc-theme';
import { ThemeColorPicker } from '../ThemeColorPicker';
import styles from './MobilePreview.module.css';

const DARK_KEY = 'sc-docs-dark-mode';
let i18nNoticeShown = false;

function getDark(): boolean {
  return document.documentElement.classList.contains('dark');
}

async function showI18nNotice() {
  if (i18nNoticeShown) return;
  i18nNoticeShown = true;
  const { DialogAPI } = await import('../../components/Dialog/DialogManager');
  setTimeout(() => {
    DialogAPI.confirm({
      title: '🌐 国际化提示 / i18n Notice',
      message: '国际化仅覆盖少量组件，第一批稳定后逐步完善。\n\ni18n covers few components now, will improve after first batch.',
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
  /** 属性列表 */
  props?: { name: string; type: string; desc: string }[];
  /** @deprecated 组件列表，由 App 层抽屉统一管理，此处不再使用 */
  components?: ComponentEntry[];
  /** @deprecated 导航回调，由 App 层抽屉统一管理，此处不再使用 */
  onNavigate?: (key: string) => void;
  /** 打开抽屉回调（由 App 层注入） */
  onOpenDrawer?: () => void;
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
    try { localStorage.setItem(DARK_KEY, next ? '1' : '0'); } catch {}
    setIsDark(next);
  };

  /* ── Prev / Next navigation ── */
  const nav = createMemo(() => {
    const list = props.components || [];
    const idx = list.findIndex(c => c.name === props.title);
    const prev = idx > 0 ? list[idx - 1] : null;
    const next = idx < list.length - 1 ? list[idx + 1] : null;
    return { prev, next };
  });

  const navigateTo = (key: string) => {
    // 优先用 props.onNavigate（页面传递的），否则用抽屉导航
    props.onNavigate?.(key);
  };

  return (
    <div class={styles.shell}>
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
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '2px' }}>
            <span class={styles.navBtn} onClick={() => { showI18nNotice(); setGlobalLocale(useLocale() === 'zh-CN' ? 'en-US' : 'zh-CN'); }} title="Switch locale">
              <span style={{ 'font-size': '0.75rem', 'font-weight': 600 }}>{useLocale() === 'zh-CN' ? 'EN' : '中'}</span>
            </span>
            <span class={styles.navBtn} onClick={toggleDark} title="Toggle dark mode">
              <Icon name={isDark() ? 'sun' : 'moon'} size={18} />
            </span>
            <span class={styles.navBtn} onClick={() => setShowProps(!showProps())}>
              <Icon name="information" size={18} />
            </span>
            <ThemeColorPicker color={docThemeColor()} onChange={(c) => persistThemeColor(c)} />
          </div>
        }
      />

      {/* Scrollable demo area */}
      <div class={styles.body}>
        {props.children}
      </div>

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

      {/* Prev / Next floating buttons */}
      <Show when={nav().prev || nav().next}>
        <div class={styles.navFloat}>
          <Show when={nav().prev}>
            <button class={styles.navFloatBtn} onClick={() => navigateTo(nav().prev!.key)}>
              <span class={styles.navFloatLabel}>Prev</span>
              <Icon name="arrow-up" size={16} />
            </button>
          </Show>
          <Show when={nav().next}>
            <button class={styles.navFloatBtn} onClick={() => navigateTo(nav().next!.key)}>
              <Icon name="arrow-down" size={16} />
              <span class={styles.navFloatLabel}>Next</span>
            </button>
          </Show>
        </div>
      </Show>

      <SafeArea position="bottom" />
    </div>
  );
};
