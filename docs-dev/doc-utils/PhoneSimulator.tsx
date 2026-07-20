import { createSignal, onMount, onCleanup, Show } from 'solid-js';
import { cn, scopedStyle } from '../../src/utils';
import { Loading } from '../../src/components/Loading';
import rawStyles from './PhoneSimulator.module.css';
const styles = scopedStyle(rawStyles, 'sc-doc-phone-simulator');

export interface PhoneSimulatorProps {
  children?: any;
  class?: string;
  hideTitle?: boolean;
}

/**
 * 手机模拟器容器 — 通过 iframe 加载移动端 demo 页面。
 * 监听 hashchange 事件，左侧菜单切换时自动刷新 iframe 内容。
 * 切换过程中用同色占位层覆盖 iframe，防止白闪。
 */
export function PhoneSimulator(props: PhoneSimulatorProps) {
  const [hash, setHash] = createSignal('');
  const [loading, setLoading] = createSignal(true);

  onMount(() => {
    setHash(window.location.hash);
    setLoading(true);
    const handler = () => {
      setHash(window.location.hash);
      setLoading(true);
    };
    window.addEventListener('hashchange', handler);
    onCleanup(() => window.removeEventListener('hashchange', handler));
  });

  const src = () => {
    const h = hash();
    if (!h) return 'about:blank';
    const key = h.replace('#/', '').split('?')[0].replace(/^components\//, '');
    if (!key) return 'about:blank';
    const loc = localStorage.getItem('sc-docs-locale') || 'zh-CN';
    const dark = localStorage.getItem('sc-docs-dark-mode') === '1' ? '&dark=1' : '';
    return `./?mobile=${key}&locale=${loc}${dark}`;
  };

  return (
    <div class={cn(styles.frame, props.class)}>
      <div class={styles.screen}>
        <Show when={loading()}>
          <div class={styles.placeholder}>
            <Loading size={32} color="var(--sc-color-primary, #1677ff)" text="Now Loading..." vertical />
          </div>
        </Show>
        <iframe
          src={src()}
          onLoad={() => setLoading(false)}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title="Mobile Preview"
        />
      </div>
    </div>
  );
}
