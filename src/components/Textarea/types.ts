import type { JSX } from 'solid-js';

export interface TextareaProps {
  /** 当前值 */
  value?: string;
  /** 值变化回调 */
  onChange?: (value: string) => void;
  /** 默认值（非受控） */
  defaultValue?: string;
  /** 占位文本 */
  placeholder?: string;
  /** 最大长度 */
  maxlength?: number;
  /** 可视行数，默认 3 */
  rows?: number;
  /** 自动撑高，可传入 { minRows, maxRows } 限制范围 */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 可清除，输入内容后右侧出现 X 按钮 */
  clearable?: boolean;
  /** 显示字数统计 */
  showCount?: boolean;
  /** 错误状态 */
  error?: boolean;
  /** 自定义高度 */
  height?: string;
  /** 失焦回调 */
  onBlur?: (e: Event) => void;
  /** 聚焦回调 */
  onFocus?: (e: Event) => void;
  /** 回车回调 */
  onEnter?: (e: KeyboardEvent) => void;
  /** 清除回调 */
  onClear?: () => void;
  /** 自动聚焦 */
  autofocus?: boolean;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式 */
  style?: JSX.CSSProperties | string;
  /** DOM id */
  id?: string;
  /** 原生 name */
  name?: string;
}
