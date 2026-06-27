import type { JSX } from 'solid-js';

export interface NavBarProps {
  /** 标题 */
  title?: string | JSX.Element;
  /** 左侧内容（不传 backArrow 时可用） */
  left?: JSX.Element;
  /** 右侧内容 */
  right?: JSX.Element;
  /** 是否显示返回箭头，默认 false */
  backArrow?: boolean;
  /** 返回箭头点击回调 */
  onBack?: () => void;
  /** 左侧区域点击回调 */
  onLeftClick?: () => void;
  /** 右侧区域点击回调 */
  onRightClick?: () => void;
  /** 是否固定在顶部 */
  fixed?: boolean;
  /** 固定时是否生成占位元素，避免内容被遮挡 */
  placeholder?: boolean;
  /** 是否显示底部边框 */
  border?: boolean;
  /** z-index */
  zIndex?: number | string;
  /** 背景色 */
  background?: string;
  /** 文字颜色 */
  color?: string;
  /** 自定义高度，默认 46px */
  height?: number | string;
  class?: string;
  style?: JSX.CSSProperties | string;
}
