import type { JSX } from 'solid-js';

export interface MarqueeProps {
  /** 滚动速度：完整循环的秒数，默认 10s */
  duration?: number;
  /** 滚动方向，默认 left */
  direction?: 'left' | 'right';
  /** 悬停时暂停，默认 true */
  pauseOnHover?: boolean;
  /** 内容间距，默认跟随 children 自身间距 */
  gap?: string | number;
  /** 自定义类名 */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
  /** 内容 */
  children?: JSX.Element;
}
