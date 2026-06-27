import type { JSX } from 'solid-js';

export interface DialogOptions {
  /** 标题 */
  title?: string | JSX.Element;
  /** 内容，支持 string（\n 换行）或 JSX */
  message?: string | JSX.Element;
  /** 弹窗宽度，默认 '320px' */
  width?: number | string;
  /** 内容水平对齐，默认 'center' */
  messageAlign?: 'left' | 'center' | 'right';
  /** 是否展示确认按钮，默认 true */
  showConfirmButton?: boolean;
  /** 是否展示取消按钮，默认 false */
  showCancelButton?: boolean;
  /** 确认按钮文案，默认 '确认' */
  confirmText?: string | JSX.Element;
  /** 取消按钮文案，默认 '取消' */
  cancelText?: string | JSX.Element;
  /** 是否禁用确认按钮 */
  confirmDisabled?: boolean;
  /** 是否禁用取消按钮 */
  cancelDisabled?: boolean;
  /** z-index，默认 2000 */
  zIndex?: number | string;
  /** 是否展示遮罩，默认 true */
  overlay?: boolean;
  /** 点击遮罩是否关闭，默认 false */
  closeOnClickOverlay?: boolean;
  /** 是否锁定背景滚动，默认 true */
  lockScroll?: boolean;
  /** 关闭前回调，action 为 'confirm' | 'cancel' | 'overlay'。返回 false 阻止关闭 */
  beforeClose?: (action: string) => boolean | Promise<boolean>;
  /** 关闭时销毁内容，默认 false */
  destroyOnClose?: boolean;
  /** 懒渲染，默认 true */
  lazyRender?: boolean;
  /** Portal 挂载目标 */
  teleport?: string | Element;
  /** 确认回调 */
  onConfirm?: () => void | Promise<void>;
  /** 取消回调 */
  onCancel?: () => void;
  /** 关闭回调 */
  onClose?: () => void;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式 */
  style?: JSX.CSSProperties | string;
}

export interface DialogProps extends DialogOptions {
  /** 是否显示（受控） */
  show: boolean;
  /** 关闭事件（受控模式） */
  onUpdateShow?: (show: boolean) => void;
}

export interface DialogHandle {
  dismiss: () => void;
}
