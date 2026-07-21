import type { JSX } from 'solid-js';

export interface ScrollBarProps {
  /** 滚动条宽度，默认 6px */
  width?: string | number;
  /** 滑块颜色 */
  color?: string;
  /** 轨道颜色，默认透明 */
  trackColor?: string;
  /** 自定义类名（已废弃，ScrollBar 不产生 DOM） */
  class?: string;
  /** 内联样式（已废弃，应写在子元素上） */
  style?: JSX.CSSProperties | string;
  /** 内容（第一个子元素会被注入滚动条 class） */
  children?: JSX.Element;
}
