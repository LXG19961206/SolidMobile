import {
  createSignal, createEffect, on, mergeProps, splitProps,
  Show, type Component,
} from 'solid-js';
import { cn } from '../../utils';
import { Icon } from '../Icon';
import { useFormField } from '../Form/FormItem';
import type { InputProps } from './types';
import styles from './Input.module.css';

const defaultProps: Partial<InputProps> = {
  type: 'text',
  align: 'left',
};

/**
 * Input 输入框 — 纯净的文本输入组件。
 *
 * 支持受控（value + onChange）和非受控（defaultValue）模式。
 * 不感知 Form / FormItem，可独立使用或被 FormItem 包裹。
 */
export const Input: Component<InputProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, [
    'type', 'value', 'onChange', 'defaultValue',
    'placeholder', 'maxlength', 'disabled', 'readonly', 'align',
    'clearable', 'showPasswordToggle', 'prefix', 'suffix', 'height',
    'showCount', 'onBlur', 'onFocus', 'onEnter', 'onClear', 'error',
    'class', 'style', 'id', 'name', 'autofocus',
  ]);

  /* ── Form field context (optional) ── */
  const field = useFormField();

  /* ── 值管理 ── */
  const isControlled = () => local.value !== undefined || !!field;
  const [innerVal, setInnerVal] = createSignal<string>(
    local.value?.toString() ?? field?.value?.toString() ?? local.defaultValue ?? '',
  );

  // 受控模式下同步外部值
  createEffect(on(() => local.value, (v) => {
    if (local.value !== undefined) setInnerVal(v?.toString() ?? '');
  }));

  // 同步 field context value
  createEffect(on(() => field?.value, (v) => {
    if (field && v !== undefined) setInnerVal(v?.toString() ?? '');
  }));

  const currentVal = () => innerVal();

  const emit = (val: string) => {
    if (!isControlled()) setInnerVal(val);
    if (field) {
      field.onChange(val);
    } else {
      local.onChange?.(val);
    }
  };

  /* ── 密码可见切换 ── */
  const [pwdVisible, setPwdVisible] = createSignal(false);
  const inputType = () => {
    if (local.type === 'password' && local.showPasswordToggle && pwdVisible()) return 'text';
    return local.type;
  };

  /* ── 事件合并 ──
     onInput / onKeyDown 不在 splitProps 中 → 在 rest 上
     onBlur / onFocus / onEnter 在 splitProps 中 → 在 local 上 */
  const extOnInput = 'onInput' in rest ? (rest as any).onInput : undefined;
  const extOnKeyDown = 'onKeyDown' in rest ? (rest as any).onKeyDown : undefined;

  /* ── 事件 ── */
  function handleInput(e: Event) {
    const el = e.target as HTMLInputElement;
    if (local.type === 'number') {
      el.value = el.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
      if (local.maxlength && el.value.length > local.maxlength) {
        el.value = el.value.slice(0, local.maxlength);
      }
    }
    emit(el.value);
    extOnInput?.call(void 0, e);
  }

  function onClear() {
    emit('');
    local.onClear?.();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') local.onEnter?.(e);
    extOnKeyDown?.call(void 0, e);
  }

  function handleBlur(e: Event) {
    local.onBlur?.(e);
  }

  function handleFocus(e: Event) {
    local.onFocus?.(e);
  }

  /* ── Render ── */
  return (
    <div
      class={cn(
        styles.wrapper,
        local.disabled && styles.disabled,
        local.readonly && styles.readonly,
        local.error && styles.error,
        local.class,
      )}
      style={{
        ...(local.height ? { height: local.height } : {}),
        ...(typeof local.style === 'object' ? local.style : {}),
      }}
    >
      {/* prefix */}
      <Show when={local.prefix}>
        <span class={styles.prefix}>{local.prefix}</span>
      </Show>

      {/* input */}
      <input
        type={inputType() === 'number' ? 'text' : inputType()}
        inputmode={inputType() === 'number' ? 'numeric' : undefined}
        value={currentVal()}
        placeholder={local.placeholder}
        maxlength={local.maxlength}
        disabled={local.disabled}
        readonly={local.readonly}
        autofocus={local.autofocus}
        class={cn(
          styles.input,
          styles[`align-${local.align}`],
        )}
        {...rest}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onBlur={e => handleBlur(e)}
        onFocus={e => handleFocus(e)}
        id={local.id}
        name={local.name}
      />

      {/* password toggle */}
      <Show when={local.type === 'password' && local.showPasswordToggle}>
        <span class={styles.toggle} onClick={() => setPwdVisible(!pwdVisible())}>
          <Icon name={pwdVisible() ? 'eye' : 'eye-off'} size={16} />
        </span>
      </Show>

      {/* clear */}
      <Show when={local.clearable && currentVal().length > 0 && !local.readonly}>
        <span class={styles.clear} onClick={onClear}>
          <Icon name="close" size={14} />
        </span>
      </Show>

      {/* suffix */}
      <Show when={local.suffix}>
        <span class={styles.suffix}>{local.suffix}</span>
      </Show>

      {/* count */}
      <Show when={local.showCount && local.maxlength}>
        <span class={styles.count}>
          {currentVal().length}/{local.maxlength}
        </span>
      </Show>
    </div>
  );
};
