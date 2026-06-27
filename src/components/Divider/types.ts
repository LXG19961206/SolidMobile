import type { JSX } from 'solid-js';

export interface DividerProps {
  /** 方向，默认 'horizontal' */
  direction?: 'horizontal' | 'vertical';
  /** 中间文字（水平分割线时有效） */
  text?: string;
  /** 虚线样式 */
  dashed?: boolean;
  /** 线条颜色 */
  color?: string;
  /** 线条粗细，数字自动补 px */
  size?: string | number;
  /** 自定义 class */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
}
