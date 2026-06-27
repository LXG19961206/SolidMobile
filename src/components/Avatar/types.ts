import type { JSX } from 'solid-js';
import type { IconName } from '../Icon/types';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /** 头像地址 */
  src?: string;
  /** 替代文本 */
  alt?: string;
  /** 预设尺寸或自定义数值（px），默认 'md' */
  size?: AvatarSize | number;
  /** 完全圆形（默认 true，与 square 互斥） */
  round?: boolean;
  /** 方形 + 圆角。传入数字控制圆角大小，true 则用默认值 */
  square?: boolean | number;
  /** 无 src 或加载失败时显示的图标名称 */
  icon?: IconName;
  /** 无 src 且无 icon 时的文字（取首字符） */
  text?: string;
  /** 自定义背景色 */
  color?: string;
  /** 自定义 CSS class */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
}
