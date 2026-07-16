import type { JSX } from 'solid-js';

export interface FloatingBallInset {
  /** 距视口左边的距离（px）。与 right 二选一 */
  left?: number;
  /** 距视口右边的距离（px），默认 16。left 存在时忽略 */
  right?: number;
  /** 距视口顶边的距离（px）。与 bottom 二选一 */
  top?: number;
  /** 距视口底边的距离（px），默认 24。top 存在时忽略 */
  bottom?: number;
}

export interface FloatingBallProps {
  /**
   * 初始位置，距视口边缘的距离。
   * 如 `{ right: 16, bottom: 24 }` 表示距右边 16px、距底部 24px。
   */
  inset?: FloatingBallInset;
  /** 是否可拖动，默认 true */
  draggable?: boolean;
  /** 松手时自动吸附到最近边缘，默认 true */
  snapToEdge?: boolean;
  /** 层级，默认 999 */
  zIndex?: number;
  /** 自定义 CSS class */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
  /** 悬浮球内容（图标、按钮等） */
  children?: JSX.Element;
}
