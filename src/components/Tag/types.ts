import type { JSX } from 'solid-js';

export type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface TagProps {
  /** 语义色，默认 'primary' */
  type?: TagType;
  /** 填充方式，默认 'solid' */
  variant?: 'solid' | 'outline';
  /** 尺寸，默认 'md' */
  size?: 'sm' | 'md';
  /** 胶囊圆角 */
  round?: boolean;
  /** 是否可关闭 */
  closeable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  children?: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties | string;
  /** 自定义颜色（覆盖 type） */
  color?: string;
}
