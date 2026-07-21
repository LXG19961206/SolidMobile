import type { JSX } from 'solid-js';

export type ScrollDirection = 'vertical' | 'horizontal' | 'both';

export interface ScrollBarProps {
  /** 滚动条宽度，默认 6px */
  width?: string | number;
  /** 滑块颜色 */
  color?: string;
  /** 轨道颜色，默认透明 */
  trackColor?: string;
  /** 滚动方向，默认 vertical */
  direction?: ScrollDirection;
  /** 容器高度，直接传给子元素 */
  height?: string | number;
  /** 内容（第一个子元素会被注入滚动条 class + overflow + height 样式） */
  children?: JSX.Element;
}
