import {
  createSignal,
  createEffect,
  onCleanup,
  onMount,
  mergeProps,
  splitProps,
  For,
  Show,
  type Component,
  type JSX,
} from 'solid-js';
import { cn } from '../../utils';
import { Empty } from '../Empty';
import { Loading } from '../Loading';
import type { ListProps } from './types';
import styles from './List.module.css';

const defaultProps: Partial<ListProps<any>> = {
  offset: 100,
  loadMoreText: '加载中...',
  finishedText: '没有更多了',
};

const OVERSCAN = 5; // extra items rendered above/below viewport

/**
 * List 列表 — 滚动加载列表。
 *
 * 支持两种数据模式：
 * - 受控：传入 `data`，用户自行管理加载/刷新逻辑
 * - 不受控：传入 `onLoad`，组件在触底时自动调用并追加数据
 *
 * 支持虚拟列表（`virtual`）：
 * - 开启后只渲染可视区域内的元素，适用于长列表
 * - 每项高度必须固定，通过 `itemHeight` 指定
 *
 * @example 受控模式
 * ```tsx
 * <List data={items()}>
 *   {(item, i) => <div>{item.name}</div>}
 * </List>
 * ```
 *
 * @example 不受控模式（触底自动加载）
 * ```tsx
 * const [finished, setFinished] = createSignal(false);
 *
 * const onLoad = async () => {
 *   const res = await api.getList(page++);
 *   if (res.length === 0) setFinished(true);
 *   return res;
 * };
 *
 * <List onLoad={onLoad} finished={finished()}>
 *   {(item, i) => <div>{item.name}</div>}
 * </List>
 * ```
 *
 * @example 虚拟列表 + 无限加载
 * ```tsx
 * const [finished, setFinished] = createSignal(false);
 * let page = 0;
 * const onLoad = async () => {
 *   const batch = await fetchPage(page++);
 *   if (batch.length === 0) setFinished(true);
 *   return batch;
 * };
 *
 * <div style={{ height: 400 }}>
 *   <List virtual itemHeight={48} onLoad={onLoad} finished={finished()}>
 *     {(item) => <div style={{ height: '48px' }}>{item.name}</div>}
 *   </List>
 * </div>
 * ```
 */
export function List<I>(rawProps: ListProps<I>) {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, [
    'data', 'onLoad', 'finished', 'children',
    'empty', 'loadMoreText', 'finishedText', 'errorText',
    'offset', 'virtual', 'itemHeight', 'class', 'style',
  ]);

  // ── Mode detection ──
  const isControlled = () => local.data !== undefined;
  const isVirtual = () => !!local.virtual && !!local.itemHeight;

  // ── Initial load in auto mode ──
  let initialLoaded = false;
  createEffect(() => {
    if (!isControlled() && local.onLoad && !initialLoaded) {
      initialLoaded = true;
      loadMore();
    }
  });

  // ── Mode 2: internal data store ──
  const [internalData, setInternalData] = createSignal<I[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal(false);

  const displayData = () => (isControlled() ? local.data! : internalData());
  const totalCount = () => displayData().length;

  // ── Virtual: scroll state ──
  const [scrollTop, setScrollTop] = createSignal(0);
  const [containerHeight, setContainerHeight] = createSignal(0);

  // ── Virtual: visible range ──
  const startIndex = () => {
    if (!isVirtual()) return 0;
    return Math.max(0, Math.floor(scrollTop() / local.itemHeight!) - Math.floor(OVERSCAN / 2));
  };

  const visibleCount = () => {
    if (!isVirtual()) return totalCount();
    const ch = containerHeight();
    if (!ch) return OVERSCAN * 2;
    return Math.ceil(ch / local.itemHeight!) + OVERSCAN;
  };

  const endIndex = () => {
    if (!isVirtual()) return totalCount() - 1;
    return Math.min(totalCount() - 1, startIndex() + visibleCount() - 1);
  };

  const visibleItems = () => {
    const all = displayData();
    if (!isVirtual()) return all;
    if (all.length === 0) return [];
    return all.slice(startIndex(), endIndex() + 1);
  };

  // Virtual: spacer total height
  const spacerHeight = () => {
    if (!isVirtual()) return undefined;
    return totalCount() * local.itemHeight!;
  };

  // Virtual: visible area offset
  const visibleTop = () => {
    if (!isVirtual()) return 0;
    // Align to item grid so items sit on exact pixel boundaries
    return startIndex() * local.itemHeight!;
  };

  // ── Scroll detection ──
  let containerRef!: HTMLDivElement;

  const checkBottom = () => {
    if (!containerRef) return;
    if (isControlled()) return; // controlled mode: user handles loading
    if (loading() || local.finished) return;

    const { scrollTop: st, scrollHeight: sh, clientHeight: ch } = containerRef;
    if (sh - st - ch < local.offset!) {
      loadMore();
    }
  };

  const loadMore = async () => {
    if (!local.onLoad || loading() || local.finished) return;
    setLoading(true);
    setError(false);
    try {
      const newItems = await local.onLoad();
      setInternalData((prev) => [...prev, ...newItems]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (!containerRef) return;
    (containerRef as any)._scrollTicking = (containerRef as any)._scrollTicking || false;
    if ((containerRef as any)._scrollTicking) return;
    (containerRef as any)._scrollTicking = true;
    requestAnimationFrame(() => {
      if (!containerRef) return;
      // Virtual: update scrollTop for visible range calc
      if (isVirtual()) {
        setScrollTop(containerRef.scrollTop);
      }
      checkBottom();
      (containerRef as any)._scrollTicking = false;
    });
  };

  // ── Container height tracking (virtual mode) ──
  onMount(() => {
    if (isVirtual() && containerRef) {
      setContainerHeight(containerRef.clientHeight);
      // Re-measure on resize
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerHeight(entry.contentRect.height);
        }
      });
      ro.observe(containerRef);
      onCleanup(() => ro.disconnect());
    }
  });

  // ── Empty state ──
  const isEmpty = () => !loading() && displayData().length === 0 && !error();

  const renderEmpty = (): JSX.Element => {
    if (typeof local.empty === 'string') {
      return <Empty description={local.empty} />;
    }
    return local.empty || <Empty description="暂无数据" />;
  };

  // ── Render footer ──
  const renderFooter = () => (
    <Show when={!isControlled() && !isEmpty()}>
      <div
        class={cn(styles.footer, error() && styles.error)}
        onClick={error() ? () => loadMore() : undefined}
      >
        <Show when={error()} fallback={
          <Show when={local.finished} fallback={
            <span><Loading type="dots" size={16} /> {local.loadMoreText}</span>
          }>
            <span>{local.finishedText}</span>
          </Show>
        }>
          <span>{local.errorText || '加载失败，点击重试'}</span>
        </Show>
      </div>
    </Show>
  );

  // ── Render ──
  return (
    <div
      ref={containerRef!}
      class={cn(styles.list, local.class)}
      style={typeof local.style === 'object' ? local.style : undefined}
      onScroll={handleScroll}
      {...rest}
    >
      <Show when={isEmpty()}>
        <div class={styles.empty}>{renderEmpty()}</div>
      </Show>

      <Show when={!isEmpty()}>
        <Show when={isVirtual()} fallback={
          // ── Normal mode ──
          <>
            <For each={displayData()}>{(item, index) => local.children(item, index())}</For>
            {renderFooter()}
          </>
        }>
          {/* ── Virtual mode ── */}
          <div class={styles.virtualSpacer} style={{ height: `${spacerHeight()}px` }}>
            <div
              class={styles.visibleArea}
              style={{ transform: `translateY(${visibleTop()}px)` }}
            >
              <For each={visibleItems()}>
                {(item, idx) => local.children(item, startIndex() + idx())}
              </For>
            </div>
          </div>
          {renderFooter()}
        </Show>
      </Show>
    </div>
  );
}
