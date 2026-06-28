import {
  createSignal, createEffect, on, onMount, mergeProps, splitProps,
  Show, type Component,
} from 'solid-js';
import { cn } from '../../utils';
import { Icon } from '../Icon';
import { useFormField } from '../Form/FormItem';
import type { TextareaProps } from './types';
import styles from './Textarea.module.css';

const defaultProps: Partial<TextareaProps> = {
  rows: 3,
};

/**
 * Textarea 多行输入 — 和 Input 共享值管理、FormField 接入模式。
 * 额外支持 autoSize 自动撑高。
 */
export const Textarea: Component<TextareaProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, [
    'value', 'onChange', 'defaultValue',
    'placeholder', 'maxlength', 'rows', 'autoSize',
    'disabled', 'readonly', 'clearable', 'showCount', 'error',
    'height', 'onBlur', 'onFocus', 'onEnter', 'onClear', 'autofocus',
    'class', 'style', 'id', 'name',
  ]);

  /* ── Form field context ── */
  const field = useFormField();

  /* ── 值管理 ── */
  const isControlled = () => local.value !== undefined || !!field;
  const [innerVal, setInnerVal] = createSignal<string>(
    local.value ?? field?.value?.toString() ?? local.defaultValue ?? '',
  );

  createEffect(on(() => local.value, (v) => {
    if (local.value !== undefined) setInnerVal(v ?? '');
  }));

  createEffect(on(() => field?.value, (v) => {
    if (field && v !== undefined) setInnerVal(v?.toString() ?? '');
  }));

  const currentVal = () => innerVal();

  const emit = (val: string) => {
    if (!isControlled()) setInnerVal(val);
    if (field) field.onChange(val);
    else local.onChange?.(val);
  };

  /* ── autoSize ── */
  let textareaEl!: HTMLTextAreaElement;

  function resize() {
    if (!local.autoSize || !textareaEl) return;
    textareaEl.style.height = 'auto';
    const minRows = typeof local.autoSize === 'object' ? (local.autoSize.minRows ?? local.rows ?? 3) : (local.rows ?? 3);
    const maxRows = typeof local.autoSize === 'object' ? local.autoSize.maxRows : undefined;

    const lineH = parseFloat(getComputedStyle(textareaEl).lineHeight) || 20;
    const minH = minRows * lineH;
    let scrollH = textareaEl.scrollHeight;

    if (maxRows) {
      const maxH = maxRows * lineH;
      scrollH = Math.min(scrollH, maxH);
    }

    textareaEl.style.height = Math.max(minH, scrollH) + 'px';
  }

  onMount(() => {
    if (local.autoSize) resize();
  });

  createEffect(on(currentVal, () => {
    if (local.autoSize) resize();
  }));

  /* ── 事件 ── */
  const extOnInput = 'onInput' in rest ? (rest as any).onInput : undefined;
  const extOnKeyDown = 'onKeyDown' in rest ? (rest as any).onKeyDown : undefined;

  function handleInput(e: Event) {
    emit((e.target as HTMLTextAreaElement).value);
    extOnInput?.call(void 0, e);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) local.onEnter?.(e);
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
      <textarea
        ref={el => { textareaEl = el; }}
        value={currentVal()}
        placeholder={local.placeholder}
        rows={local.rows}
        maxlength={local.maxlength}
        disabled={local.disabled}
        readonly={local.readonly}
        autofocus={local.autofocus}
        class={styles.textarea}
        {...rest}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
        id={local.id}
        name={local.name}
      />

      {/* clear */}
      <Show when={local.clearable && currentVal().length > 0 && !local.readonly}>
        <span class={styles.clear} onClick={() => { emit(''); local.onClear?.(); }}>
          <Icon name="close" size={14} />
        </span>
      </Show>

      {/* count */}
      <Show when={local.showCount && local.maxlength}>
        <div class={styles.count}>
          {currentVal().length}/{local.maxlength}
        </div>
      </Show>
    </div>
  );
};
