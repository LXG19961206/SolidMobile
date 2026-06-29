export interface SelectProps {
  /** 选项列表 */
  options: { text: string; value: string | number }[];
  /** 当前选中值 */
  value?: string | number;
  /** 值变化回调 */
  onChange?: (value: string | number) => void;
  /** 确认回调 */
  onConfirm?: (value: string | number) => void;
  /** 面板标题 */
  title?: string;
  /** 无选中时显示的文字 */
  placeholder?: string;
  /** 取消按钮回调 */
  onCancel?: () => void;

  // ── Sheet 控制 ──
  show?: boolean;
  onUpdateShow?: (show: boolean) => void;

  // ── 外观 ──
  cancelText?: string;
  confirmText?: string;
  visibleItemCount?: number;
  optionHeight?: number;
  teleport?: string | Element;
  zIndex?: number | string;

  class?: string;
  style?: Record<string, string>;
}
