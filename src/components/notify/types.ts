import type { JSX } from 'solid-js';

export type NotifyType = 'primary' | 'success' | 'warning' | 'danger';
export type NotifyPosition = 'top' | 'bottom';

export interface NotifyOptions {
  /** 类型，可选值为 primary success warning danger，默认 'danger' */
  type?: NotifyType;
  /** 展示内容，支持 string（\\n 换行）或 JSX 自定义 */
  message: string | JSX.Element;
  /** 展示时长(ms)，值为 0 时 notify 不会消失，默认 3000 */
  duration?: number;
  /** 将组件的 z-index 层级设置为一个固定值 */
  zIndex?: number;
  /** 弹出位置，可选值为 bottom，默认 'top' */
  position?: NotifyPosition;
  /** 字体颜色，默认 'white' */
  color?: string;
  /** 背景颜色 */
  background?: string;
  /** 自定义类名 */
  className?: string;
  /** 是否锁定背景滚动，默认 false */
  lockScroll?: boolean;
  /**
   * 指定挂载的节点，等同于 Portal 的 mount 属性。
   * 文档演示用（notify 出现在手机模拟器内），业务中无需关心。
   */
  teleport?: Node;
  /** 点击时的回调函数 */
  onClick?: (event: MouseEvent) => void;
  /** 完全展示后的回调函数 */
  onOpened?: () => void;
  /** 关闭时的回调函数 */
  onClose?: () => void;
}

/** Notify 实例句柄，用于手动关闭 */
export interface NotifyHandle {
  id: number;
  dismiss: () => void;
}
