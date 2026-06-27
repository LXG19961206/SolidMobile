import type { JSX } from 'solid-js';

export interface LazyloadProps {
  /** 是否已激活（受控模式，不传则自动检测） */
  active?: boolean;
  /** 占位内容，未激活时显示 */
  placeholder?: JSX.Element;
  /** 激活后的实际内容 */
  children?: JSX.Element;
  /** IntersectionObserver 的 root 元素，默认视口 */
  root?: Element;
  /** rootMargin，默认 '50px'（提前 50px 触发） */
  rootMargin?: string;
  /** 可见比例阈值，默认 0（刚露头就触发） */
  threshold?: number | number[];
  /** 是否只触发一次，默认 true */
  once?: boolean;
  /** 关闭 IntersectionObserver，降级为 scroll 检测 */
  disableObserver?: boolean;
  /** 渲染的标签，默认 'div' */
  as?: string;
  /** 最小高度，占位期间撑住布局防止抖动，内容加载后自动解除 */
  height?: number | string;
  class?: string;
  style?: JSX.CSSProperties | string;
}
