import type { JSX } from 'solid-js';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';

export interface TooltipDelay {
  /** 显示延迟（ms），默认 200 */
  show?: number;
  /** 隐藏延迟（ms），默认 200 */
  hide?: number;
}

export interface TooltipProps {
  /** 气泡内容，支持字符串或 JSX */
  content: JSX.Element;
  /** 弹出方向，viewport 空间不足时自动翻转。默认 'top' */
  placement?: TooltipPlacement;
  /** 触发方式。'manual' 配合 open 受控使用。默认 'hover' */
  trigger?: TooltipTrigger;
  /** 受控模式：显示/隐藏 */
  open?: boolean;
  /** 非受控默认状态。默认 false */
  defaultOpen?: boolean;
  /** 状态变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** 是否显示三角箭头。默认 true */
  showArrow?: boolean;
  /**
   * 显示/隐藏延迟（ms）。
   * 传 number 时 show/hide 同值；传 { show, hide } 分别控制。
   * 默认 200，hover 模式下防止误触。
   */
  delay?: number | TooltipDelay;
  /** 箭头大小（px）。默认跟随 --sc-tooltip-arrow-size，fallback 5px */
  arrowSize?: number;
  /** 气泡距触发元素的间距（px），不包含箭头。默认 6 */
  offset?: number;
  /** 气泡最大宽度（px 或 CSS 值），默认跟随 --sc-tooltip-max-width。常用于长文本提示场景 */
  maxWidth?: number | string;
  /** 是否显示关闭按钮（✕），移动端 click 场景推荐开启。默认 false */
  closeable?: boolean;
  /** Portal 挂载目标。默认 document.body */
  teleport?: Node | string;
  /** 层级。默认 1000 */
  zIndex?: number;
  /** 气泡自定义 CSS class */
  class?: string;
  /** 气泡内联样式 */
  style?: JSX.CSSProperties | string;
  /** 触发元素 */
  children?: JSX.Element;
}
