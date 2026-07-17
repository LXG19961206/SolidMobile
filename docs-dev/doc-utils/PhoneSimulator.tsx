import { cn, scopedStyle } from '../../src/utils';
import rawStyles from './PhoneSimulator.module.css';
const styles = scopedStyle(rawStyles, 'sc-doc-phone-simulator');

export interface PhoneSimulatorProps {
  children?: any;
  class?: string;
  hideTitle?: boolean;
}

/**
 * 手机模拟器容器 — 通过 iframe 加载移动端 demo 页面。
 * 语言/主题/暗色变化由 App.tsx 直接刷新 iframe。
 */
export function PhoneSimulator(props: PhoneSimulatorProps) {
  const getKey = () => {
    if (typeof window === 'undefined') return '';
    const hash = window.location.hash.replace('#/', '').split('?')[0];
    return hash.replace(/^components\//, '');
  };

  const src = () => {
    const key = getKey();
    if (!key) return 'about:blank';
    return `/?mobile=${key}`;
  };

  return (
    <div class={cn(styles.frame, props.class)}>
      <div class={styles.screen}>
        <iframe
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
