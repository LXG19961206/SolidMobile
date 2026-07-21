import type { JSX } from 'solid-js';

export interface SidebarItem {
  /** 唯一标识 */
  key: string;
  /** 显示标题，支持 JSX */
  title: string | JSX.Element;
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
  /** 自定义类名 */
  class?: string;
  /** 内联样式 */
  style?: Record<string, string>;
}
