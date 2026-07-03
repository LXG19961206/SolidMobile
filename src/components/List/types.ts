import type { JSX } from 'solid-js';

export interface ListProps<I> {
  // ═══ 数据 ═══
  /**
   * 模式 1（受控）：外部管理数据源。
   * 传入 data 后 onLoad 被忽略，滚动、刷新、加载全由用户自行处理。
   */
  data?: I[];
  /**
   * 模式 2（不受控）：组件内部管理数据。
   * 传入 onLoad，每次触底时调用，返回值自动追加到列表末尾。
   * 返回空数组或 finished 置为 true 后停止加载。
   */
  onLoad?: () => Promise<I[]>;
  /** 模式 2 是否已加载完成，置为 true 后不再触发 onLoad */
  finished?: boolean;

  // ═══ 渲染 ═══
  /** 渲染每一项的模板函数 */
  children: (item: I, index: number) => JSX.Element;

  // ═══ 状态展示 ═══
  /** 空数据占位。传字符串时使用内置 Empty 组件，传 JSX 时完全自定义 */
  empty?: string | JSX.Element;
  /** 加载中底部提示文字，默认 '加载中...' */
  loadMoreText?: string;
  /** 全部加载完成底部提示文字，默认 '没有更多了' */
  finishedText?: string;
  /** 加载失败时底部内容 */
  errorText?: string;

  // ═══ 行为 ═══
  /** 距离底部多少 px 时触发 onLoad，默认 100 */
  offset?: number;

  // ═══ 虚拟列表 ═══
  /** 开启虚拟列表。开启后 itemHeight 必传，每项高度固定 */
  virtual?: boolean;
  /** 虚拟列表模式下每项的固定高度 (px) */
  itemHeight?: number;

  // ═══ 下拉刷新 ═══
  /** 开启下拉刷新。开启后需配合 onRefresh 使用 */
  pullRefresh?: boolean;
  /** 下拉刷新回调。返回 Promise 时组件自动等待完成 */
  onRefresh?: () => void | Promise<void>;

  // ═══ 其他 ═══
  class?: string;
  style?: JSX.CSSProperties | string;
}
