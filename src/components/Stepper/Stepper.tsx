import {
  createSignal, createEffect, on, mergeProps, splitProps,
  type Component,
} from 'solid-js';
import { cn } from '../../utils';
import { useFormField } from '../Form/FormItem';
import { emitEvent } from '../../event-bus';
import type { StepperProps } from './types';
import styles from './Stepper.module.css';

const defaultProps: Partial<StepperProps> = {
  defaultValue: 0,
  min: 0,
  max: Infinity,
  step: 1,
  decimalLength: 0,
  buttonSize: 32,
  inputWidth: 50,
  disabled: false,
  inputDisabled: false,
  integer: false,
  allowEmpty: false,
  placeholder: '',
};

function toPx(v: string | number | undefined, fallback: string): string {
  if (v === undefined) return fallback;
  return typeof v === 'number' ? `${v}px` : v;
}

/** 按 decimalLength 格式化数值 */
function formatVal(v: number, decimalLength: number): number {
  if (decimalLength <= 0) return Math.round(v);
  return Math.round(v * 10 ** decimalLength) / 10 ** decimalLength;
}

export const Stepper: Component<StepperProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'value', 'onChange', 'defaultValue',
    'min', 'max', 'step', 'decimalLength',
    'size', 'buttonSize', 'inputWidth',
    'minusIcon', 'plusIcon',
    'disabled', 'readonly', 'inputDisabled', 'integer', 'allowEmpty',
    'placeholder',
    'class', 'style',
  ]);

  /* ── Form field context ── */
  const field = useFormField();

  /* ── Value management ── */
  const initVal = local.value ?? (typeof field?.value === 'number' ? field.value : local.defaultValue!);
  const [innerVal, setInnerVal] = createSignal<number>(initVal);
  const [inputText, setInputText] = createSignal(String(initVal));

  createEffect(on(() => local.value, (v) => {
    if (v !== undefined) {
      setInnerVal(v);
      setInputText(String(v));
    }
  }, { defer: false }));

  createEffect(on(() => field?.value, (v) => {
    if (field) {
      const n = typeof v === 'number' ? v : 0;
      setInnerVal(n);
      setInputText(String(n));
    }
  }, { defer: false }));

  const currentVal = () => (local.value !== undefined ? local.value : innerVal());

  function clamp(v: number): number {
    return Math.max(local.min!, Math.min(local.max!, v));
  }

  function emit(v: number) {
    const clamped = clamp(v);
    const formatted = formatVal(clamped, local.decimalLength!);
    setInnerVal(formatted);
    setInputText(String(formatted));
    local.onChange?.(formatted);
    if (field) field.onChange(formatted);
    emitEvent({ component: 'Stepper', type: 'change', payload: formatted, timestamp: Date.now() });
  }

  const isReadonly = () => !!local.readonly || !!field?.readonly;

  function minus() {
    if (local.disabled || isReadonly()) return;
    emit(currentVal() - local.step!);
  }

  function plus() {
    if (local.disabled || isReadonly()) return;
    emit(currentVal() + local.step!);
  }

  function handleInput(e: Event) {
    if (isReadonly()) return;
    const el = e.target as HTMLInputElement;
    let raw = el.value;

    // 整数模式过滤
    if (local.integer) raw = raw.replace(/[^0-9-]/g, '');
    // 小数模式允许数字和小数点
    else raw = raw.replace(/[^0-9.-]/g, '');

    setInputText(raw);

    // 空值
    if (raw === '' || raw === '-') {
      if (local.allowEmpty) return;
      return;
    }

    const parsed = parseFloat(raw);
    if (isNaN(parsed)) return;

    // 限制小数位数
    const final = local.decimalLength! > 0 ? formatVal(parsed, local.decimalLength!) : parsed;
    emit(final);
  }

  function handleBlur() {
    const val = currentVal();
    setInputText(String(val));
  }

  const isMin = () => currentVal() <= local.min!;
  const isMax = () => currentVal() >= local.max!;

  const btnSize = () => toPx(local.size ?? local.buttonSize, '28px');
  const inpWidth = () => {
    if (local.inputWidth) return toPx(local.inputWidth, '50px');
    if (local.size) return `calc(${toPx(local.size, '28px')} * 1.8)`;
    return '50px';
  };
  const btnFont = () => `calc(${btnSize()} * 0.6)`;
  const inpFont = () => `calc(${btnSize()} * 0.5)`;

  return (
    <div
      class={cn(
        styles.wrapper,
        local.disabled && styles.disabled,
        isReadonly() && styles.readonly,
        local.class,
      )}
      style={local.style ?? {}}
    >
      {/* Minus button */}
      <button
        type="button"
        class={cn(
          styles.button,
          styles.minus,
          (local.disabled || isMin()) && styles.buttonDisabled,
        )}
        style={{
          width: btnSize(),
          height: btnSize(),
          'font-size': btnFont(),
        }}
        onClick={minus}
        disabled={local.disabled || isMin()}
        aria-label="减"
      >
        {local.minusIcon ?? '−'}
      </button>

      {/* Input */}
      <input
        type="text"
        class={cn(
          styles.input,
          local.inputDisabled && styles.inputDisabled,
        )}
        style={{
          width: inpWidth(),
          height: btnSize(),
          'font-size': inpFont(),
        }}
        value={inputText()}
        onInput={handleInput}
        onBlur={handleBlur}
        disabled={local.disabled || local.inputDisabled}
        placeholder={local.placeholder}
      />

      {/* Plus button */}
      <button
        type="button"
        class={cn(
          styles.button,
          styles.plus,
          (local.disabled || isMax()) && styles.buttonDisabled,
        )}
        style={{
          width: btnSize(),
          height: btnSize(),
          'font-size': btnFont(),
        }}
        onClick={plus}
        disabled={local.disabled || isMax()}
        aria-label="加"
      >
        {local.plusIcon ?? '+'}
      </button>
    </div>
  );
};
