import type { JSX } from 'solid-js';

export interface SidebarItem {
  /** 唯一标识 */
  key: string;
  /** 显示标题，支持 JSX */
  title: string | JSX.Element;
  /** 图标，显示在标题上方 */
  icon?: JSX.Element;
  /** 是否禁用 */
  disabled?: boolean;
}

export interface SidebarProps {
  /** 选项列表 */
  items: SidebarItem[];
  /** 当前选中项 */
  activeKey: string;
  /** 选中变化回调 */
  onChange: (key: string) => void;
  /** 侧边栏宽度，默认 90px */
  width?: string | number;
  /** 紧凑模式：仅显示图标，不显示文字，宽度自动收缩 */
  compact?: boolean;
  /** 自定义类名 */
  class?: string;
  /** 内联样式 */
  style?: Record<string, string>;
}
