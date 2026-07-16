import { Show, createSignal, createEffect, onCleanup } from 'solid-js';
import { cn, scopedStyle } from '../../src/utils';
import rawStyles from './PhoneSimulator.module.css';
const styles = scopedStyle(rawStyles, 'sc-doc-phone-simulator');

const LOCALE_KEY = 'sc-docs-locale';
const DARK_KEY = 'sc-docs-dark-mode';

function getLocale(): string {
  try { return localStorage.getItem(LOCALE_KEY) || 'zh-CN'; } catch { return 'zh-CN'; }
}
function getDark(): boolean {
  try { return localStorage.getItem(DARK_KEY) === '1'; } catch { return false; }
}

export interface PhoneSimulatorProps {
  children?: any;
  class?: string;
  hideTitle?: boolean;
}

/**
 * 手机模拟器容器 — 通过 iframe 加载移动端 demo 页面。
 * locale 或 dark 变化时自动刷新 iframe（轮询 localStorage）。
 */
export function PhoneSimulator(props: PhoneSimulatorProps) {
  let iframeRef!: HTMLIFrameElement;
  const [version, setVersion] = createSignal(0);

  let lastLocale = getLocale();
  let lastDark = getDark();

  // 每 500ms 检查 locale / dark 变化 → 刷新 iframe
  if (typeof window !== 'undefined') {
    const timer = setInterval(() => {
      const nl = getLocale();
      const nd = getDark();
      if (nl !== lastLocale || nd !== lastDark) {
        lastLocale = nl;
        lastDark = nd;
        setVersion(v => v + 1);
      }
    }, 500);
    onCleanup(() => clearInterval(timer));
  }

  // version 变化时刷新 iframe
  createEffect(() => {
    version(); // 追踪
    if (iframeRef) {
      iframeRef.contentWindow?.location.reload();
    }
  });

  const getKey = () => {
    if (typeof window === 'undefined') return '';
    const hash = window.location.hash.replace('#/', '').split('?')[0];
    return hash.replace(/^components\//, '');
  };

  const src = () => {
    const key = getKey();
    if (!key) return 'about:blank';
    return `/#mobile/${key}?locale=${lastLocale}`;
  };

  return (
    <div class={cn(styles.frame, props.class)}>
      <div class={styles.screen}>
        <iframe
          ref={iframeRef!}
          src={src()}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            background: '#f7f8fa',
          }}
          title="Mobile Preview"
        />
      </div>
    </div>
  );
}
