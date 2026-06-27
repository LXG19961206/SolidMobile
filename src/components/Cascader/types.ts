import type { JSX } from 'solid-js';

export interface CascaderOption {
  /** 显示文本 */
  text: string;
  /** 值 */
  value: string | number;
  /** 子选项 */
  children?: CascaderOption[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为叶子节点（最后一级），为 true 时不再触发异步加载 */
  isLeaf?: boolean;
  /** 自定义渲染内容，传入时替代 text 显示 */
  render?: JSX.Element;
}

export interface CascaderProps {
  /** 级联数据源 */
  options: CascaderOption[];
  /** 当前选中值 */
  value?: (string | number)[];
  /** 值变化回调 */
  onChange?: (value: (string | number)[]) => void;
  /** 标题 */
  title?: string | JSX.Element;
  /** 未选中时的占位文字 */
  placeholder?: string;
  /** 是否显示关闭按钮 */
  closeable?: boolean;
  /** 是否显示（受控） */
  show?: boolean;
  /** 关闭回调（受控） */
  onUpdateShow?: (show: boolean) => void;
  /** 关闭回调 */
  onClose?: () => void;
  /** 弹窗最大高度，默认 '50vh' */
  maxHeight?: number | string;
  /** 是否在选中项右侧显示对勾图标，默认 true */
  showCheckmark?: boolean;
  /** 自定义选中图标，传入时替代默认 ✓ */
  checkmark?: JSX.Element;
  /** Portal 挂载目标 */
  teleport?: string | Element;
  /** z-index */
  zIndex?: number | string;

  // ── Form integration ──
  /** 表单字段名 */
  name?: string;
  /** 是否必填 */
  required?: boolean;
  /** 是否禁用整个选择器 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 异步加载子选项，(option) => Promise<CascaderOption[]> */
  onLoadChildren?: (option: CascaderOption) => Promise<CascaderOption[]>;
  /** 异步加载时的占位内容，默认 <Loading /> */
  loading?: JSX.Element;
  /** 聚焦回调 */
  onFocus?: () => void;
  /** 失焦回调 */
  onBlur?: () => void;

  /** 自定义类名 */
  class?: string;
  /** 自定义样式 */
  style?: JSX.CSSProperties | string;
}
