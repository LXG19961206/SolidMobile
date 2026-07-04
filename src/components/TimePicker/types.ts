import type { JSX } from 'solid-js';

export interface TimePickerProps {
  /** 当前选中时间，格式 "HH:mm:ss"（如 "08:30:15"） */
  value?: string;
  /** 时间变化回调（滚动停止后触发） */
  onChange?: (value: string) => void;
  /** 点击确认按钮 */
  onConfirm?: (value: string) => void;
  /** 点击取消按钮 */
  onCancel?: () => void;

  /** 是否显示选择面板 */
  show?: boolean;
  /** 面板关闭回调 */
  onUpdateShow?: (show: boolean) => void;

  /** 占位文本 */
  placeholder?: string;
  /** 面板标题 */
  title?: string;
  /** 取消按钮文字 */
  cancelText?: string;
  /** 确认按钮文字 */
  confirmText?: string;

  /** 可见行数（奇数），默认 7 */
  visibleItemCount?: number;
  /** 每行高度(px)，默认从 CSS 变量读取 */
  optionHeight?: number;
  /** Portal 挂载目标 */
  teleport?: string | Element;
  /** z-index */
  zIndex?: number | string;

  class?: string;
  style?: JSX.CSSProperties | string;
}
