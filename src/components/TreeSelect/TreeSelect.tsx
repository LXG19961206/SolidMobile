import {
  createSignal, createEffect, createMemo, on, mergeProps, splitProps,
  Show, For, type Component,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import type { TreeSelectProps, TreeSelectOption } from './types';
import { cn, scopedStyle } from '../../utils';
import { Icon } from '../Icon';
import { Checkbox } from '../Checkbox';
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
  const isLeaf = (o: TreeSelectOption) => {
    if (leafKey()) return (o[leafKey()!] as boolean) === true;
    const kids = optChildren(o);
    return !kids || kids.length === 0;
  };

  const isControlled = () => local.value !== undefined;
  const [innerVal, setInnerVal] = createSignal<(string | number)[]>(local.value ?? local.defaultValue ?? []);
  createEffect(on(() => local.value, v => { if (v !== undefined) setInnerVal(v); }));
  const selected = () => innerVal();

  const [open, setOpen] = createSignal(false);
  const [stack, setStack] = createSignal<TreeSelectOption[][]>([local.options]);
  const currentOptions = createMemo(() => stack()[stack().length - 1]);
  const currentPath = createMemo(() => stack().slice(0, -1).map(g =>
    g.find(o => !!optChildren(o)) ?? g[0]));

  const push = (opt: TreeSelectOption) => {
    const kids = optChildren(opt);
    if (!kids || kids.length === 0) return;
    setStack([...stack(), kids]);
  };
  const popTo = (idx: number) => { setSearch(''); setStack(stack().slice(0, idx + 1)); };
  const [search, setSearch] = createSignal('');
  const filteredOptions = createMemo(() => {
    const kw = search().trim().toLowerCase();
    if (!kw || !local.searchable) return currentOptions();
    if (local.searchMode === 'global') return []; // global mode uses searchResults instead
    return currentOptions().filter(o => optLabel(o).toLowerCase().includes(kw));
  });

  // ── Global search: collect (option, path) pairs from entire tree ──
  const searchResults = createMemo(() => {
    const kw = search().trim().toLowerCase();
    if (!kw || !local.searchable || local.searchMode !== 'global') return null;
    const results: { opt: TreeSelectOption; path: TreeSelectOption[] }[] = [];
    function walk(list: TreeSelectOption[], path: TreeSelectOption[]) {
      for (const o of list) {
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
    setSearch('');
  };

  // helper: all leaf keys under an option
  const leafKeys = (opt: TreeSelectOption) =>
    collectLeafKeys(opt, vKey(), cKey(), leafKey());
  const countSel = (opt: TreeSelectOption) =>
    leafKeys(opt).filter(v => selected().includes(v)).length;
  const countAll = (opt: TreeSelectOption) =>
    leafKeys(opt).length;

  // mode-driven: what does clicking the main body do?
  const bodyAction = (opt: TreeSelectOption) => {
    if (local.mode === 'expand' && !isLeaf(opt)) push(opt);
    else toggleOption(opt);
  };
  const arrowAction = (opt: TreeSelectOption) => {
    if (local.mode === 'expand') {
      queueMicrotask(() => toggleOption(opt));
    } else {
      push(opt);
    }
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
    isControlled() ? local.onChange?.(next) : setInnerVal(next);
  };

  const selectAll = () => {
    const leaves = filteredOptions().flatMap(leafKeys);
    const current = selected();
    const allSelected = leaves.every(v => current.includes(v));
    let next: (string | number)[];
    if (allSelected) {
      next = current.filter(v => !leaves.includes(v));
    } else {
      const toAdd = leaves.filter(v => !current.includes(v));
      if (local.max && local.max > 0 && current.length + toAdd.length > local.max) return;
      next = [...current, ...toAdd];
    }
    isControlled() ? local.onChange?.(next) : setInnerVal(next);
  };

  const allChecked = () => {
    const leaves = filteredOptions().flatMap(leafKeys);
    return leaves.length > 0 && leaves.every(v => selected().includes(v));
  };
  const someChecked = () => {
    const leaves = filteredOptions().flatMap(leafKeys);
    return leaves.some(v => selected().includes(v)) && !allChecked();
  };

  const confirm = () => { setOpen(false); setStack([local.options]); };
  const openPicker = () => {
    if (local.disabled) return;
    setOpen(true);
    setStack([local.options]);
  };

  const displayText = () => {
    const s = selected();
    if (s.length === 0) return local.placeholder || t('component.treeselect.placeholder');
    return `${s.length} ${t('component.treeselect.selected')}`;
  };

  return (
    <>
      <div
        class={cn(styles.trigger, local.class, local.disabled && styles.disabled)}
        style={typeof local.style === 'object' ? local.style as Record<string, any> : undefined}
        onClick={openPicker}
      >
        <span class={cn(styles.triggerText, selected().length === 0 && styles.triggerPlaceholder)}>
          {displayText()}
        </span>
        <Icon name="arrow-down" size={16} class={styles.triggerArrow} />
      </div>

      <Show when={open()}>
        <Portal>
          <div class={styles.overlay} onClick={confirm}>
            <div class={styles.content} onClick={e => e.stopPropagation()}>
              <div class={styles.header}>
                <span class={styles.headerTitle}>{local.title || t('component.treeselect.title')}</span>
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
                        placeholder="Search..."
                        value={search()}
                        onInput={e => setSearch((e.target as HTMLInputElement).value)}
                      />
                      <Show when={search().length > 0}>
                        <span class={styles.searchClear} onClick={() => setSearch('')}>✕</span>
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
                    <span class={styles.itemExpand} onClick={e => e.stopPropagation()}>
                      <Checkbox value="__all__" checked={allChecked()} onChange={selectAll} />
                    </span>
                  </div>
                </Show>

                {/* Global search results dropdown */}
                <Show when={searchResults()}>
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

                {/* Normal list (when not global-searching) */}
                <Show when={!searchResults()}>

                <For each={filteredOptions()}>
                  {opt => {
                    const sel = () => selected();
                    const isSel = () => isLeaf(opt)
                      ? sel().includes(optKey(opt))
                      : leafKeys(opt).some(v => sel().includes(v));
                    const expand = () => { if (!opt.disabled) push(opt); };

                    return local.renderItem ? local.renderItem(opt, isSel(), expand) : (
                      <div class={cn(styles.item, opt.disabled && styles.disabled, isSel() && styles.selected)}>
                        <span class={styles.itemBody} onClick={e => { e.stopPropagation(); if (!opt.disabled) bodyAction(opt); }}>
                          <span class={styles.itemLabel}>{optLabel(opt)}</span>
                          <Show when={!isLeaf(opt)}>
                            <span class={styles.itemCount}>{sel().filter(v => leafKeys(opt).includes(v)).length}/{countAll(opt)}</span>
                          </Show>
                        </span>
                        <span class={styles.itemExpand}>
                          {local.mode === 'expand' ? (
                            <Checkbox value={optKey(opt)} checked={isSel()} onChange={() => { if (!opt.disabled) arrowAction(opt); }} />
                          ) : (
                            <Icon name="arrow-right" size={18}
                              onClick={e => { e.stopPropagation(); if (!opt.disabled) arrowAction(opt); }} />
                          )}
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
