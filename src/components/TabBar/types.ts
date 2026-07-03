import type { JSX } from 'solid-js';

export interface TabBarProps {
  /** 当前选中标签（受控） */
  value?: number | string;
  /** 默认选中标签（非受控） */
  defaultValue?: number | string;
  /** 切换回调 */
  onChange?: (name: number | string) => void;
  /** 是否固定在底部，默认 true */
  fixed?: boolean;
  /** 是否显示外边框 */
  border?: boolean;
  /** 元素 z-index，默认 1 */
  zIndex?: number | string;
  /** 标签栏高度，默认 50px。placeholder 占位高度同步变化 */
  height?: number | string;
  /** 选中标签颜色 */
  activeColor?: string;
  /** 未选中标签颜色 */
  inactiveColor?: string;
  /** 固定在底部时，是否生成占位元素 */
  safeArea?: boolean;
  /** 切换前回调，返回 false 阻止切换 */
  beforeChange?: (name: number | string) => boolean | Promise<boolean>;
  /** 自定义背景色，支持渐变色、半透明等 */
  bgColor?: string;
  /** fixed 时自动生成等高的占位元素，防止内容被遮挡 */
  placeholder?: boolean;
  /** 子元素（TabBarItem） */
  children?: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties | string;
}

export interface TabBarItemProps {
  /** 标签标识符（必填） */
  name: number | string;
  /** 图标：字符串（内置图标名）、JSX 元素或带 active prop 的函数组件 */
  icon?: string | JSX.Element | ((props: { active: boolean }) => JSX.Element);
  /** 图标右上角小红点 */
  dot?: boolean;
  /** 图标右上角徽标内容 */
  badge?: number | string;
  /** 自定义徽标属性，透传给 Badge 组件 */
  badgeProps?: Record<string, unknown>;
  /** 标签文字 */
  label?: string;
  class?: string;
  style?: JSX.CSSProperties | string;
}
