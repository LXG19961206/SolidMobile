import type { JSX } from 'solid-js';

export interface PullRefreshProps {
  /** 是否正在加载。受控时由你管理，非受控时组件内部自动管理 */
  loading?: boolean;
  /** 刷新回调。返回 Promise 时组件自动等待完成 */
  onRefresh?: () => void | Promise<void>;
  /** 触发刷新的下拉距离（px），默认 80 */
  pullDistance?: number;
  /** 顶部刷新提示区高度（px），默认 60 */
  headHeight?: number;
  /** 加载完成后展示成功状态的时长（ms），默认 500 */
  successDuration?: number;
  /** 回弹动画时长（ms），默认 300 */
  animationDuration?: number;
  /** 禁用下拉刷新 */
  disabled?: boolean;
  /** 成功文案，默认 "刷新成功" */
  successText?: string;
  /** 下拉文案，默认 "下拉刷新" */
  pullingText?: string;
  /** 释放文案，默认 "释放刷新" */
  loosingText?: string;
  /** 加载文案，默认 "刷新中..." */
  loadingText?: string;
  /** 子元素 */
  children?: JSX.Element;
  /**
   * 滚动容器元素引用。传入后 PullRefresh 检查此元素的 scrollTop 而非自身。
   * 用于 PullRefresh 内部包裹了一个独立滚动容器（如 List）的场景。
   */
  scrollContainer?: HTMLElement;
  class?: string;
  style?: JSX.CSSProperties | string;
}
