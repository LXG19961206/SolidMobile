import type { JSX } from 'solid-js';

/** 内置加载动画类型 */
export type LoadingType = 'spinner' | 'circular' | 'dots';

export interface LoadingProps {
  // ── 内容 ──
  /** 加载文字 */
  text?: string;
  /** 子元素（与 text 二选一，text 优先） */
  children?: JSX.Element;

  // ── 外观 ──
  /**
   * 内置动画类型。
   * - `'spinner'`（默认）：经典的旋转圆环
   * - `'circular'`：实线弧形旋转
   * - `'dots'`：三点闪烁
   */
  type?: LoadingType;
  /** 尺寸。数字自动补 px，默认约 24px */
  size?: string | number;
  /** 动画颜色 */
  color?: string;
  /** 文字颜色 */
  textColor?: string;
  /** 文字与动画是否纵向排列，默认 false（水平） */
  vertical?: boolean;

  // ── 遮罩模式 ──
  /**
   * 是否为全屏遮罩加载。
   * 设为 true 时渲染一个半透明遮罩，并居中显示加载内容。
   */
  overlay?: boolean;
  /**
   * Overlay Portal 挂载目标。文档演示用，业务中无需关心。
   */
  mount?: Node;

  // ── 自定义 ──
  /**
   * 自定义加载图标。设置后将忽略 type 内置动画。
   * 如果需要动画效果，请在传入的 JSX 中自行处理。
   */
  icon?: JSX.Element;

  // ── 其他 ──
  /** 自定义 CSS class */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
  /** DOM id */
  id?: string;
}
