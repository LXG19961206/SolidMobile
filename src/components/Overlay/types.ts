import type { JSX } from 'solid-js';

export interface OverlayProps {
  /**
   * 是否显示遮罩层。
   * 设为 `true` 时渲染遮罩并锁定背景滚动。
   */
  open: boolean;
  /**
   * 点击遮罩背景时回调。通常用于关闭遮罩。
   * 不设置时点击背景无反应。
   */
  onClose?: () => void;
  /**
   * 自定义 z-index，默认 999。
   */
  zIndex?: number;
  /**
   * 是否锁定 body 滚动，默认 true。
   * 设为 false 时背景仍可滚动。
   */
  lockScroll?: boolean;
  /**
   * Portal 挂载目标节点，默认 `document.body`。
   */
  mount?: Node;
  /**
   * 过渡动画时长（ms），默认 200。
   */
  duration?: number;
  /** 遮罩层内容 */
  children?: JSX.Element;
  /** 自定义 CSS class */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
  /** DOM id */
  id?: string;
}
