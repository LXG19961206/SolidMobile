import { Show } from 'solid-js';
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
 * 不再使用 translateZ(0) + Portal 黑魔法，fixed 定位在 iframe 中天生正确。
 */
export function PhoneSimulator(props: PhoneSimulatorProps) {
  // 从当前 URL 中提取组件 key，拼出移动端 demo 路径
  const getHash = () => {
    if (typeof window === 'undefined') return '';
    const hash = window.location.hash.replace('#/', '').split('?')[0];
    return hash;
  };

  const src = () => {
    const key = getHash();
    if (!key) return 'about:blank';
    return `/#mobile/${key}`;
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
