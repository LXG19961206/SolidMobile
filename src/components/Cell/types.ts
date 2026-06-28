import type { JSX } from 'solid-js';

export type CellSize = 'sm' | 'md' | 'lg';

export interface CellProps {
  // ── 内容 ──
  /** 左侧标题，支持 JSX */
  title?: string | JSX.Element;
  /** 右侧内容，支持 JSX */
  value?: string | JSX.Element;
  /** 标题下方描述 */
  description?: string;
  /** 自定义内容（设置后 title / value / description 被忽略） */
  children?: JSX.Element;

  // ── 外观 ──
  /** 左侧图标。支持字符串（内置图标名）或 JSX */
  icon?: import('../Icon/types').IconName | JSX.Element;
  /** 尺寸，默认 'md' */
  size?: CellSize;
  /** 是否显示必填星号 */
  required?: boolean;
  /** 内容垂直居中 */
  center?: boolean;
  /** 去除左右内边距，占满整行 */
  flush?: boolean;

  // ── 交互 ──
  /** 是否可点击，默认 false。设为 true 时右侧显示箭头。 */
  clickable?: boolean;
  /** 点击回调 */
  onClick?: () => void;

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

export interface CellGroupProps {
  // ── 内容 ──
  /** 分组标题 */
  title?: string;
  children?: JSX.Element;

  // ── 外观 ──
  /** 卡片模式（圆角 + 背景色），默认 false */
  card?: boolean;
  /** 是否显示单元格边框，默认 true */
  border?: boolean;

  // ── 其他 ──
  /** 自定义 CSS class */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
}
