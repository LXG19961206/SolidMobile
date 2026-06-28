export interface RateProps {
  /** 当前分值 */
  value?: number;
  /** 分值变化回调 */
  onChange?: (value: number) => void;
  /** 图标总数 */
  count?: number | string;
  /** 图标大小，默认 px */
  size?: number | string;
  /** 图标间距，默认 px */
  gutter?: number | string;
  /** 选中时颜色 */
  color?: string;
  /** 未选中时颜色 */
  voidColor?: string;
  /** 禁用时颜色 */
  disabledColor?: string;
  /** 选中时的图标名（对应 Icon 组件的 name） */
  icon?: string;
  /** 未选中时的图标名 */
  voidIcon?: string;
  /** 是否允许半选 */
  allowHalf?: boolean;
  /** 是否允许再次点击后清除 */
  clearable?: boolean;
  /** 只读 */
  readonly?: boolean;
  /** 禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式 */
  style?: Record<string, string>;
}
