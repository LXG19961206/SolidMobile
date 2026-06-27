import type { JSX } from 'solid-js';

export interface RowProps {
  /** 列间距，数字自动补 px */
  gap?: string | number;
  /** 垂直对齐 */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** 水平分布 */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** 是否换行 */
  wrap?: boolean;
  children?: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties | string;
}

export interface ColProps {
  /** 栅格占位，1-24，不设则自动填充 */
  span?: number;
  /** 左偏移 */
  offset?: number;
  children?: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties | string;
}
