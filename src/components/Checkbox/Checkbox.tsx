import {
  createSignal, createEffect, on, createContext, useContext,
  mergeProps, splitProps, Show, type Component, type Accessor,
} from 'solid-js';
import { cn } from '../../utils';
import { useFormField } from '../Form/FormItem';
import type { CheckboxProps, CheckboxGroupProps, CheckboxShape } from './types';
import { emitEvent } from '../../event-bus';
import styles from './Checkbox.module.css';

/* ═══════════════════════════════════════════════════════════
   Context
   ═══════════════════════════════════════════════════════════ */

interface CheckboxGroupCtxValue {
  currentValues: Accessor<unknown[]>;
  onChange: (value: unknown) => void;
  disabled?: boolean;
  iconSize?: string | number;
  checkedColor?: string;
  shape?: CheckboxShape;
  checkedIcon?: Accessor<import('solid-js').JSX.Element | undefined>;
  uncheckedIcon?: Accessor<import('solid-js').JSX.Element | undefined>;
  max?: number;
  min?: number;
}

const CheckboxGroupContext = createContext<CheckboxGroupCtxValue>();

/* ═══════════════════════════════════════════════════════════
   Checkbox
   ═══════════════════════════════════════════════════════════ */

const checkboxDefaults: Partial<CheckboxProps> = {
  labelPosition: 'right',
  shape: 'square',
};

export const Checkbox: Component<CheckboxProps> = (rawProps) => {
  const props = mergeProps(checkboxDefaults, rawProps);
  const [local] = splitProps(props, [
    'value', 'label', 'disabled', 'labelDisabled', 'labelPosition',
    'iconSize', 'checkedColor', 'shape',
    'checkedIcon', 'uncheckedIcon', 'indeterminateIcon',
    'class', 'style', 'name', 'checked', 'defaultChecked', 'indeterminate', 'onChange',
  ]);

  const ctx = useContext(CheckboxGroupContext);

  /* standalone mode: self-manage checked state when no CheckboxGroup */
  const isStandalone = () => !ctx;
  const [selfChecked, setSelfChecked] = createSignal(local.defaultChecked ?? local.checked ?? false);

  const isChecked = () => {
    if (ctx) return ctx.currentValues().includes(local.value);
    return local.checked !== undefined ? local.checked : selfChecked();
  };

  const isIndeterminate = () => local.indeterminate;

  const isDisabled = () => local.disabled ?? ctx?.disabled;

  const iconSize = () => local.iconSize ?? ctx?.iconSize ?? '20px';
  const shape = (): CheckboxShape => local.shape ?? ctx?.shape ?? 'square';
  const color = () => local.checkedColor ?? ctx?.checkedColor;
  const cIcon = () => local.checkedIcon ?? ctx?.checkedIcon?.();
  const uIcon = () => local.uncheckedIcon ?? ctx?.uncheckedIcon?.();
  const iIcon = () => local.indeterminateIcon;

  const cssVars = () => {
    const vars: Record<string, string> = {};
    const sz = iconSize();
    if (sz) vars['--sc-checkbox-icon-size'] = typeof sz === 'number' ? `${sz}px` : String(sz);
    if (color()) {
      vars['--sc-checkbox-checked-border-color'] = color()!;
      vars['--sc-checkbox-checked-bg'] = color()!;
    }
    return vars;
  };

  function onClick() {
    if (isDisabled()) return;
    if (isStandalone()) {
      const next = !isChecked();
      if (local.checked === undefined) setSelfChecked(next);
      local.onChange?.(next);
      emitEvent({ component: 'Checkbox', type: 'change', payload: next, props: props, timestamp: Date.now() });
    } else {
      ctx!.onChange(local.value);
    }
  }

  function onLabelClick(e: MouseEvent) {
    if (local.labelDisabled) return;
    onClick();
  }

  const defaultIcon = () => {
    const s = shape();
    if (s === 'round') return <span class={styles.round} />;
    return <span class={styles.square} />;
  };

  return (
    <div
      class={cn(
        styles.wrapper,
        styles[`label${local.labelPosition === 'left' ? 'Left' : 'Right'}`],
        isChecked() && styles.checked,
        isIndeterminate() && styles.indeterminate,
        isDisabled() && styles.disabled,
        local.labelDisabled && styles.labelDisabled,
        local.class,
      )}
      style={{
        ...cssVars(),
        ...(typeof local.style === 'object' ? local.style : {}),
      }}
      onClick={local.labelDisabled ? () => {} : onClick}
      role="checkbox"
      aria-checked={isIndeterminate() ? 'mixed' : isChecked()}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
    >
      {/* label left */}
      <Show when={local.label && local.labelPosition === 'left'}>
        <span class={styles.label} onClick={onLabelClick}>{local.label}</span>
      </Show>

      {/* icon */}
      <span class={styles.icon}>
        {isIndeterminate()
          ? (iIcon() ?? defaultIcon())
          : isChecked()
            ? (cIcon() ?? defaultIcon())
            : (uIcon() ?? defaultIcon())
        }
      </span>

      {/* label right */}
      <Show when={local.label && local.labelPosition !== 'left'}>
        <span class={styles.label} onClick={onLabelClick}>{local.label}</span>
      </Show>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   CheckboxGroup
   ═══════════════════════════════════════════════════════════ */

const groupDefaults: Partial<CheckboxGroupProps> = {
  direction: 'vertical',
  shape: 'square',
};

export const CheckboxGroup: Component<CheckboxGroupProps> = (rawProps) => {
  const props = mergeProps(groupDefaults, rawProps);
  const [local] = splitProps(props, [
    'value', 'defaultValue', 'onChange',
    'disabled', 'direction', 'gap',
    'iconSize', 'checkedColor', 'shape',
    'checkedIcon', 'uncheckedIcon',
    'class', 'style', 'children', 'max', 'min',
  ]);

  /* ── Form field context (optional) ── */
  const field = useFormField();

  /* ── Value management ── */
  const isControlled = () => local.value !== undefined || !!field;
  const fieldVal = (): unknown[] => {
    const v = field?.value;
    return Array.isArray(v) ? v : [];
  };
  const [innerVal, setInnerVal] = createSignal<unknown[]>(
    local.value ?? (field ? fieldVal() : local.defaultValue) ?? [],
  );

  createEffect(on(() => local.value, (v) => {
    if (local.value !== undefined) setInnerVal(v ?? []);
  }));

  createEffect(on(() => field?.value, (v) => {
    if (field && v !== undefined) {
      setInnerVal(Array.isArray(v) ? v : []);
    }
  }));

  const currentValues = () => innerVal();

  function onChange(v: unknown) {
    if (local.disabled) return;
    const current = innerVal();
    const idx = current.indexOf(v);
    let next: unknown[];
    if (idx >= 0) {
      next = current.filter((item) => item !== v);
      // respect min
      if (local.min !== undefined && next.length < local.min) return;
    } else {
      // respect max
      if (local.max !== undefined && current.length >= local.max) return;
      next = [...current, v];
    }
    if (!isControlled()) setInnerVal(next);
    if (field) { field.onChange(next); }
    else { local.onChange?.(next); }
    emitEvent({ component: 'Checkbox', type: 'change', payload: next, props: props, timestamp: Date.now() });
  }

  /* ── Context ── */
  const checkedIconAccessor = () => local.checkedIcon;
  const uncheckedIconAccessor = () => local.uncheckedIcon;

  const getGap = () => {
    if (local.gap !== undefined) return typeof local.gap === 'number' ? `${local.gap}px` : local.gap;
    return local.direction === 'horizontal' ? '12px' : '0';
  };

  const ctx: CheckboxGroupCtxValue = {
    currentValues,
    onChange,
    disabled: local.disabled,
    iconSize: local.iconSize,
    checkedColor: local.checkedColor,
    shape: local.shape,
    checkedIcon: checkedIconAccessor,
    uncheckedIcon: uncheckedIconAccessor,
    max: local.max,
    min: local.min,
  };

  /* ── Render ── */
  return (
    <CheckboxGroupContext.Provider value={ctx}>
      <div
        class={cn(local.class)}
        role="group"
        style={{
          display: 'flex',
          'flex-direction': local.direction === 'horizontal' ? 'row' : 'column',
          'flex-wrap': 'wrap',
          gap: getGap(),
          ...(typeof local.style === 'object' ? local.style : {}),
        }}
      >
        {local.children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};
