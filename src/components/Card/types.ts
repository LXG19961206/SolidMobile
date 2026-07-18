import type { JSX } from 'solid-js';

export interface CardProps {
  /** 卡片标题 */
  title?: string;
  /** 次要描述 */
  subtitle?: string;
  /** 是否显示阴影，默认 true */
  shadow?: boolean;
  /** 是否显示边框，默认 true */
  border?: boolean;
  /** 沉浸模式：去掉内边距、圆角、边框、阴影，占满容器，默认 false */
  inset?: boolean;
  /** 内边距，默认 16px。inset 模式下忽略 */
  padding?: string | number;
  /** 自定义 CSS class */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
  /** 内容 */
  children?: JSX.Element;
}
