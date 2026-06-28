import type { JSX } from 'solid-js';

export type RadioShape = 'round' | 'square' | 'dot';

export interface RadioProps {
  /** 标识符，选中时对应 RadioGroup 的 value */
  value: unknown;
  /** 独立使用时是否选中（受控） */
  checked?: boolean;
  /** 选中状态变化回调 */
  onChange?: (checked: boolean) => void;
  /** 标签文字，支持 JSX */
  label?: string | JSX.Element;
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
  /** 形状 */
  shape?: RadioShape;
  /** 自定义选中图标 */
  checkedIcon?: JSX.Element;
  /** 自定义未选中图标 */
  uncheckedIcon?: JSX.Element;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式 */
  style?: JSX.CSSProperties | string;
  /** 原生 name */
  name?: string;
}

export interface RadioGroupProps {
  /** 当前选中值 */
  value?: unknown;
  /** 默认值（非受控） */
  defaultValue?: unknown;
  /** 值变化回调 */
  onChange?: (value: unknown) => void;
  /** 排列方向，默认 vertical */
  direction?: 'vertical' | 'horizontal';
  /** 选项间距，默认 horizontal 为 12px，vertical 为 0 */
  gap?: string | number;
  /** 是否禁用所有单选项 */
  disabled?: boolean;
  /** 图标大小 */
  iconSize?: string | number;
  /** 选中态颜色 */
  checkedColor?: string;
  /** 形状 */
  shape?: RadioShape;
  /** 自定义选中图标 */
  checkedIcon?: JSX.Element;
  /** 自定义未选中图标 */
  uncheckedIcon?: JSX.Element;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式 */
  style?: JSX.CSSProperties | string;
  /** 子元素（Radio 组件） */
  children?: JSX.Element;
}
