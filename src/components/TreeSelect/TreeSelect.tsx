import {
  createSignal, createEffect, createMemo, on, mergeProps, splitProps,
  Show, For, type Component,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import type { TreeSelectProps, TreeSelectOption } from './types';
import { cn, scopedStyle } from '../../utils';
import { Icon } from '../Icon';
import { Checkbox } from '../Checkbox';
import { Loading } from '../Loading';
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
};

/** Collect all leaf keys under an option */
function collectLeafKeys(opt: TreeSelectOption, vk: string, ck: string, lk?: string): (string | number)[] {
  if (lk && opt[lk] === true) return [opt[vk]];
  const kids = opt[ck] as TreeSelectOption[] | undefined;
  if (!kids || kids.length === 0) return [opt[vk]];
  return kids.flatMap(c => collectLeafKeys(c, vk, ck, lk));
}

export const TreeSelect: Component<TreeSelectProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'options', 'value', 'defaultValue', 'onChange', 'max',
    'fieldNames', 'mode', 'renderItem',
    'placeholder', 'title', 'disabled', 'searchable', 'searchMode', 'onSearch', 'onLoadChildren',
    'show', 'onUpdateShow', 'onClose', 'closeable', 'teleport', 'zIndex', 'maxHeight',
    'class', 'style',
  ]);
  const t = useT();

  // ── field name mapping ──
  const vKey = () => local.fieldNames?.value ?? 'value';
  const lKey = () => local.fieldNames?.label ?? 'label';
  const cKey = () => local.fieldNames?.children ?? 'children';
  const leafKey = () => local.fieldNames?.leaf;

  const optLabel = (o: TreeSelectOption) => o[lKey()] as string;
  const optKey = (o: TreeSelectOption) => o[vKey()] as string | number;
  const optChildren = (o: TreeSelectOption) => (o[cKey()] as TreeSelectOption[] | undefined);
  const nodeKey = (o: TreeSelectOption) => String(optKey(o));
  // A node without children is still expandable when an async loader exists
  const canLoad = (o: TreeSelectOption) => !!local.onLoadChildren && !optChildren(o);
  const isLeaf = (o: TreeSelectOption) => {
    if (leafKey()) return (o[leafKey()!] as boolean) === true;
    const kids = optChildren(o);
    if (kids && kids.length > 0) return false;
    return !canLoad(o);
  };

  const isControlled = () => local.value !== undefined;
  const [innerVal, setInnerVal] = createSignal<(string | number)[]>(local.value ?? local.defaultValue ?? []);
  createEffect(on(() => local.value, v => { if (v !== undefined) setInnerVal(v); }));
  const selected = () => innerVal();

  // ── open state (controlled via `show`) ──
  const [internalOpen, setInternalOpen] = createSignal(local.show ?? false);
  const [animated, setAnimated] = createSignal(false);
  createEffect(on(() => local.show, (v) => {
    if (v === true) openSheet();
    else if (v === false) closeSheet();
  }));

  // ── navigation stack ──
  const [stack, setStack] = createSignal<TreeSelectOption[][]>([local.options]);
  const currentOptions = createMemo(() => stack()[stack().length - 1]);
  const currentPath = createMemo(() => stack().slice(0, -1).map(g =>
    g.find(o => !!optChildren(o)) ?? g[0]));

  // ── async-loaded children cache ──
  const [loadedChildren, setLoadedChildren] = createSignal<Record<string, TreeSelectOption[]>>({});
  const [loadingKeys, setLoadingKeys] = createSignal<Set<string>>(new Set());

  const push = async (opt: TreeSelectOption) => {
    if (opt.disabled) return;
    const kids = optChildren(opt);
    if (kids && kids.length > 0) { setStack([...stack(), kids]); return; }
    if (!local.onLoadChildren) return;
    const key = nodeKey(opt);
    if (loadingKeys().has(key)) return;
    const cached = loadedChildren()[key];
    if (cached) { setStack([...stack(), cached]); return; }
    setLoadingKeys(prev => new Set(prev).add(key));
    try {
      const children = await local.onLoadChildren(opt);
      if (children && children.length > 0) {
        setLoadedChildren(prev => ({ ...prev, [key]: children }));
        setStack([...stack(), children]);
      }
    } finally {
      setLoadingKeys(prev => { const s = new Set(prev); s.delete(key); return s; });
    }
  };

  // ── search ──
  const [search, setSearch] = createSignal('');
  const [remoteResults, setRemoteResults] = createSignal<TreeSelectOption[]>([]);
  const [searchLoading, setSearchLoading] = createSignal(false);
  const remoteMode = () => !!local.onSearch && search().trim().length > 0;
  const clearSearch = () => { setSearch(''); setRemoteResults([]); setSearchLoading(false); };

  const handleSearchInput = (v: string) => {
    setSearch(v);
    if (!local.onSearch) return;
    const kw = v.trim();
    if (!kw) { setRemoteResults([]); setSearchLoading(false); return; }
    setSearchLoading(true);
    Promise.resolve(local.onSearch(kw, local.options))
      .then(res => {
        if (search().trim() === kw) { setRemoteResults(res); setSearchLoading(false); }
      })
      .catch(() => { if (search().trim() === kw) setSearchLoading(false); });
  };

  const filteredOptions = createMemo(() => {
    if (remoteMode()) return [];
    const kw = search().trim().toLowerCase();
    if (!kw || !local.searchable) return currentOptions();
    if (local.searchMode === 'global') return []; // global mode uses searchResults instead
    return currentOptions().filter(o => optLabel(o).toLowerCase().includes(kw));
  });

  const popTo = (idx: number) => { clearSearch(); setStack(stack().slice(0, idx + 1)); };

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
    setStack([local.options, ...lastLevel.map(o => optChildren(o) ?? [])]);
    clearSearch();
  };

  // helper: all leaf keys under an option
  const leafKeys = (opt: TreeSelectOption) =>
    collectLeafKeys(opt, vKey(), cKey(), leafKey());
  const countAll = (opt: TreeSelectOption) =>
    leafKeys(opt).length;

  // The options currently on screen: remote search results, global search
  // result nodes, or the filtered current level.
  const visibleOptions = createMemo(() => {
    if (remoteMode()) return remoteResults();
    const sr = searchResults();
    if (sr) return sr.map(r => r.opt);
    return filteredOptions();
  });

  // Commit a new selection, respecting controlled/uncontrolled.
  const commit = (next: (string | number)[]) => {
    if (isControlled()) local.onChange?.(next);
    else setInnerVal(next);
  };

  // mode-driven: what does clicking the main body do?
  const bodyAction = (opt: TreeSelectOption) => {
    if (local.mode === 'expand' && !isLeaf(opt)) push(opt);
    else toggleOption(opt);
  };
  const arrowAction = (opt: TreeSelectOption) => {
    if (local.mode === 'expand') toggleOption(opt);
    else push(opt);
  };

  const toggleOption = (opt: TreeSelectOption) => {
    const current = selected();
    const vals = isLeaf(opt) ? [optKey(opt)] : leafKeys(opt);
    const allSel = vals.every(v => current.includes(v));
    let next: (string | number)[];
    if (allSel) {
      next = current.filter(v => !vals.includes(v));
    } else {
      const toAdd = vals.filter(v => !current.includes(v));
      if (local.max && local.max > 0 && current.length + toAdd.length > local.max) return;
      next = [...current, ...toAdd];
    }
    commit(next);
  };

  const selectAll = () => {
    const leaves = visibleOptions().flatMap(leafKeys);
    const current = selected();
    const allSelected = leaves.length > 0 && leaves.every(v => current.includes(v));
    let next: (string | number)[];
    if (allSelected) {
      next = current.filter(v => !leaves.includes(v));
    } else {
      const toAdd = leaves.filter(v => !current.includes(v));
      if (local.max && local.max > 0 && current.length + toAdd.length > local.max) return;
      next = [...current, ...toAdd];
    }
    commit(next);
  };

  const allChecked = () => {
    const leaves = visibleOptions().flatMap(leafKeys);
    return leaves.length > 0 && leaves.every(v => selected().includes(v));
  };

  // ── open / close ──
  function openSheet() {
    if (local.disabled) return;
    setStack([local.options]);
    setInternalOpen(true);
    requestAnimationFrame(() => setAnimated(true));
  }
  function closeSheet() {
    setAnimated(false);
    setTimeout(() => {
      setInternalOpen(false);
      local.onUpdateShow?.(false);
      local.onClose?.();
    }, 200);
  }
  const confirm = closeSheet;

  const displayText = () => {
    const s = selected();
    if (s.length === 0) return local.placeholder || t('component.treeselect.placeholder');
    return `${s.length} ${t('component.treeselect.selected')}`;
  };

  const isLoading = (opt: TreeSelectOption) => loadingKeys().has(nodeKey(opt));

  return (
    <>
      <div
        class={cn(styles.trigger, local.class, local.disabled && styles.disabled)}
        style={typeof local.style === 'object' ? local.style as Record<string, any> : undefined}
        onClick={openSheet}
      >
        <span class={cn(styles.triggerText, selected().length === 0 && styles.triggerPlaceholder)}>
          {displayText()}
        </span>
        <Icon name="arrow-down" size={16} class={styles.triggerArrow} />
      </div>

      <Show when={internalOpen()}>
        <Portal mount={local.teleport as Node ?? (typeof document !== 'undefined' ? document.body : undefined)}>
          <div
            class={cn(styles.overlay, animated() && styles.overlayEnter)}
            style={local.zIndex !== undefined ? { 'z-index': local.zIndex } : undefined}
            onClick={closeSheet}
          >
            <div
              class={cn(styles.content, animated() && styles.contentEnter)}
              style={local.maxHeight ? { 'max-height': typeof local.maxHeight === 'number' ? `${local.maxHeight}px` : local.maxHeight } : undefined}
              onClick={e => e.stopPropagation()}
            >
              <div class={styles.header}>
                <span class={styles.headerTitle}>{local.title || t('component.treeselect.title')}</span>
                <Show when={local.closeable}>
                  <span class={styles.headerClose} onClick={closeSheet}>✕</span>
                </Show>
                <span class={styles.headerConfirm} onClick={confirm}>{t('component.treeselect.confirm')}</span>
              </div>

              <div class={styles.tabs}>
                <span class={cn(styles.tab, stack().length === 1 && styles.tabActive)} onClick={() => popTo(0)}>
                  {t('component.treeselect.all')}
                </span>
                <For each={currentPath()}>
                  {(opt, i) => (
                    <span class={cn(styles.tab, i() === stack().length - 2 && styles.tabActive)} onClick={() => popTo(i() + 1)}>
                      <span class={styles.tabSep}>/</span> {optLabel(opt)}
                    </span>
                  )}
                </For>
              </div>

              <div class={styles.list}>
                {/* Search + Select All toolbar */}
                <Show when={local.searchable}>
                  <div class={styles.toolbar}>
                    <div class={styles.searchWrap}>
                      <Icon name="search" size={14} class={styles.searchIcon} />
                      <input
                        class={styles.searchInput}
                        placeholder={t('component.treeselect.searchPlaceholder')}
                        value={search()}
                        onInput={e => handleSearchInput((e.target as HTMLInputElement).value)}
                      />
                      <Show when={search().length > 0}>
                        <span class={styles.searchClear} onClick={() => handleSearchInput('')}>✕</span>
                      </Show>
                    </div>
                    <div class={styles.toolbarSelectAll} onClick={selectAll}>
                      <Checkbox value="__all__" checked={allChecked()} />
                      <span class={styles.toolbarLabel}>{t('component.treeselect.selectAll')}</span>
                    </div>
                  </div>
                </Show>
                <Show when={!local.searchable}>
                  <div class={cn(styles.item, allChecked() && styles.selected)} onClick={e => { e.stopPropagation(); selectAll(); }}>
                    <span class={styles.itemLabel}>{t('component.treeselect.selectAll')}</span>
                    <span class={styles.itemExpand} onClick={e => { e.stopPropagation(); selectAll(); }}>
                      <Checkbox value="__all__" checked={allChecked()} />
                    </span>
                  </div>
                </Show>

                {/* Remote (onSearch) results */}
                <Show when={remoteMode()}>
                  <Show
                    when={!searchLoading()}
                    fallback={<div class={styles.loadingWrap}><Loading size={22} /></div>}
                  >
                    <For each={remoteResults()}>
                      {opt => {
                        const sel = isLeaf(opt)
                          ? selected().includes(optKey(opt))
                          : leafKeys(opt).some(v => selected().includes(v));
                        return (
                          <div class={cn(styles.item, sel && styles.selected)} onClick={() => toggleOption(opt)}>
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
                    {item => {
                      const sel = isLeaf(item.opt)
                        ? selected().includes(optKey(item.opt))
                        : leafKeys(item.opt).some(v => selected().includes(v));
                      return (
                        <div class={cn(styles.item, sel && styles.selected)} onClick={() => jumpTo(item.path, item.opt)}>
                          <div class={styles.itemBody}>
                            <span class={styles.searchPath}>
                              {item.path.map(o => optLabel(o)).join(' / ')} /{' '}
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
                    {opt => {
                      const sel = () => selected();
                      const isSel = () => isLeaf(opt)
                        ? sel().includes(optKey(opt))
                        : leafKeys(opt).some(v => sel().includes(v));
                      const expand = () => { if (!opt.disabled) push(opt); };

                      return local.renderItem ? local.renderItem(opt, isSel(), expand, () => toggleOption(opt)) : (
                        <div
                          class={cn(styles.item, opt.disabled && styles.disabled, isSel() && styles.selected)}
                          onClick={e => { e.stopPropagation(); if (!opt.disabled) bodyAction(opt); }}
                        >
                          <span class={styles.itemBody}>
                            <span class={styles.itemLabel}>{optLabel(opt)}</span>
                            <Show when={!!optChildren(opt)}>
                              <span class={styles.itemCount}>{sel().filter(v => leafKeys(opt).includes(v)).length}/{countAll(opt)}</span>
                            </Show>
                          </span>
                          <span class={styles.itemExpand} onClick={e => { e.stopPropagation(); if (!opt.disabled) arrowAction(opt); }}>
                            <Show when={!isLoading(opt)} fallback={<Loading size={14} />}>
                              {local.mode === 'expand' ? (
                                <Checkbox value={optKey(opt)} checked={isSel()} />
                              ) : (
                                <Icon name="arrow-right" size={18} />
                              )}
                            </Show>
                          </span>
                        </div>
                      );
                    }}
                  </For>
                </Show>

              </div>

              <div class={styles.footer}>
                <span class={styles.footerCount}>{selected().length} {t('component.treeselect.itemUnit')}</span>
              </div>
            </div>
          </div>
        </Portal>
      </Show>
    </>
  );
};
