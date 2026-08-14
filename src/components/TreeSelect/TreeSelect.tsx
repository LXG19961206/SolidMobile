import {
  createSignal,
  createEffect,
  createMemo,
  on,
  onMount,
  onCleanup,
  mergeProps,
  splitProps,
  Show,
  For,
  type Component,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import type { TreeSelectProps, TreeSelectOption, TreeSelectHandle } from './types';
import { cn, scopedStyle } from '../../utils';
import { Icon } from '../Icon';
import { Checkbox } from '../Checkbox';
import { Loading } from '../Loading';
import { Tabs, Tab } from '../Tabs';
import { ScrollBar } from '../ScrollBar';
import { useSwipeGesture } from '../../hooks';
import { useT } from '../../i18n';
import rawStyles from './TreeSelect.module.css';
const styles = scopedStyle(rawStyles, 'sc-treeselect');

const defaultProps: Partial<TreeSelectProps> = {
  max: 0,
  placeholder: '',
  title: '',
  mode: 'select',
  searchable: false,
  searchMode: 'local',
  closeable: false,
  swipeable: false,
  checkboxPosition: 'right' as const,
  checkStrictly: false,
  onlyLeafCheckable: false,
  clearable: false,
  readonly: false,
};

/** Collect all leaf keys under an option */
function collectLeafKeys(
  opt: TreeSelectOption,
  vk: string,
  ck: string,
  lk?: string,
): (string | number)[] {
  if (lk && opt[lk] === true) return [opt[vk]];
  const kids = opt[ck] as TreeSelectOption[] | undefined;
  if (!kids || kids.length === 0) return [opt[vk]];
  return kids.flatMap((c) => collectLeafKeys(c, vk, ck, lk));
}

/** Collect the leaf keys that are actually checkable under an option —
 *  a disabled node (leaf or parent) excludes its whole subtree. */
function collectSelectableLeaves(
  opt: TreeSelectOption,
  vk: string,
  ck: string,
  lk?: string,
): (string | number)[] {
  if (opt.disabled) return [];
  if (lk && opt[lk] === true) return [opt[vk]];
  const kids = opt[ck] as TreeSelectOption[] | undefined;
  if (!kids || kids.length === 0) return [opt[vk]];
  return kids.flatMap((c) => collectSelectableLeaves(c, vk, ck, lk));
}

/* ── Body scroll lock while the sheet is open (instance-safe) ── */
let scrollLockCount = 0;
let prevBodyOverflow = '';
function lockBodyScroll() {
  if (typeof document === 'undefined') return;
  if (scrollLockCount === 0) prevBodyOverflow = document.body.style.overflow;
  scrollLockCount++;
  document.body.style.overflow = 'hidden';
}
function unlockBodyScroll() {
  if (typeof document === 'undefined') return;
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) document.body.style.overflow = prevBodyOverflow;
}

export const TreeSelect: Component<TreeSelectProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'options',
    'value',
    'defaultValue',
    'onChange',
    'onConfirm',
    'onCancel',
    'max',
    'fieldNames',
    'mode',
    'checkStrictly',
    'onlyLeafCheckable',
    'renderItem',
    'placeholder',
    'title',
    'disabled',
    'searchable',
    'searchMode',
    'onSearch',
    'onLoadChildren',
    'emptyText',
    'loadErrorText',
    'show',
    'onUpdateShow',
    'onClose',
    'closeable',
    'swipeable',
    'checkboxPosition',
    'teleport',
    'zIndex',
    'maxHeight',
    'format',
    'clearable',
    'readonly',
    'renderTrigger',
    'ref',
    'class',
    'style',
  ]);
  const t = useT();

  // ── field name mapping ──
  const vKey = () => local.fieldNames?.value ?? 'value';
  const lKey = () => local.fieldNames?.label ?? 'label';
  const cKey = () => local.fieldNames?.children ?? 'children';
  const leafKey = () => local.fieldNames?.leaf;

  const optLabel = (o: TreeSelectOption) => o[lKey()] as string;
  const optKey = (o: TreeSelectOption) => o[vKey()] as string | number;
  const optChildren = (o: TreeSelectOption) => o[cKey()] as TreeSelectOption[] | undefined;
  const nodeKey = (o: TreeSelectOption) => String(optKey(o));
  // A node without children is still expandable when an async loader exists
  const canLoad = (o: TreeSelectOption) => !!local.onLoadChildren && !optChildren(o);
  // Left-swipe only navigates into nodes that actually expand
  const canEnter = (o: TreeSelectOption) => !o.disabled && (!!optChildren(o) || canLoad(o));
  const checkboxOnLeft = () => local.checkboxPosition === 'left';
  const checkStrictly = () => local.checkStrictly ?? false;
  const onlyLeafCheckable = () => local.onlyLeafCheckable ?? false;
  const isLeaf = (o: TreeSelectOption) => {
    if (leafKey()) return (o[leafKey()!] as boolean) === true;
    const kids = optChildren(o);
    if (kids && kids.length > 0) return false;
    return !canLoad(o);
  };

  const isControlled = () => local.value !== undefined;
  const [innerVal, setInnerVal] = createSignal<(string | number)[]>(
    local.value ?? local.defaultValue ?? [],
  );
  createEffect(
    on(
      () => local.value,
      (v) => {
        if (v !== undefined) setInnerVal(v);
      },
    ),
  );
  const selected = () => innerVal();

  // ── open state (controlled via `show`) ──
  const [internalOpen, setInternalOpen] = createSignal(local.show ?? false);
  const [animated, setAnimated] = createSignal(false);
  createEffect(
    on(
      () => local.show,
      (v) => {
        if (v === true) openSheet();
        else if (v === false) closeSheet();
      },
    ),
  );

  // ── body scroll lock while open ──
  createEffect(
    on(
      () => internalOpen(),
      (open) => {
        if (open) lockBodyScroll();
        else unlockBodyScroll();
      },
    ),
  );

  // ── navigation stack ──
  const [stack, setStack] = createSignal<TreeSelectOption[][]>([local.options]);
  const currentOptions = createMemo(() => stack()[stack().length - 1]);
  const currentPath = createMemo(() =>
    stack()
      .slice(0, -1)
      .map((g) => g.find((o) => !!optChildren(o)) ?? g[0]),
  );

  // ── breadcrumb (Tabs nav) data ──
  const levelIndex = () => stack().length - 1;
  const breadcrumbTabs = () => [
    { name: '0', title: t('component.treeselect.all') },
    ...currentPath().map((opt, i) => ({ name: String(i + 1), title: optLabel(opt) })),
  ];
  // Tabs registers tabs imperatively and never unregisters, so key the whole
  // nav on the current path — a change remounts it with a fresh tab list.
  // Root level has nothing to navigate back to, so hide the nav entirely ('').
  const breadcrumbKey = () =>
    stack().length > 1 ? `${levelIndex()}:${currentPath().map(optKey).join('>')}` : '';

  // ── level-switch slide transition ──
  let listRef: HTMLDivElement | undefined;
  let levelAnim: Animation | undefined;
  const slideLevel = (dir: 'forward' | 'back') => {
    const el = listRef;
    if (!el || typeof el.animate !== 'function') return;
    const from = dir === 'forward' ? 36 : -36;
    levelAnim?.cancel();
    levelAnim = el.animate(
      [
        { transform: `translateX(${from}px)`, opacity: 0.3 },
        { transform: 'translateX(0px)', opacity: 1 },
      ],
      { duration: 220, easing: 'cubic-bezier(0.25, 0.9, 0.4, 1)' },
    );
  };

  // ── async-loaded children cache ──
  const [loadedChildren, setLoadedChildren] = createSignal<Record<string, TreeSelectOption[]>>({});
  const [loadingKeys, setLoadingKeys] = createSignal<Set<string>>(new Set());
  const [errorKeys, setErrorKeys] = createSignal<Set<string>>(new Set());
  const isLoading = (opt: TreeSelectOption) => loadingKeys().has(nodeKey(opt));
  const isError = (opt: TreeSelectOption) => errorKeys().has(nodeKey(opt));
  const retryLoad = (opt: TreeSelectOption) => {
    setErrorKeys((prev) => {
      const s = new Set(prev);
      s.delete(nodeKey(opt));
      return s;
    });
    push(opt);
  };

  const push = async (opt: TreeSelectOption) => {
    if (opt.disabled) return;
    const kids = optChildren(opt);
    if (kids && kids.length > 0) {
      navigateForward(kids);
      return;
    }
    if (!local.onLoadChildren) return;
    const key = nodeKey(opt);
    if (loadingKeys().has(key)) return;
    const cached = loadedChildren()[key];
    if (cached && cached.length > 0) {
      navigateForward(cached);
      return;
    }
    setLoadingKeys((prev) => new Set(prev).add(key));
    try {
      const children = await local.onLoadChildren(opt);
      if (children && children.length > 0) {
        setLoadedChildren((prev) => ({ ...prev, [key]: children }));
        navigateForward(children);
      } else {
        // cache empty results too, so we don't refetch a node with no children
        setLoadedChildren((prev) => ({ ...prev, [key]: [] }));
      }
    } catch {
      setErrorKeys((prev) => new Set(prev).add(key));
    } finally {
      setLoadingKeys((prev) => {
        const s = new Set(prev);
        s.delete(key);
        return s;
      });
    }
  };

  const navigateForward = (kids: TreeSelectOption[]) => {
    setStack([...stack(), kids]);
    slideLevel('forward');
  };

  // ── search ──
  const [search, setSearch] = createSignal('');
  const [remoteResults, setRemoteResults] = createSignal<TreeSelectOption[]>([]);
  const [searchLoading, setSearchLoading] = createSignal(false);
  const remoteMode = () => !!local.onSearch && search().trim().length > 0;
  const clearSearch = () => {
    setSearch('');
    setRemoteResults([]);
    setSearchLoading(false);
  };

  const handleSearchInput = (v: string) => {
    setSearch(v);
    if (!local.onSearch) return;
    const kw = v.trim();
    if (!kw) {
      setRemoteResults([]);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    Promise.resolve(local.onSearch(kw, local.options))
      .then((res) => {
        if (search().trim() === kw) {
          setRemoteResults(res);
          setSearchLoading(false);
        }
      })
      .catch(() => {
        if (search().trim() === kw) setSearchLoading(false);
      });
  };

  const filteredOptions = createMemo(() => {
    if (remoteMode()) return [];
    const kw = search().trim().toLowerCase();
    if (!kw || !local.searchable) return currentOptions();
    if (local.searchMode === 'global') return []; // global mode uses searchResults instead
    return currentOptions().filter((o) => optLabel(o).toLowerCase().includes(kw));
  });

  const popTo = (idx: number) => {
    clearSearch();
    setStack(stack().slice(0, idx + 1));
    slideLevel('back');
  };

  // Cap on how many global-search rows we render at once (big trees).
  const MAX_SEARCH_RESULTS = 100;

  // ── Global search: collect (option, path) pairs from entire tree ──
  const searchResults = createMemo(() => {
    const kw = search().trim().toLowerCase();
    if (!kw || !local.searchable || local.searchMode !== 'global') return null;
    const results: { opt: TreeSelectOption; path: TreeSelectOption[] }[] = [];
    function walk(list: TreeSelectOption[], path: TreeSelectOption[]) {
      for (const o of list) {
        if (results.length >= MAX_SEARCH_RESULTS) return;
        if (optLabel(o).toLowerCase().includes(kw)) results.push({ opt: o, path: [...path] });
        const kids = optChildren(o);
        if (kids && kids.length > 0) walk(kids, [...path, o]);
      }
    }
    walk(local.options, []);
    return results;
  });
  const jumpTo = (path: TreeSelectOption[], opt: TreeSelectOption) => {
    const kids = optChildren(opt);
    const lastLevel = kids && kids.length > 0 ? [...path, opt] : path;
    setStack([local.options, ...lastLevel.map((o) => optChildren(o) ?? [])]);
    clearSearch();
    slideLevel('forward');
  };

  // helper: all leaf keys under an option
  const leafKeys = (opt: TreeSelectOption) => collectLeafKeys(opt, vKey(), cKey(), leafKey());
  const countAll = (opt: TreeSelectOption) => leafKeys(opt).length;

  // The options currently on screen: remote search results, global search
  // result nodes, or the filtered current level.
  const visibleOptions = createMemo(() => {
    if (remoteMode()) return remoteResults();
    const sr = searchResults();
    if (sr) return sr.map((r) => r.opt);
    return filteredOptions();
  });

  // Empty state: nothing visible while searching, or the tree itself is empty.
  const isEmpty = () => {
    if (visibleOptions().length > 0) return false;
    if (searchLoading()) return false;
    return search().trim().length > 0 || local.options.length === 0;
  };

  // Commit a new selection, respecting controlled/uncontrolled.
  const commit = (next: (string | number)[]) => {
    if (isControlled()) local.onChange?.(next);
    else setInnerVal(next);
  };

  // ── selection semantics ──
  // Keys a row actually toggles. In strict mode every node is its own item;
  // otherwise parents toggle all their *checkable* leaves (disabled subtrees
  // are never selected).
  const toggleKeysOf = (opt: TreeSelectOption) => {
    if (checkStrictly()) return [optKey(opt)];
    if (isLeaf(opt)) return [optKey(opt)];
    return collectSelectableLeaves(opt, vKey(), cKey(), leafKey());
  };

  // Row highlight.
  const isSel = (opt: TreeSelectOption) => {
    if (checkStrictly()) return selected().includes(optKey(opt));
    return isLeaf(opt)
      ? selected().includes(optKey(opt))
      : leafKeys(opt).some((v) => selected().includes(v));
  };

  // Checkbox visual state: checked / indeterminate / unchecked.
  const checkState = (opt: TreeSelectOption): 'checked' | 'indeterminate' | 'unchecked' => {
    if (checkStrictly()) return selected().includes(optKey(opt)) ? 'checked' : 'unchecked';
    if (isLeaf(opt)) return selected().includes(optKey(opt)) ? 'checked' : 'unchecked';
    const leaves = collectSelectableLeaves(opt, vKey(), cKey(), leafKey());
    if (leaves.length === 0) return 'unchecked';
    const n = leaves.filter((v) => selected().includes(v)).length;
    if (n === 0) return 'unchecked';
    if (n === leaves.length) return 'checked';
    return 'indeterminate';
  };

  // mode-driven: what does clicking the main body do?
  const bodyAction = (opt: TreeSelectOption) => {
    if (local.mode === 'expand' && !isLeaf(opt)) {
      push(opt);
      return;
    }
    // "only leaf checkable" turns a parent-row tap in select mode into navigation
    if (local.mode === 'select' && onlyLeafCheckable() && !isLeaf(opt)) {
      push(opt);
      return;
    }
    toggleOption(opt);
  };

  // Whether the right-side zone holds a checkbox (expand mode, right position,
  // and the node is checkable — parents are excluded under onlyLeafCheckable).
  const expandShowsCheckbox = (opt: TreeSelectOption) =>
    local.mode === 'expand' && !checkboxOnLeft() && !(onlyLeafCheckable() && !isLeaf(opt));

  const arrowAction = (opt: TreeSelectOption) => {
    if (expandShowsCheckbox(opt)) toggleOption(opt);
    else push(opt);
  };

  const toggleOption = (opt: TreeSelectOption) => {
    if (opt.disabled) return;
    const current = selected();
    const vals = toggleKeysOf(opt);
    if (vals.length === 0) return; // every leaf is disabled — nothing to toggle
    const allSel = vals.every((v) => current.includes(v));
    let next: (string | number)[];
    if (allSel) {
      next = current.filter((v) => !vals.includes(v));
    } else {
      const toAdd = vals.filter((v) => !current.includes(v));
      if (local.max && local.max > 0 && current.length + toAdd.length > local.max) return;
      next = [...current, ...toAdd];
    }
    commit(next);
  };

  // Keys the "select all" control covers for the visible rows (deduped).
  const selectableKeysOfVisible = () =>
    [
      ...new Set(
        visibleOptions().flatMap((o) =>
          checkStrictly() ? [optKey(o)] : collectSelectableLeaves(o, vKey(), cKey(), leafKey()),
        ),
      ),
    ];

  const selectAll = () => {
    const leaves = selectableKeysOfVisible();
    const current = selected();
    const allSelected = leaves.length > 0 && leaves.every((v) => current.includes(v));
    let next: (string | number)[];
    if (allSelected) {
      next = current.filter((v) => !leaves.includes(v));
    } else {
      const toAdd = leaves.filter((v) => !current.includes(v));
      if (local.max && local.max > 0 && current.length + toAdd.length > local.max) return;
      next = [...current, ...toAdd];
    }
    commit(next);
  };

  const allChecked = () => {
    const leaves = selectableKeysOfVisible();
    return leaves.length > 0 && leaves.every((v) => selected().includes(v));
  };

  const allIndeterminate = () => {
    const leaves = selectableKeysOfVisible();
    if (leaves.length === 0) return false;
    const n = leaves.filter((v) => selected().includes(v)).length;
    return n > 0 && n < leaves.length;
  };

  // ── open / close ──
  function openSheet() {
    if (local.disabled || local.readonly) return;
    setStack([local.options]);
    clearSearch();
    setInternalOpen(true);
    requestAnimationFrame(() => setAnimated(true));
  }
  function closeSheet(reason?: 'confirm' | 'cancel') {
    if (reason === 'confirm') local.onConfirm?.(selected());
    else if (reason === 'cancel') local.onCancel?.();
    setAnimated(false);
    setTimeout(() => {
      setInternalOpen(false);
      local.onUpdateShow?.(false);
      local.onClose?.();
    }, 200);
  }
  const confirm = () => closeSheet('confirm');

  const displayText = () => {
    const s = selected();
    if (s.length === 0) return local.placeholder || t('component.treeselect.placeholder');
    if (local.format) return local.format(s, local.options);
    return `${s.length} ${t('component.treeselect.selected')}`;
  };

  const clearValue = () => {
    if (local.disabled || local.readonly) return;
    commit([]);
  };

  const loadErrorText = () => local.loadErrorText || t('component.treeselect.loadError');

  // ── imperative handle (ref) ──
  // When `show` is controlled, open/close delegate to onUpdateShow so the
  // parent's state stays the source of truth; otherwise drive internally.
  const apiOpen = () => {
    if (local.show !== undefined) local.onUpdateShow?.(true);
    else openSheet();
  };
  const apiClose = () => {
    if (local.show !== undefined) local.onUpdateShow?.(false);
    else closeSheet();
  };
  onMount(() => {
    const handle: TreeSelectHandle = {
      open: apiOpen,
      close: apiClose,
      setValue: (v) => commit(v),
      getValue: () => selected(),
      clear: clearValue,
      resetNavigation: () => {
        setStack([local.options]);
        clearSearch();
      },
    };
    local.ref?.(handle);
  });
  onCleanup(() => {
    local.ref?.(null as any);
  });

  return (
    <>
      {local.renderTrigger ? (
        local.renderTrigger({
          value: selected(),
          text: displayText(),
          open: openSheet,
          clear: clearValue,
        })
      ) : (
        <div
          class={cn(
            styles.trigger,
            local.class,
            local.disabled && styles.disabled,
            local.readonly && styles.readonly,
          )}
          style={typeof local.style === 'object' ? (local.style as Record<string, any>) : undefined}
          onClick={openSheet}
        >
          <span
            class={cn(styles.triggerText, selected().length === 0 && styles.triggerPlaceholder)}
          >
            {displayText()}
          </span>
          <Show when={local.clearable && selected().length > 0 && !local.disabled && !local.readonly}>
            <span
              class={styles.triggerClear}
              onClick={(e) => {
                e.stopPropagation();
                clearValue();
              }}
            >
              ✕
            </span>
          </Show>
          <Icon name="arrow-down" size={16} class={styles.triggerArrow} />
        </div>
      )}

      <Show when={internalOpen()}>
        <Portal
          mount={
            (local.teleport as Node) ??
            (typeof document !== 'undefined' ? document.body : undefined)
          }
        >
          <div
            class={cn(styles.overlay, animated() && styles.overlayEnter)}
            style={local.zIndex !== undefined ? { 'z-index': local.zIndex } : undefined}
            onClick={() => closeSheet('cancel')}
          >
            <div
              class={cn(styles.content, animated() && styles.contentEnter)}
              style={
                local.maxHeight
                  ? {
                      'max-height':
                        typeof local.maxHeight === 'number'
                          ? `${local.maxHeight}px`
                          : local.maxHeight,
                    }
                  : undefined
              }
              onClick={(e) => e.stopPropagation()}
            >
              <div class={styles.header}>
                <span class={styles.headerTitle}>
                  {local.title || t('component.treeselect.title')}
                </span>
                <Show when={local.closeable}>
                  <span class={styles.headerClose} onClick={() => closeSheet('cancel')}>
                    ✕
                  </span>
                </Show>
                <span class={styles.headerConfirm} onClick={confirm}>
                  {t('component.treeselect.confirm')}
                </span>
              </div>

              <Show when={breadcrumbKey()} keyed>
                <Tabs
                  active={String(levelIndex())}
                  onChange={(name) => popTo(Number(name))}
                  type="line"
                  class={styles.tabsNav}
                >
                  <For each={breadcrumbTabs()}>
                    {(tab) => <Tab name={tab.name} title={tab.title} />}
                  </For>
                </Tabs>
              </Show>

              <ScrollBar>
                <div ref={listRef} class={styles.list}>
                  {/* Search + Select All toolbar */}
                  <Show when={local.searchable}>
                    <div class={styles.toolbar}>
                      <div class={styles.searchWrap}>
                        <Icon name="search" size={14} class={styles.searchIcon} />
                        <input
                          class={styles.searchInput}
                          placeholder={t('component.treeselect.searchPlaceholder')}
                          value={search()}
                          onInput={(e) => handleSearchInput((e.target as HTMLInputElement).value)}
                        />
                        <Show when={search().length > 0}>
                          <span class={styles.searchClear} onClick={() => handleSearchInput('')}>
                            ✕
                          </span>
                        </Show>
                      </div>
                      <div class={styles.toolbarSelectAll} onClick={selectAll}>
                        <Checkbox
                          value="__all__"
                          checked={allChecked()}
                          indeterminate={allIndeterminate()}
                        />
                        <span class={styles.toolbarLabel}>
                          {t('component.treeselect.selectAll')}
                        </span>
                      </div>
                    </div>
                  </Show>
                  <Show when={!local.searchable}>
                    <Show
                      when={checkboxOnLeft()}
                      fallback={
                        <div
                          class={cn(styles.item, allChecked() && styles.selected)}
                          onClick={(e) => {
                            e.stopPropagation();
                            selectAll();
                          }}
                        >
                          <span class={styles.itemLabel}>
                            {t('component.treeselect.selectAll')}
                          </span>
                          <span
                            class={cn(styles.itemExpand, styles.itemExpandCheck)}
                            onClick={(e) => {
                              e.stopPropagation();
                              selectAll();
                            }}
                          >
                            <Checkbox
                              value="__all__"
                              checked={allChecked()}
                              indeterminate={allIndeterminate()}
                            />
                          </span>
                        </div>
                      }
                    >
                      <div
                        class={cn(styles.item, allChecked() && styles.selected)}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectAll();
                        }}
                      >
                        <span class={styles.itemBody}>
                          <span class={styles.itemCheckLeft}>
                            <Checkbox
                              value="__all__"
                              checked={allChecked()}
                              indeterminate={allIndeterminate()}
                            />
                          </span>
                          <span class={styles.itemLabel}>
                            {t('component.treeselect.selectAll')}
                          </span>
                        </span>
                      </div>
                    </Show>
                  </Show>

                  {/* Remote (onSearch) results */}
                  <Show when={remoteMode()}>
                    <Show
                      when={!searchLoading()}
                      fallback={
                        <div class={styles.loadingWrap}>
                          <Loading size={22} />
                        </div>
                      }
                    >
                      <For each={remoteResults()}>
                        {(opt) => {
                          const sel = isSel(opt);
                          return (
                            <div
                              class={cn(styles.item, opt.disabled && styles.disabled, sel && styles.selected)}
                              onClick={() => toggleOption(opt)}
                            >
                              <span class={styles.itemBody}>
                                <span class={styles.itemLabel}>{optLabel(opt)}</span>
                                <Show when={sel}>
                                  <Icon name="check" size={16} class={styles.itemCheck} />
                                </Show>
                              </span>
                            </div>
                          );
                        }}
                      </For>
                    </Show>
                  </Show>

                  {/* Global search results dropdown */}
                  <Show when={!remoteMode() && searchResults()}>
                    <For each={searchResults()!}>
                      {(item) => {
                        const sel = isSel(item.opt);
                        return (
                          <div
                            class={cn(
                              styles.item,
                              item.opt.disabled && styles.disabled,
                              sel && styles.selected,
                            )}
                            onClick={() => {
                              if (!item.opt.disabled) jumpTo(item.path, item.opt);
                            }}
                          >
                            <div class={styles.itemBody}>
                              <span class={styles.searchPath}>
                                {item.path.map((o) => optLabel(o)).join(' / ')} /{' '}
                              </span>
                              <span class={styles.itemLabel}>{optLabel(item.opt)}</span>
                              <Show when={sel}>
                                <Icon name="check" size={16} class={styles.itemCheck} />
                              </Show>
                            </div>
                          </div>
                        );
                      }}
                    </For>
                  </Show>

                  {/* Normal list (when not searching) */}
                  <Show when={!remoteMode() && !searchResults()}>
                    <For each={filteredOptions()}>
                      {(opt) => {
                        const sel = () => selected();
                        const isSelRow = () => isSel(opt);
                        const state = () => checkState(opt);
                        const expand = () => {
                          if (!opt.disabled) push(opt);
                        };

                        // Swipe navigation: left = into children, right = back a
                        // level. The swipe flag suppresses the row's tap action so
                        // a swipe never also toggles/enters.
                        const swipe = useSwipeGesture({
                          disabled: () => !local.swipeable,
                          onSwipeLeft: () => {
                            if (canEnter(opt)) push(opt);
                          },
                          onSwipeRight: () => {
                            if (stack().length > 1) popTo(stack().length - 2);
                          },
                        });

                        return local.renderItem ? (
                          local.renderItem(opt, isSelRow(), expand, () => toggleOption(opt))
                        ) : (
                          <div
                            class={cn(
                              styles.item,
                              opt.disabled && styles.disabled,
                              isSelRow() && styles.selected,
                            )}
                            {...swipe.handlers}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (swipe.consumeClick()) return;
                              if (!opt.disabled) bodyAction(opt);
                            }}
                          >
                            <span class={styles.itemBody}>
                              {/* Left-side checkbox (expand mode, checkboxPosition="left") */}
                              <Show
                                when={
                                  checkboxOnLeft() &&
                                  local.mode === 'expand' &&
                                  (!onlyLeafCheckable() || isLeaf(opt))
                                }
                              >
                                <span class={styles.itemCheckLeft}>
                                  <Checkbox
                                    value={optKey(opt)}
                                    checked={state() === 'checked'}
                                    indeterminate={state() === 'indeterminate'}
                                  />
                                </span>
                              </Show>
                              <span class={styles.itemLabel}>{optLabel(opt)}</span>
                              <Show when={!!optChildren(opt) && !checkStrictly()}>
                                <span class={styles.itemCount}>
                                  {sel().filter((v) => leafKeys(opt).includes(v)).length}/
                                  {countAll(opt)}
                                </span>
                              </Show>
                            </span>
                            {/* Right-side zone: checkbox (expand mode, right) or expand arrow.
                              With checkboxPosition="left", the right zone only shows the arrow
                              for non-leaf nodes — the checkbox is already on the left. */}
                            <Show
                              when={
                                checkboxOnLeft()
                                  ? !isLeaf(opt)
                                  : local.mode === 'expand' || !isLeaf(opt)
                              }
                            >
                              <span
                                class={cn(
                                  styles.itemExpand,
                                  expandShowsCheckbox(opt) && styles.itemExpandCheck,
                                )}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (swipe.consumeClick()) return;
                                  if (!opt.disabled) arrowAction(opt);
                                }}
                              >
                                <Show when={!isLoading(opt)} fallback={<Loading size={14} />}>
                                  <Show
                                    when={!isError(opt)}
                                    fallback={
                                      <span
                                        class={styles.itemRetry}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          retryLoad(opt);
                                        }}
                                      >
                                        {loadErrorText()}
                                      </span>
                                    }
                                  >
                                    {expandShowsCheckbox(opt) ? (
                                      <Checkbox
                                        value={optKey(opt)}
                                        checked={state() === 'checked'}
                                        indeterminate={state() === 'indeterminate'}
                                      />
                                    ) : (
                                      <Icon name="arrow-right" size={18} />
                                    )}
                                  </Show>
                                </Show>
                              </span>
                            </Show>
                          </div>
                        );
                      }}
                    </For>
                  </Show>

                  {/* Empty state: no options at all, or search found nothing */}
                  <Show when={isEmpty()}>
                    <div class={styles.emptyWrap}>
                      {local.emptyText || t('component.treeselect.empty')}
                    </div>
                  </Show>
                </div>
              </ScrollBar>

              <div class={styles.footer}>
                <span class={styles.footerCount}>
                  {selected().length} {t('component.treeselect.itemUnit')}
                </span>
              </div>
            </div>
          </div>
        </Portal>
      </Show>
    </>
  );
};
