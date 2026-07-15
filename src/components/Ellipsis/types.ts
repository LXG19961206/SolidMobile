import type { JSX } from 'solid-js';

export interface EllipsisProps {
  /** 显示行数，超出后打省略号，默认 1 */
  lines?: number;
  /** 是否可展开/收起 */
  expandable?: boolean;
  /** 受控模式：当前是否展开 */
  expanded?: boolean;
  /** 非受控模式：默认是否展开 */
  defaultExpanded?: boolean;
  /** 展开状态变化回调 */
  onExpandChange?: (expanded: boolean) => void;
  /** 是否显示展开/收起按钮，默认 true。设为 false 时可配合受控模式由外部触发 */
  showAction?: boolean;
  /** 展开按钮内容（不传时默认显示 "Expand"） */
  expandElement?: JSX.Element;
  /** 收起按钮内容（不传时默认显示 "Collapse"） */
  collapseElement?: JSX.Element;
  /** 渲染的 HTML 标签，默认 'div' */
  as?: string;
  /** 自定义 CSS class */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
  /** 文本内容 */
  children?: JSX.Element;
}
