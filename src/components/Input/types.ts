import type { JSX } from 'solid-js';

export type InputType = 'text' | 'number' | 'password' | 'tel' | 'email' | 'url';
export type InputAlign = 'left' | 'center' | 'right';

export interface InputProps {
  /** 输入类型，默认 'text' */
  type?: InputType;
  /** 当前值 */
  value?: string | number;
  /** 值变化回调 */
  onChange?: (value: string) => void;
  /** 默认值（非受控） */
  defaultValue?: string;
  /** 占位文本 */
  placeholder?: string;
  /** 最大长度 */
  maxlength?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 文字对齐 */
  align?: InputAlign;
  /** 可清除 */
  clearable?: boolean;
  /** type=password 时显示密码可见切换按钮 */
  showPasswordToggle?: boolean;
  /** 左侧图标或文本 */
  prefix?: JSX.Element;
  /** 右侧图标或文本 */
  suffix?: JSX.Element;
  /** 输入框高度（如 '48px'），默认跟随 Cell/FormItem */
  height?: string;
  /** 是否显示字数统计（需配合 maxlength） */
  showCount?: boolean;
  /** 失焦回调，和原生 input 一致，入参为 Event */
  onBlur?: (e: Event) => void;
  /** 聚焦回调 */
  onFocus?: (e: Event) => void;
  /** 回车回调 */
  onEnter?: (e: KeyboardEvent) => void;
  /** 清除回调 */
  onClear?: () => void;
  /** 是否为错误状态，设置后底部出现红色指示 */
  error?: boolean;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式 */
  style?: JSX.CSSProperties | string;
  /** DOM id */
  id?: string;
  /** 原生 input 的 name 属性 */
  name?: string;
  /** 自动聚焦 */
  autofocus?: boolean;
}
