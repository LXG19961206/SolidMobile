import {
  createSignal, createEffect, createMemo, on, mergeProps, splitProps,
  Show, For, type Component,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import type { TreeSelectProps, TreeSelectOption } from './types';
import { cn, scopedStyle } from '../../utils';
import { Icon } from '../Icon';
import { useT } from '../../i18n';
import rawStyles from './TreeSelect.module.css';
const styles = scopedStyle(rawStyles, 'sc-treeselect');

const defaultProps: Partial<TreeSelectProps> = {
  max: 0,
  placeholder: '',
  title: '',
};

/** Collect all leaf values under an option */
function collectLeafValues(opt: TreeSelectOption): (string | number)[] {
  if (!opt.children || opt.children.length === 0) return [opt.value];
  return opt.children.flatMap(collectLeafValues);
}

/** Count how many of option's leaf values are in the selection */
function countSelected(opt: TreeSelectOption, sel: (string | number)[]): number {
  return collectLeafValues(opt).filter(v => sel.includes(v)).length;
}

/** Count total leaf values under an option */
function countLeaves(opt: TreeSelectOption): number {
  return collectLeafValues(opt).length;
}

export const TreeSelect: Component<TreeSelectProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'options', 'value', 'defaultValue', 'onChange', 'max',
    'placeholder', 'title', 'disabled', 'onLoadChildren',
    'class', 'style',
  ]);
  const t = useT();

  const isControlled = () => local.value !== undefined;
  const [innerVal, setInnerVal] = createSignal<(string | number)[]>(local.value ?? local.defaultValue ?? []);
  createEffect(on(() => local.value, v => { if (v !== undefined) setInnerVal(v); }));
  const selected = () => innerVal();

  const [open, setOpen] = createSignal(false);
  const [stack, setStack] = createSignal<TreeSelectOption[][]>([local.options]);
  const currentOptions = createMemo(() => stack()[stack().length - 1]);
  const currentPath = createMemo(() => stack().slice(0, -1).map(g => g.find(o => o.children) ?? g[0]));

  const push = (opt: TreeSelectOption) => {
    if (!opt.children || opt.children.length === 0) return; // leaf
    setStack([...stack(), opt.children]);
  };
  const popTo = (idx: number) => {
    setStack(stack().slice(0, idx + 1));
  };

  const isLeaf = (opt: TreeSelectOption) => !opt.children || opt.children.length === 0;

  const toggleOption = (opt: TreeSelectOption) => {
    const current = selected();
    if (isLeaf(opt)) {
      const idx = current.indexOf(opt.value);
      let next: (string | number)[];
      if (idx >= 0) {
        next = [...current]; next.splice(idx, 1);
      } else {
        if (local.max && local.max > 0 && current.length >= local.max) return;
        next = [...current, opt.value];
      }
      isControlled() ? local.onChange?.(next) : setInnerVal(next);
    }
  };

  const selectAll = () => {
    const leaves = currentOptions().flatMap(collectLeafValues);
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
    const leaves = currentOptions().flatMap(collectLeafValues);
    return leaves.length > 0 && leaves.every(v => selected().includes(v));
  };
  const someChecked = () => {
    const leaves = currentOptions().flatMap(collectLeafValues);
    return leaves.some(v => selected().includes(v)) && !allChecked();
  };

  const confirm = () => {
    setOpen(false);
    setStack([local.options]);
  };

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
      {/* Trigger */}
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

      {/* Overlay */}
      <Show when={open()}>
        <Portal>
          <div class={styles.overlay} onClick={confirm}>
            <div class={styles.content} onClick={e => e.stopPropagation()}>
              {/* Header */}
              <div class={styles.header}>
                <span class={styles.headerCancel} onClick={confirm}>{t('component.treeselect.confirm')}</span>
                <span class={styles.headerTitle}>{local.title || t('component.treeselect.title')}</span>
              </div>

              {/* Tabs */}
              <div class={styles.tabs}>
                <span class={cn(styles.tab, stack().length === 1 && styles.tabActive)} onClick={() => popTo(0)}>
                  {t('component.treeselect.all')}
                </span>
                <For each={currentPath()}>
                  {(opt, i) => (
                    <span class={cn(styles.tab, i() === stack().length - 2 && styles.tabActive)} onClick={() => popTo(i() + 1)}>
                      <span class={styles.tabSep}>/</span> {opt.label}
                    </span>
                  )}
                </For>
              </div>

              {/* List */}
              <div class={styles.list}>
                {/* Select All */}
                <div class={cn(styles.item, styles.selectAll)} onClick={e => { e.stopPropagation(); selectAll(); }}>
                  <span class={cn(styles.checkbox, allChecked() && styles.checked, someChecked() && styles.indeterminate)}>
                    <Show when={allChecked() || someChecked()}><span class={styles.checkMark}>✓</span></Show>
                  </span>
                  <span class={styles.itemLabel}>{t('component.treeselect.selectAll')}</span>
                </div>

                <For each={currentOptions()}>
                  {opt => (
                    <div
                      class={cn(styles.item, opt.disabled && styles.disabled)}
                      onClick={e => { e.stopPropagation();
                        if (opt.disabled) return;
                        if (isLeaf(opt)) toggleOption(opt);
                        else push(opt);
                      }}
                    >
                      <Show when={isLeaf(opt)}>
                        <span class={cn(styles.checkbox, selected().includes(opt.value) && styles.checked)}>
                          <Show when={selected().includes(opt.value)}><span class={styles.checkMark}>✓</span></Show>
                        </span>
                      </Show>
                      <Show when={!isLeaf(opt)}>
                        <span class={cn(styles.checkbox, countSelected(opt, selected()) === countLeaves(opt) && styles.checked, countSelected(opt, selected()) > 0 && countSelected(opt, selected()) < countLeaves(opt) && styles.indeterminate)}>
                          <Show when={countSelected(opt, selected()) === countLeaves(opt)}><span class={styles.checkMark}>✓</span></Show>
                          <Show when={countSelected(opt, selected()) > 0 && countSelected(opt, selected()) < countLeaves(opt)}><span class={styles.checkMark}>−</span></Show>
                        </span>
                      </Show>
                      <span class={styles.itemLabel}>{opt.label}</span>
                      <Show when={!isLeaf(opt)}>
                        <span class={styles.itemCount}>
                          {countSelected(opt, selected())}/{countLeaves(opt)}
                        </span>
                        <Icon name="arrow-right" size={14} class={styles.itemArrow} />
                      </Show>
                    </div>
                  )}
                </For>
              </div>

              {/* Bottom bar */}
              <div class={styles.footer}>
                <span class={styles.footerCount}>
                  {selected().length} {t('component.treeselect.itemUnit')}
                </span>
                <span class={styles.footerBtn} onClick={confirm}>{t('component.treeselect.confirm')}</span>
              </div>
            </div>
          </div>
        </Portal>
      </Show>
    </>
  );
};
