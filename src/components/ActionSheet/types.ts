import type { JSX } from 'solid-js';

/** ActionSheet 选项项 */
export interface ActionSheetItem {
  /** 选项标题 */
  name: string;
  /** 副标题（可选），显示在主标题下方 */
  subname?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示加载中 */
  loading?: boolean;
}

export interface ActionSheetProps {
  /** 是否显示 */
  open: boolean;
  /** 关闭回调（点击遮罩、取消按钮、关闭图标、Escape 键时触发） */
  onClose: () => void;

  // ── 内容 ──
  /**
   * 选项列表。与 `children` 互斥 —— `children` 优先。
   * 每个选项包含 name、可选的 subname、disabled、loading。
   */
  items?: ActionSheetItem[];
  /** 自定义内容。设置后 items 和 cancelText 均被忽略。 */
  children?: JSX.Element;

  // ── 头部 ──
  /** 标题文字，不设置则不显示标题栏 */
  title?: string;
  /** 是否显示关闭图标（✕），默认 false */
  closeable?: boolean;

  // ── 描述 ──
  /** 描述文字，显示在标题下方、选项上方 */
  description?: string;

  // ── 取消按钮 ──
  /** 取消按钮文字，不设置则不显示 */
  cancelText?: string;
  /** 点击取消按钮的回调。默认触发 onClose */
  onCancel?: () => void;

  // ── 行为 ──
  /** 选中选项后是否自动关闭，默认 true */
  closeOnSelect?: boolean;
  /** 点击遮罩层是否关闭，默认 true */
  closeOnOverlayClick?: boolean;

  // ── 外观 ──
  /** 顶部是否圆角，默认 true */
  round?: boolean;
  /** 自定义 z-index */
  zIndex?: number;
  /** 是否锁定背景滚动，默认 true */
  lockScroll?: boolean;
  /**
   * Overlay Portal 挂载目标。文档演示用，业务中无需关心。
   */
  mount?: Node;

  // ── 事件 ──
  /** 选项选中回调 */
  onSelect?: (item: ActionSheetItem, index: number) => void;

  // ── 其他 ──
  /** 自定义 CSS class */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
  /** DOM id */
  id?: string;
}
