import type { JSX } from 'solid-js';

export interface TabsProps {
  /** 当前激活的 tab 标识符 */
  active?: number | string;
  /** 默认激活的 tab（非受控） */
  defaultActive?: number | string;
  /** 切换回调 */
  onChange?: (name: number | string) => void;
  /** 样式风格，默认 'line' */
  type?: 'line' | 'card';
  /** 主题色 */
  color?: string;
  /** 标签栏背景色 */
  background?: string;
  /** 动画时长（秒），默认 0.3 */
  duration?: number;
  /** 内容区切换动画 */
  animated?: boolean;
  /** 显示标签栏外边框（仅 line 模式） */
  border?: boolean;
  /** 粘性定位 */
  sticky?: boolean;
  /** 粘性定位距顶距离 */
  offsetTop?: number | string;
  /** 手势滑动切换 */
  swipeable?: boolean;
  /** 延迟渲染 tab 内容（默认 true） */
  lazyRender?: boolean;
  /** 标题选中态颜色 */
  titleActiveColor?: string;
  /** 标题默认态颜色 */
  titleInactiveColor?: string;
  /** 切换前回调，返回 false 阻止切换 */
  beforeChange?: (name: number | string) => boolean | Promise<boolean>;
  /** Tab 子元素 */
  children?: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties | string;
}

export interface TabProps {
  /** 标签标题 */
  title?: string | JSX.Element;
  /** 标签标识符（必须唯一） */
  name: number | string;
  /** 禁用 */
  disabled?: boolean;
  /** 标签内容 */
  children?: JSX.Element;
}
