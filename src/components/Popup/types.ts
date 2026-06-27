import type { JSX } from 'solid-js';

export interface PopupProps {
  /** 是否显示 */
  show: boolean;
  /** 关闭回调 */
  onUpdateShow?: (show: boolean) => void;
  /** 标题，不传则隐藏 header */
  title?: string | JSX.Element;
  /** 显示关闭按钮 */
  closeable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 顶部圆角 */
  round?: boolean;
  /** 最大高度，默认 '60vh' */
  maxHeight?: number | string;
  /** Portal 挂载目标 */
  teleport?: string | Element;
  /** z-index，默认 2000 */
  zIndex?: number | string;
  /** 锁定背景滚动 */
  lockScroll?: boolean;
  /** 点击遮罩关闭 */
  closeOnClickOverlay?: boolean;
  children?: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties | string;
}
