import type { JSX } from 'solid-js';

export type ToastType = 'success' | 'error' | 'warning' | 'loading' | 'info';
export type ToastPosition = 'top' | 'middle' | 'bottom';

export interface ToastOptions {
  /** 消息内容 */
  message: string | JSX.Element;
  /** 类型，决定图标和颜色 */
  type?: ToastType;
  /** 显示位置，默认 'middle' */
  position?: ToastPosition;
  /** 自动关闭毫秒数，0 表示不自动关闭。默认 3000 */
  duration?: number;
  /** 是否显示半透明遮罩 */
  overlay?: boolean;
  /** 点击 toast 自身是否关闭 */
  closeOnClick?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 自定义图标（覆盖 type 默认图标） */
  icon?: JSX.Element;
  /** 自定义 z-index */
  zIndex?: number;
  /**
   * 多个 toast 的展示策略：
   * - `false`（默认）：新 toast 会顶掉同位置的旧 toast
   * - `true`：toast 沿 Y 轴错开堆叠，不会重叠
   */
  stack?: boolean;
  /**
   * Portal 挂载目标节点，默认 `document.body`。
   * 文档演示用（toast 出现在手机模拟器内），业务中无需关心。
   */
  portalMount?: Node;
}

/** Toast 实例句柄，用于手动关闭 */
export interface ToastHandle {
  id: number;
  dismiss: () => void;
}
