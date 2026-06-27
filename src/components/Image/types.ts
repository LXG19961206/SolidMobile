import type { JSX } from 'solid-js';

export type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

export interface ImageProps {
  /** 图片地址 */
  src: string;
  /** 替代文本 */
  alt?: string;
  /** 宽度 */
  width?: string | number;
  /** 高度 */
  height?: string | number;
  /** 填充方式，默认 'fill' */
  fit?: ImageFit;
  /** object-position */
  position?: string;
  /** 圆角大小 */
  radius?: string | number;
  /** 圆形 */
  round?: boolean;
  /** 块级元素 */
  block?: boolean;
  /** 启用懒加载（基于 Lazyload 组件） */
  lazy?: boolean;
  /** 加载中占位内容 */
  placeholder?: JSX.Element;
  /** 加载失败兜底内容 */
  fallback?: JSX.Element;
  /** 占位图标尺寸 */
  iconSize?: string | number;
  /** 加载完成回调 */
  onLoad?: () => void;
  /** 加载失败回调 */
  onError?: () => void;
  /** 点击事件 */
  onClick?: JSX.EventHandlerUnion<HTMLImageElement, MouseEvent>;
  /** 是否开启点击预览（全屏遮罩展示大图） */
  preview?: boolean;
  class?: string;
  style?: JSX.CSSProperties | string;
}
