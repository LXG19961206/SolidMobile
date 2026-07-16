import type { JSX } from 'solid-js';
import type { FloatingBallInset } from '../FloatingBall';

export interface BackTopProps {
  /** 滚动超过此距离（px）才显示，默认 200 */
  threshold?: number;
  /** 监听滚动的元素。不传时自动向上查找最近的可滚动祖先，找不到则 fallback 到 window */
  target?: HTMLElement;
  /** 自定义 CSS class */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
  /** 自定义内容，默认 ↑ 图标 */
  children?: JSX.Element;
  /** 透传给 FloatingBall：inset, zIndex, draggable 等 */
  [key: string]: any;
}
