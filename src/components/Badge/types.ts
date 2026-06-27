import type { JSX } from 'solid-js';

export interface BadgeProps {
  /** 徽标内容：数字时显示数字，字符串时显示文字 */
  content?: string | number;
  /** 只显示小红点（忽略 content） */
  dot?: boolean;
  /** 数字上限，超出显示 "max+"，如 99 → "99+" */
  max?: number;
  /** 位置，默认 'top-right' */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /** 自定义背景色 */
  color?: string;
  /** 包裹的元素 */
  children?: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties | string;
}
