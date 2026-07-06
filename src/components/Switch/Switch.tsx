import {
  createSignal, createEffect, on,
  mergeProps,
  splitProps,
  type Component,
  type JSX,
} from 'solid-js';
import { cn, scopedStyle } from '../../utils';
import { useFormField } from '../Form/FormItem';
import type { SwitchProps } from './types';
import rawStyles from './Switch.module.css';
const styles = scopedStyle(rawStyles, 'sc-switch');
import { emitEvent } from '../../event-bus';

const defaultProps: Partial<SwitchProps> = {
  defaultChecked: false,
  size: 28,
};

/**
 * Switch 开关 — 在两种状态间切换的交互控件。
 *
 * 支持受控（`checked` + `onChange`）和非受控（`defaultChecked`）两种模式，
 * 可自定义尺寸、开关颜色以及禁用状态。
 *
 * @example 受控模式
 * ```tsx
 * const [on, setOn] = createSignal(false);
 * <Switch checked={on()} onChange={setOn} />
 * ```
 *
 * @example 非受控模式
 * ```tsx
 * <Switch defaultChecked={true} onChange={(v) => console.log(v)} />
 * ```
 *
 * @example 自定义颜色
 * ```tsx
 * <Switch activeColor="#22c55e" inactiveColor="#e5e7eb" />
 * ```
 */
export const Switch: Component<SwitchProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);

  const [local, rest] = splitProps(props, [
    'checked',
    'value',
    'defaultChecked',
    'onChange',
    'disabled',
    'size',
    'activeColor',
    'inactiveColor',
    'activeText',
    'inactiveText',
    'class',
    'style',
    'id',
  ]);

  // ── Form field context ──
  const field = useFormField();

  // ── Internal state ──
  // `value` is an alias for `checked`
  const checkedProp = () => local.checked ?? local.value;
  const isControlled = () => checkedProp() !== undefined || !!field;
  const [internalChecked, setInternalChecked] = createSignal(local.defaultChecked ?? (field?.value === true));
  const isOn = () => (isControlled() ? (field ? field.value === true : checkedProp()!) : internalChecked());

  // ── Toggle ──
  const toggle = () => {
    if (local.disabled) return;
    const next = !isOn();
    if (!isControlled()) {
      setInternalChecked(next);
    }
    local.onChange?.(next);
    if (field) field.onChange(next);
    emitEvent({ component: 'Switch', type: 'change', payload: next, props: props, timestamp: Date.now() });
  };

  // Sync from field context
  createEffect(on(() => field?.value, (v) => {
    if (field) {
      const next = typeof v === 'boolean' ? v : false;
      if (next !== isOn()) setInternalChecked(next);
    }
  }, { defer: false }));

  // ── Keyboard ──
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle();
    }
  };

  // ── Text ──
  const currentText = () => (isOn() ? local.activeText : local.inactiveText);
  const hasText = () => !!(local.activeText || local.inactiveText);

  // ── Computed size ──
  const sizePx = () =>
    typeof local.size === 'number' ? `${local.size}px` : local.size;

  // ── Inline style ──
  const inlineStyle = (): JSX.CSSProperties => {
    const s: JSX.CSSProperties = {
      '--_sw-size': sizePx(),
    };
    if (isOn() && local.activeColor) {
      s['background-color'] = local.activeColor;
    }
    if (!isOn() && local.inactiveColor) {
      s['background-color'] = local.inactiveColor;
    }
    if (typeof local.style === 'object' && local.style) {
      Object.assign(s, local.style);
    }
    return s;
  };

  // ── Classes ──
  const classes = () =>
    cn(
      styles.switch,
      isOn() && styles.on,
      local.disabled && styles.disabled,
      local.class,
    );

  return (
    <span class={styles.wrapper}>
      <button
        type="button"
        role="switch"
        aria-checked={isOn()}
        aria-disabled={local.disabled}
        aria-label={hasText() ? currentText() : undefined}
        class={classes()}
        style={inlineStyle()}
        id={local.id}
        disabled={local.disabled}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <span
          class={cn(styles.knob, isOn() && styles.knobOn)}
          aria-hidden="true"
        />
      </button>
      {hasText() && <span class={styles.label}>{currentText()}</span>}
    </span>
  );
};
