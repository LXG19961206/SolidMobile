import type { JSX } from 'solid-js';

export interface SwipeAction {
  /** 按钮文字 */
  text: string;
  /** 颜色主题 */
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  /** 自定义背景色，优先级高于 theme */
  color?: string;
  /** 点击回调 */
  onClick?: () => void;
  /** 自定义类名 */
  class?: string;
}

export interface SwipeCellProps {
  /** 右侧滑出按钮 */
  rightActions?: SwipeAction[];
  /** 左侧滑出按钮 */
  leftActions?: SwipeAction[];
  /** 触发打开的滑动阈值(px)，默认 30 */
  threshold?: number;
  /** 按钮区域宽度(px)，默认自适应按钮内容 */
  actionsWidth?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 打开时回调 */
  onOpen?: () => void;
  /** 关闭时回调 */
  onClose?: () => void;
  /** 内容 */
  children: JSX.Element;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式 */
  style?: JSX.CSSProperties | string;
}
