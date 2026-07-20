import type { JSX } from 'solid-js';

export interface ScrollBarProps {
  /** 滚动条宽度，默认 6px */
  width?: string | number;
  /** 滑块颜色 */
  color?: string;
  /** 轨道颜色，默认透明 */
  trackColor?: string;
  /** 原生模式：只注入滚动条 CSS 变量和样式，不设置 overflow:auto。
   * 用于子元素自己管理滚动的场景（如 List 虚拟列表）。 */
  native?: boolean;
  /** 自定义类名 */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
  /** 内容 */
  children?: JSX.Element;
}
