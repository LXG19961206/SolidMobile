import type { JSX } from 'solid-js';

export interface CenterProps {
  // ── 居中方式 ──
  /** Flexbox 水平居中（justify-content: center） */
  flexX?: boolean;
  /** Flexbox 垂直居中（align-items: center），父级需有高度 */
  flexY?: boolean;
  /** text-align: center，适合行内 / 行内块内容 */
  text?: boolean;
  /** vertical-align: middle，适合行内元素 */
  vertical?: boolean;
  /** absolute + transform 居中，父级需设置 position: relative */
  position?: boolean;

  // ── 其他 ──
  /** 行内模式（flex → inline-flex） */
  inline?: boolean;
  /** 渲染的 HTML 标签，默认 'div' */
  as?: string;
  /** 自定义 CSS class */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
  /** 内容 */
  children?: JSX.Element;
}
