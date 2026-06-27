import type { JSX } from 'solid-js';

export interface PickerOption {
  /** 显示文本 */
  text: string | number;
  /** 值 */
  value: string | number;
  /** 子选项（tree 模式时用于级联） */
  children?: PickerOption[];
  /** 是否禁用该选项 */
  disabled?: boolean;
  /** 自定义类名，附加到选项元素上 */
  className?: string;
  /** 自定义渲染，传入时替代 text 显示 */
  render?: JSX.Element;
}

export interface PickerProps {
  /**
   * 数据源。支持两种模式：
   * - Tree 级联：`PickerOption[]`，每项的 `children` 会成为下一列的数据
   * - Flat 多列：`PickerOption[][]`，每个子数组是一列，列之间独立滚动
   */
  columns: PickerOption[] | PickerOption[][];

  // ── 受控值 ──
  /** 当前选中值（每列一个，按列顺序排列） */
  value?: (string | number)[];
  /** 值变化回调（每次滚动停止后触发） */
  onChange?: (selected: PickerOption[], value: (string | number)[]) => void;

  // ── 事件 ──
  /** 点击确认按钮 */
  onConfirm?: (selected: PickerOption[], value: (string | number)[]) => void;
  /** 点击取消按钮 */
  onCancel?: () => void;

  // ── Sheet 控制 ──
  /** 是否显示选择器面板 */
  show?: boolean;
  /** 面板关闭回调 */
  onUpdateShow?: (show: boolean) => void;
  /** 标题 */
  title?: string;
  /** Portal 挂载目标 */
  teleport?: string | Element;
  /** z-index */
  zIndex?: number | string;

  // ── 外观 ──
  /** 可见行数（必须为奇数），默认 7 */
  visibleItemCount?: number;
  /** 每行高度(px)，默认从 CSS 变量 --sc-picker-item-height 读取，fallback 50 */
  optionHeight?: number;

  // ── 滚动物理 ──
  /** 触摸滑动灵敏度倍率，默认 1.5 */
  ratio?: number;
  /** 惯性动画时长(秒)，默认 1 */
  swipeDuration?: number;

  // ── i18n ──
  /** 取消按钮文字（不传则跟随 locale） */
  cancelText?: string;
  /** 确认按钮文字（不传则跟随 locale） */
  confirmText?: string;

  // ── 占位 ──
  /**
   * 占位选项文本。每个字符串对应一列（tree 模式下对应每一层深度）。
   * 占位选项的 value 为空字符串，用于表示"未选择"状态。
   */
  placeholders?: string | string[];

  // ── 样式 ──
  class?: string;
  style?: JSX.CSSProperties | string;
}
