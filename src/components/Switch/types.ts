import type { JSX } from 'solid-js';

export interface SwitchProps {
  // ── 状态 ──
  /** 是否打开（受控）。`value` 为别名，二选一即可。 */
  checked?: boolean;
  /** `checked` 的别名 */
  value?: boolean;
  /** 默认是否打开（非受控） */
  defaultChecked?: boolean;
  /** 状态变化回调 */
  onChange?: (checked: boolean) => void;

  // ── 外观 ──
  /** 是否禁用 */
  disabled?: boolean;
  /**
   * 尺寸。数字自动补 px，默认约 28px 高。
   * @default 28
   */
  size?: string | number;
  /** 打开时的背景色 */
  activeColor?: string;
  /** 关闭时的背景色 */
  inactiveColor?: string;
  /** 打开时显示的文案 */
  activeText?: string;
  /** 关闭时显示的文案 */
  inactiveText?: string;

  // ── 其他 ──
  /** 自定义 CSS class */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
  /** DOM id */
  id?: string;
  /** 自定义 data-* 属性 */
  [key: `data-${string}`]: string | undefined;
}
