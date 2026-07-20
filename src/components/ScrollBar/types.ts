import type { JSX } from 'solid-js';

export interface ScrollBarProps {
  /** 滚动条宽度，默认 6px */
  width?: string | number;
  /** 滑块颜色 */
  color?: string;
  /** 轨道颜色，默认透明 */
  trackColor?: string;
  /** 自定义类名 */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
  /** 内容 */
  children?: JSX.Element;
}
