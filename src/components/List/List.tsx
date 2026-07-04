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
import { PullRefresh } from '../PullRefresh';
import type { ListProps } from './types';
import { useT } from '../../i18n';
import styles from './List.module.css';

const defaultProps: Partial<ListProps<any>> = {
  offset: 100,
};

const OVERSCAN = 5;

export function List<I>(rawProps: ListProps<I>) {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, [
    'data', 'onLoad', 'finished', 'children',
    'empty', 'loadMoreText', 'finishedText', 'errorText',
    'offset', 'virtual', 'itemHeight',
    'pullRefresh', 'onRefresh', 'class', 'style',
  ]);

  const t = useT();
  const loadMoreLabel = () => local.loadMoreText ?? t('component.list.loading');
  const finishedLabel = () => local.finishedText ?? t('component.list.finished');

  const isControlled = () => local.data !== undefined;
  const isVirtual = () => !!local.virtual && !!local.itemHeight;

  let initialLoaded = false;
  createEffect(() => {
    if (!isControlled() && local.onLoad && !initialLoaded) {
      initialLoaded = true;
      loadMore();
    }
  });

  const [internalData, setInternalData] = createSignal<I[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal(false);

  const displayData = () => (isControlled() ? local.data! : internalData());
  const totalCount = () => displayData().length;

  const [scrollTop, setScrollTop] = createSignal(0);
  const [containerHeight, setContainerHeight] = createSignal(0);

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

  const spacerHeight = () => {
    if (!isVirtual()) return undefined;
    return totalCount() * local.itemHeight!;
  };

  const visibleTop = () => {
    if (!isVirtual()) return 0;
    return startIndex() * local.itemHeight!;
  };

  let containerRef!: HTMLDivElement;

  const checkBottom = () => {
    if (!containerRef) return;
    if (isControlled()) return;
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

  /* ── Pull-to-refresh ── */
  let refreshInitiated = false;

  const handleRefresh = async () => {
    if (!local.onRefresh) return;
    refreshInitiated = true;
    try {
      await local.onRefresh();
    } finally {
      refreshInitiated = false;
    }
    // For uncontrolled mode: reset data and reload
    if (!isControlled()) {
      initialLoaded = false;
      setInternalData([]);
      // Re-trigger initial load
      if (local.onLoad) {
        setTimeout(() => {
          initialLoaded = true;
          loadMore();
        }, 0);
      }
    }
  };

  const handleScroll = () => {
    if (!containerRef) return;
    (containerRef as any)._scrollTicking = (containerRef as any)._scrollTicking || false;
    if ((containerRef as any)._scrollTicking) return;
    (containerRef as any)._scrollTicking = true;
    requestAnimationFrame(() => {
      if (!containerRef) return;
      if (isVirtual()) {
        setScrollTop(containerRef.scrollTop);
      }
      checkBottom();
      (containerRef as any)._scrollTicking = false;
    });
  };

  createEffect(() => {
    if (loading()) return;
    checkBottom();
  });

  onMount(() => {
    if (isVirtual() && containerRef) {
      setContainerHeight(containerRef.clientHeight);
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerHeight(entry.contentRect.height);
        }
      });
      ro.observe(containerRef);
      onCleanup(() => ro.disconnect());
    }
  });

  const isEmpty = () => !loading() && displayData().length === 0 && !error();

  const renderEmpty = (): JSX.Element => {
    if (typeof local.empty === 'string') {
      return <Empty description={local.empty} />;
    }
    return local.empty || <Empty description={t('component.list.empty')} />;
  };

  const renderFooter = () => (
    <Show when={!isControlled() && !isEmpty()}>
      <div
        class={cn(styles.footer, error() && styles.error)}
        onClick={error() ? () => loadMore() : undefined}
      >
        <Show when={error()} fallback={
          <Show when={local.finished} fallback={
            <span><Loading type="dots" size={16} /> {loadMoreLabel()}</span>
          }>
            <span>{finishedLabel()}</span>
          </Show>
        }>
          <span>{local.errorText || t('component.list.error')}</span>
        </Show>
      </div>
    </Show>
  );

  const listContent = (
    <>
      <Show when={isEmpty()}>
        <div class={styles.empty}>{renderEmpty()}</div>
      </Show>

      <Show when={!isEmpty()}>
        <Show when={isVirtual()} fallback={
          <>
            <For each={displayData()}>{(item, index) => local.children(item, index())}</For>
            {renderFooter()}
          </>
        }>
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
    </>
  );

  return (
    <div
      ref={containerRef!}
      class={cn(styles.list, local.class)}
      style={typeof local.style === 'object' ? local.style : undefined}
      onScroll={handleScroll}
      {...rest}
    >
      {local.pullRefresh ? (
        <PullRefresh
          onRefresh={handleRefresh}
          scrollContainer={containerRef}
        >
          {listContent}
        </PullRefresh>
      ) : listContent}
    </div>
  );
}
