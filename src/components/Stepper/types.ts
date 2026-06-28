export interface StepperProps {
  /** 当前值 */
  value?: number;
  /** 值变化回调 */
  onChange?: (value: number) => void;
  /** 默认值（非受控） */
  defaultValue?: number;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长 */
  step?: number;
  /** 小数位数 */
  decimalLength?: number;
  /** 整体尺寸快捷设置，会覆盖 buttonSize / inputWidth */
  size?: number | string;
  /** 按钮大小 */
  buttonSize?: number | string;
  /** 输入框宽度 */
  inputWidth?: number | string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否禁用输入框 */
  inputDisabled?: boolean;
  /** 是否只允许输入整数 */
  integer?: boolean;
  /** 是否允许空值 */
  allowEmpty?: boolean;
  /** 占位文本 */
  placeholder?: string;
  /** 自定义减号图标/内容 */
  minusIcon?: any;
  /** 自定义加号图标/内容 */
  plusIcon?: any;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式 */
  style?: Record<string, string>;
}
