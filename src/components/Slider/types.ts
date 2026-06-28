export interface SliderProps {
  /** 当前值。count=1 时为 number，count>1 时为 number[] */
  value?: number | number[];
  /** 值变化回调 */
  onChange?: (value: number | number[]) => void;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长 */
  step?: number;
  /** 滑块数量，默认 1。count=2 为双滑块，以此类推 */
  count?: number;
  /** 进度条高度 */
  barHeight?: number | string;
  /** 滑块按钮大小 */
  buttonSize?: number | string;
  /** 进度条激活态颜色 */
  activeColor?: string;
  /** 进度条非激活态颜色 */
  inactiveColor?: string;
  /** 是否反转 */
  reverse?: boolean;
  /** 禁用 */
  disabled?: boolean;
  /** 只读 */
  readonly?: boolean;
  /** 自定义滑块按钮渲染，接收当前值和索引，返回 JSX/字符串 或 null（使用默认样式） */
  thumbRender?: (value: number, index: number) => any;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式 */
  style?: Record<string, string>;
}
