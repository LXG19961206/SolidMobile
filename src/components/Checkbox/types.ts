import type { JSX } from 'solid-js';

export type CheckboxShape = 'round' | 'square';

export interface CheckboxProps {
  /** 标识符，选中时对应 CheckboxGroup 的 value */
  value: unknown;
  /** 标签文字，支持 JSX */
  label?: string | JSX.Element;
  /** 独立使用时是否选中（受控） */
  checked?: boolean;
  /** 默认选中（非受控） */
  defaultChecked?: boolean;
  /** 半选状态 */
  indeterminate?: boolean;
  /** 选中状态变化回调 */
  onChange?: (checked: boolean) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否禁用标签点击切换 */
  labelDisabled?: boolean;
  /** 标签位置，默认 right */
  labelPosition?: 'left' | 'right';
  /** 图标大小，默认 20px */
  iconSize?: string | number;
  /** 选中态颜色 */
  checkedColor?: string;
  /** 形状，默认 square */
  shape?: CheckboxShape;
  /** 自定义选中图标 */
  checkedIcon?: JSX.Element;
  /** 自定义未选中图标 */
  uncheckedIcon?: JSX.Element;
  /** 自定义半选图标 */
  indeterminateIcon?: JSX.Element;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式 */
  style?: JSX.CSSProperties | string;
  /** 原生 name */
  name?: string;
}

export interface CheckboxGroupProps {
  /** 当前选中值列表 */
  value?: unknown[];
  /** 默认值（非受控） */
  defaultValue?: unknown[];
  /** 值变化回调 */
  onChange?: (value: unknown[]) => void;
  /** 排列方向，默认 vertical */
  direction?: 'vertical' | 'horizontal';
  /** 选项间距，默认 horizontal 为 12px，vertical 为 0 */
  gap?: string | number;
  /** 是否禁用所有选项 */
  disabled?: boolean;
  /** 最大选中数 */
  max?: number;
  /** 最小选中数 */
  min?: number;
  /** 图标大小 */
  iconSize?: string | number;
  /** 选中态颜色 */
  checkedColor?: string;
  /** 形状 */
  shape?: CheckboxShape;
  /** 自定义选中图标 */
  checkedIcon?: JSX.Element;
  /** 自定义未选中图标 */
  uncheckedIcon?: JSX.Element;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式 */
  style?: JSX.CSSProperties | string;
  /** 子元素 */
  children?: JSX.Element;
}
