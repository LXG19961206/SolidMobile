import {
  createSignal, createMemo, createEffect, on,
  Show, For, mergeProps, splitProps, type Component,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { cn } from '../../utils';
import { Overlay } from '../Overlay';
import { Loading } from '../Loading';
import type { CascaderProps, CascaderOption } from './types';
import { emitEvent } from '../../event-bus';
import styles from './Cascader.module.css';

const defaultProps: Partial<CascaderProps> = {
  placeholder: '请选择',
  zIndex: 2000,
  showCheckmark: true,
};

/**
 * Cascader 级联选择器 — 多层级联选择，支持无限层级。
 *
 * 数据源为树形结构，每一列对应数据源的一层 children。
 * 顶部 Tab 显示当前选中路径，点击可回退到该层级。
 */
export const Cascader: Component<CascaderProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'options', 'value', 'onChange', 'title', 'placeholder',
    'closeable', 'show', 'onUpdateShow', 'onClose', 'maxHeight',
    'showCheckmark', 'checkmark', 'teleport', 'zIndex',
    'name', 'required', 'disabled', 'readonly', 'onLoadChildren', 'loading',
    'onFocus', 'onBlur', 'class', 'style',
  ]);

  const [internalShow, setInternalShow] = createSignal(local.show ?? false);
  const [animated, setAnimated] = createSignal(false);

  // Active tab index (which column depth we're viewing)
  const [activeDepth, setActiveDepth] = createSignal(0);

  // Selected indices per depth
  const [selectedIndices, setSelectedIndices] = createSignal<number[]>([]);
  const [loadingSet, setLoadingSet] = createSignal<Set<string>>(new Set());
  let userSelecting = false; // Flag to skip init effect during async user selection

  // Internal children cache for async-loaded data
  const [loadedChildren, setLoadedChildren] = createSignal<Record<string, CascaderOption[]>>({});

  // Build column data based on current selections
  const columns = createMemo(() => {
    const cols: CascaderOption[][] = [];
    let current: CascaderOption[] = local.options.length > 0 ? local.options : (loadedChildren().root || []);
    let depth = 0;

    while (current && current.length > 0) {
      cols.push(current);
      const idx = selectedIndices()[depth];
      if (idx >= 0) {
        const opt = current[idx];
        const children = opt?.children ?? loadedChildren()[`${depth}-${idx}`];
        if (children?.length) {
          current = children;
          depth++;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return cols;
  });

  // Load root options asynchronously if none provided
  createEffect(on(() => local.show, async (v) => {
    if (v && local.onLoadChildren && local.options.length === 0) {
      setLoadingSet(prev => new Set(prev).add('root'));
      try {
        const children = await local.onLoadChildren?.({ text: '', value: '__root__' } as CascaderOption);
        if (children?.length) setLoadedChildren(prev => ({ ...prev, root: children }));
      } finally {
        setLoadingSet(prev => { const s = new Set(prev); s.delete('root'); return s; });
      }
    }
  }));

  // Selected path names for tab display
  const selectedPath = createMemo(() => {
    const path: string[] = [];
    const cols = columns();
    selectedIndices().forEach((idx, depth) => {
      if (idx >= 0 && cols[depth]?.[idx]) {
        path.push(cols[depth][idx].render ? `选项${depth + 1}` : cols[depth][idx].text);
      }
    });
    // Add placeholder for next unselected level
    if (selectedIndices().length < cols.length) {
      path.push(local.placeholder!);
    }
    return path;
  });

  // Current column being viewed
  const currentColumn = createMemo(() => {
    const cols = columns();
    return cols[activeDepth()] ?? [];
  });

  // Init from value prop — skip when user is actively selecting to avoid
  // resetting activeDepth before async children have loaded
  createEffect(on(() => local.value, (val) => {
    if (userSelecting) return;
    if (!val || val.length === 0) {
      setSelectedIndices([]);
      setActiveDepth(0);
      return;
    }
    const indices: number[] = [];
    let current = local.options.length > 0 ? local.options : (loadedChildren().root || []);
    let d = 0;
    for (const v of val) {
      const idx = current.findIndex((o) => o.value === v);
      if (idx < 0) break;
      indices.push(idx);
      const children = current[idx]?.children ?? loadedChildren()[`${d}-${idx}`];
      if (children?.length) {
        current = children;
        d++;
      } else {
        break;
      }
    }
    setSelectedIndices(indices);
    // If async mode and children might still be loading, keep current depth
    if (local.onLoadChildren && d < indices.length) {
      // Children for the last level haven't loaded yet — don't step back
    } else {
      setActiveDepth(d === indices.length ? indices.length : Math.max(0, indices.length - 1));
    }
  }));

  // Load root options asynchronously if none provided
  createEffect(on(() => local.show, async (v) => {
    if (v && local.onLoadChildren && local.options.length === 0) {
      const rootKey = 'root';
      setLoadingSet(prev => new Set(prev).add(rootKey));
      try {
        const children = await local.onLoadChildren?.({ text: '', value: '__root__' } as CascaderOption);
        if (children?.length) {
          children.forEach(c => local.options.push(c));
        }
      } finally {
        setLoadingSet(prev => { const s = new Set(prev); s.delete(rootKey); return s; });
      }
    }
  }));

  // Sync show
  createEffect(on(() => local.show, (v) => {
    if (v) openSheet();
    else closeSheet();
  }));

  function openSheet() {
    if (local.disabled || local.readonly) return;
    setInternalShow(true);
    requestAnimationFrame(() => setAnimated(true));
    local.onFocus?.();
  }

  function closeSheet() {
    setAnimated(false);
    setTimeout(() => {
      setInternalShow(false);
      local.onUpdateShow?.(false);
      local.onClose?.();
      local.onBlur?.();
    }, 300);
  }

  async function selectOption(depth: number, idx: number) {
    const option = columns()[depth][idx];
    if (option.disabled) return;

    userSelecting = true;
    const newIndices = [...selectedIndices().slice(0, depth), idx];
    setSelectedIndices(newIndices);

    // Build value array from actual column data (includes async-loaded children)
    const value: (string | number)[] = [];
    const cols = columns();
    for (let d = 0; d < newIndices.length; d++) {
      const idx = newIndices[d];
      if (cols[d]?.[idx]) {
        value.push(cols[d][idx].value);
      }
    }
    local.onChange?.(value);
    emitEvent({ component: 'Cascader', type: 'change', payload: value, props: props, timestamp: Date.now() });

    // Determine effective children (inline or async-loaded)
    const effectiveChildren = option.children ?? loadedChildren()[`${depth}-${idx}`];

    if (option.isLeaf) {
      userSelecting = false;
      closeSheet();
    } else if (effectiveChildren?.length) {
      userSelecting = false;
      setActiveDepth(depth + 1);
    } else if (local.onLoadChildren) {
      // Async load children
      const key = `${depth}-${idx}`;
      setLoadingSet(prev => new Set(prev).add(key));
      try {
        const children = await local.onLoadChildren(option);
        if (children && children.length > 0) {
          setLoadedChildren(prev => ({ ...prev, [key]: children }));
          setActiveDepth(depth + 1);
        } else {
          closeSheet();
        }
      } finally {
        setLoadingSet(prev => { const s = new Set(prev); s.delete(key); return s; });
        userSelecting = false;
      }
    } else {
      userSelecting = false;
      closeSheet();
    }
  }

  function switchTab(depth: number) {
    setActiveDepth(depth);
  }

  return (
    <Show when={internalShow()}>
      <Portal mount={local.teleport as Node ?? (typeof document !== 'undefined' ? document.body : undefined)}>
        <Overlay
          open={internalShow()}
          mount={local.teleport as Node | undefined}
          zIndex={Number(local.zIndex)}
          duration={200}
          onClose={() => closeSheet()}
        />
        <div
          class={cn(styles.sheet, animated() && styles.sheetEnter, local.class)}
          data-name={local.name}
          style={{
            'z-index': Number(local.zIndex) + 1,
            ...(local.maxHeight ? { 'max-height': typeof local.maxHeight === 'number' ? `${local.maxHeight}px` : local.maxHeight } : {}),
            ...(typeof local.style === 'object' ? local.style : {}),
          }}
        >
          {/* Header */}
          <div class={styles.header}>
            <span class={styles.title}>{local.title}</span>
            <Show when={local.closeable}>
              <button class={styles.closeBtn} onClick={closeSheet}>✕</button>
            </Show>
          </div>

          {/* Tabs */}
          <div class={styles.tabs}>
            <For each={selectedPath()}>
              {(name, idx) => (
                <button
                  class={cn(styles.tab, activeDepth() === idx() && styles.tabActive)}
                  onClick={() => switchTab(idx())}
                >
                  {name}
                </button>
              )}
            </For>
          </div>

          {/* Columns */}
          <div class={cn(styles.columns, !local.showCheckmark && styles.noCheckmark, !!local.checkmark && styles.hasCustomCheckmark)}>
            <Show
              when={columns().length > 0}
              fallback={
                <div class={styles.loadingWrap}>
                  {local.loading ?? <Loading size={28} />}
                </div>
              }
            >
              <div
                class={styles.swiper}
                style={{ transform: `translateX(-${activeDepth() * 100}%)` }}
              >
                <For each={columns()}>
                  {(col, colIdx) => (
                    <div class={styles.column}>
                      <For each={col}>
                        {(option, idx) => (
                          <div
                            class={cn(
                              styles.option,
                              option.disabled && styles.optionDisabled,
                              selectedIndices()[colIdx()] === idx() && styles.optionSelected,
                            )}
                            onClick={() => selectOption(colIdx(), idx())}
                          >
                            {loadingSet().has(`${colIdx()}-${idx()}`)
                              ? <span style="display:flex;align-items:center;gap:8px">{option.render ?? <span>{option.text}</span>}<Loading size={14} /></span>
                              : (option.render ?? <span>{option.text}</span>)}
                            {local.checkmark && selectedIndices()[colIdx()] === idx() && (
                              <span style="flex-shrink:0">{local.checkmark}</span>
                            )}
                          </div>
                        )}
                      </For>
                    </div>
                  )}
                </For>
              </div>
            </Show>
          </div>
        </div>
      </Portal>
    </Show>
  );
};
