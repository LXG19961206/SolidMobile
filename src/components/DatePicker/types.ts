import type { JSX } from 'solid-js';

export type DatePickerType = 'date' | 'year-month';

export interface DatePickerProps {
  /** 当前值，格式 YYYY-MM-DD 或 YYYY-MM */
  value?: string;
  /** 值变化回调 */
  onChange?: (value: string) => void;
  /** 确认按钮点击回调 */
  onConfirm?: (value: string) => void;
  /** 取消按钮点击回调 */
  onCancel?: () => void;

  // ── 范围与类型 ──
  /** 可选日期范围起点，默认 '2014-01-01' */
  startDate?: string;
  /** 可选日期范围终点，默认 '2034-12-31' */
  endDate?: string;
  /** 选择类型，默认 'date'（年月日） */
  type?: DatePickerType;
  /** 无选中值时显示的占位文字 */
  placeholder?: string;
  /** 禁用特定日期。接收 (year, month, day) 三个数字，返回 true 表示该日不可选。 */
  disabledDate?: (year: number, month: number, day: number) => boolean;

  // ── Sheet 控制 ──
  /** 是否显示选择器面板。不传时 DatePicker 自行管理。 */
  show?: boolean;
  /** 面板开关回调 */
  onUpdateShow?: (show: boolean) => void;

  // ── 外观 ──
  title?: string;
  cancelText?: string;
  confirmText?: string;
  visibleItemCount?: number;
  optionHeight?: number;
  teleport?: string | Element;
  zIndex?: number | string;

  // ── 样式 ──
  class?: string;
  style?: JSX.CSSProperties | string;
}
