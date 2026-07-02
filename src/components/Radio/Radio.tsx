import {
  createSignal, createEffect, on, createContext, useContext,
  mergeProps, splitProps, Show, type Component, type Accessor,
} from 'solid-js';
import { cn } from '../../utils';
import { useFormField } from '../Form/FormItem';
import type { RadioProps, RadioGroupProps, RadioShape } from './types';
import { emitEvent } from '../../event-bus';
import styles from './Radio.module.css';

/* ═══════════════════════════════════════════════════════════
   Context
   ═══════════════════════════════════════════════════════════ */

interface RadioGroupCtxValue {
  currentValue: Accessor<unknown>;
  onChange: (v: unknown) => void;
  disabled?: boolean;
  iconSize?: string | number;
  checkedColor?: string;
  shape?: RadioShape;
  checkedIcon?: Accessor<import('solid-js').JSX.Element | undefined>;
  uncheckedIcon?: Accessor<import('solid-js').JSX.Element | undefined>;
}

const RadioGroupContext = createContext<RadioGroupCtxValue>();

/* ═══════════════════════════════════════════════════════════
   Radio
   ═══════════════════════════════════════════════════════════ */

const radioDefaults: Partial<RadioProps> = {
  labelPosition: 'right',
  shape: 'round',
};

export const Radio: Component<RadioProps> = (rawProps) => {
  const props = mergeProps(radioDefaults, rawProps);
  const [local] = splitProps(props, [
    'value', 'label', 'disabled', 'labelDisabled', 'labelPosition',
    'iconSize', 'checkedColor', 'shape',
    'checkedIcon', 'uncheckedIcon',
    'class', 'style', 'name', 'checked', 'onChange',
  ]);

  const ctx = useContext(RadioGroupContext);

  /* standalone mode: self-manage checked state when no RadioGroup */
  const isStandalone = () => !ctx;
  const [selfChecked, setSelfChecked] = createSignal(!!local.checked);

  const isChecked = () => {
    if (ctx) return ctx.currentValue() === local.value;
    return local.checked !== undefined ? local.checked : selfChecked();
  };
  const isDisabled = () => local.disabled ?? ctx?.disabled;

  const iconSize = () => local.iconSize ?? ctx?.iconSize ?? '20px';
  const shape = (): RadioShape => local.shape ?? ctx?.shape ?? 'round';
  const color = () => local.checkedColor ?? ctx?.checkedColor;
  const cIcon = () => local.checkedIcon ?? ctx?.checkedIcon?.();
  const uIcon = () => local.uncheckedIcon ?? ctx?.uncheckedIcon?.();

  const cssVars = () => {
    const vars: Record<string, string> = {};
    if (iconSize()) vars['--sc-radio-icon-size'] = typeof iconSize() === 'number' ? `${iconSize()}px` : String(iconSize());
    if (color()) {
      vars['--sc-radio-checked-border-color'] = color()!;
      vars['--sc-radio-checked-bg'] = color()!;
    }
    return vars;
  };

  function onClick() {
    if (isDisabled()) return;
    if (isStandalone()) {
      const next = !isChecked();
      if (local.checked === undefined) setSelfChecked(next);
      local.onChange?.(next);
      emitEvent({ component: 'Radio', type: 'change', payload: next, timestamp: Date.now() });
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
    if (s === 'square') return <span class={styles.square} />;
    return <span class={styles.dot} />; // dot
  };

  return (
    <div
      class={cn(
        styles.wrapper,
        styles[`label${local.labelPosition === 'left' ? 'Left' : 'Right'}`],
        isChecked() && styles.checked,
        isDisabled() && styles.disabled,
        local.labelDisabled && styles.labelDisabled,
        local.class,
      )}
      style={{
        ...cssVars(),
        ...(typeof local.style === 'object' ? local.style : {}),
      }}
      onClick={local.labelDisabled ? () => {} : onClick}
      role="radio"
      aria-checked={isChecked()}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
    >
      {/* label left */}
      <Show when={local.label && local.labelPosition === 'left'}>
        <span class={styles.label} onClick={onLabelClick}>{local.label}</span>
      </Show>

      {/* icon */}
      <span class={styles.icon}>
        {isChecked()
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
   RadioGroup
   ═══════════════════════════════════════════════════════════ */

const groupDefaults: Partial<RadioGroupProps> = {
  direction: 'vertical',
  shape: 'round',
};

export const RadioGroup: Component<RadioGroupProps> = (rawProps) => {
  const props = mergeProps(groupDefaults, rawProps);
  const [local] = splitProps(props, [
    'value', 'defaultValue', 'onChange',
    'disabled', 'direction', 'gap',
    'iconSize', 'checkedColor', 'shape',
    'checkedIcon', 'uncheckedIcon',
    'class', 'style', 'children',
  ]);

  /* ── Form field context (optional) ── */
  const field = useFormField();

  /* ── Value management ── */
  const isControlled = () => local.value !== undefined || !!field;
  const [innerVal, setInnerVal] = createSignal<unknown>(
    local.value ?? field?.value ?? local.defaultValue ?? null,
  );

  createEffect(on(() => local.value, (v) => {
    if (local.value !== undefined) setInnerVal(v);
  }));

  createEffect(on(() => field?.value, (v) => {
    if (field && v !== undefined) setInnerVal(v);
  }));

  const currentValue = () => innerVal();

  const getGap = () => {
    if (local.gap !== undefined) return typeof local.gap === 'number' ? `${local.gap}px` : local.gap;
    return local.direction === 'horizontal' ? '12px' : '0';
  };

  function onChange(v: unknown) {
    if (local.disabled) return;
    if (!isControlled()) setInnerVal(v);
    if (field) { field.onChange(v); }
    else { local.onChange?.(v); }
    emitEvent({ component: 'Radio', type: 'change', payload: v, timestamp: Date.now() });
  }

  /* ── Context ── */
  const checkedIconAccessor = () => local.checkedIcon;
  const uncheckedIconAccessor = () => local.uncheckedIcon;

  const ctx: RadioGroupCtxValue = {
    currentValue,
    onChange,
    disabled: local.disabled,
    iconSize: local.iconSize,
    checkedColor: local.checkedColor,
    shape: local.shape,
    checkedIcon: checkedIconAccessor,
    uncheckedIcon: uncheckedIconAccessor,
  };

  /* ── Render ── */
  return (
    <RadioGroupContext.Provider value={ctx}>
      <div
        class={cn(
          local.class,
        )}
        role="radiogroup"
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
    </RadioGroupContext.Provider>
  );
};
