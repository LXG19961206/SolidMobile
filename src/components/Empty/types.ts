import type { JSX } from 'solid-js';

export interface EmptyProps {
  /** 描述文字 */
  description?: string;
  /** 图片：预设类型或自定义 JSX，默认 'default' */
  image?: 'default' | 'network' | 'search' | JSX.Element;
  /** 自定义底部内容（如按钮） */
  children?: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties | string;
}
