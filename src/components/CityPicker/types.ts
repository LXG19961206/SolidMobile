import type { PickerOption } from '../Picker/types';

export interface CityPickerProps {
  /** 省市区树形数据，用户自行提供 */
  columns: PickerOption[];
  /** 当前选中值（每级一个 value，按级联顺序） */
  value?: (string | number)[];
  /** 值变化回调 */
  onChange?: (value: (string | number)[]) => void;
  /** 确认按钮回调 */
  onConfirm?: (value: (string | number)[]) => void;
  /** 取消按钮回调 */
  onCancel?: () => void;
  /** 无选中值时显示的占位文字 */
  placeholder?: string;
  /** 分隔符，默认 ' / ' */
  separator?: string;

  // ── Sheet 控制 ──
  show?: boolean;
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
  style?: Record<string, string>;
}
