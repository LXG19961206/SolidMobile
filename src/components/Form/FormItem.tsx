import {
  createMemo, onMount, onCleanup, mergeProps, splitProps,
  Show, type Component,
  createContext, useContext,
} from 'solid-js';
import { Cell } from '../Cell';
import { useFormContext } from './context';
import type { FormItemProps, FormFieldContextValue } from './types';

/* ── FormField Context ── */

export const FormFieldContext = createContext<FormFieldContextValue>();

/** 表单控件内部使用，读取 FormItem 注入的 field 信息。无 FormItem 包裹时返回 undefined */
export function useFormField(): FormFieldContextValue | undefined {
  return useContext(FormFieldContext);
}

/* ── Defaults ── */

const defaultProps: Partial<FormItemProps> = {
  required: false,
};

/**
 * FormItem — 表单项，负责字段布局（Cell）和 Form ↔ 控件的值桥接。
 *
 * 通过 FormFieldContext 向子控件注入 name / value / onChange / error。
 * 子控件用 useFormField() 读取，即可同时支持独立使用和表单内使用。
 */
export const FormItem: Component<FormItemProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'name', 'label', 'required', 'rules',
    'help', 'labelAlign', 'labelWidth', 'contentFlex',
    'class', 'style', 'children',
  ]);

  const form = useFormContext();

  /* ── 值 ── */
  const fieldValue = createMemo(() => form?.formValue()?.[local.name]);

  /* ── 错误 ── */
  const fieldErr = createMemo(() => form?.fieldErrs()?.[local.name] ?? null);

  /* ── 校验规则注册 ── */
  onMount(() => {
    if (form && local.rules?.length) {
      form.registerRules?.(local.name, local.rules as any);
      form.initField?.(local.name, '');
    } else if (form) {
      form.initField?.(local.name, '');
    }
  });

  onCleanup(() => {
    form?.unregisterRules?.(local.name);
  });

  /* ── 字段回调 ── */
  function onChange(val: unknown) {
    form?.setFieldValue(local.name, val);
  }

  function onBlur() {
    if (form?.validateOnBlur && local.rules?.length) {
      form.validateField(local.name);
    }
  }

  /* ── Field Context (stable reference, getters for reactive reads) ── */
  const fieldCtx: FormFieldContextValue = {
    get name() { return local.name; },
    get value() { return fieldValue(); },
    onChange,
    onBlur,
    get error() { return fieldErr(); },
    get required() { return local.required; },
    get disabled() { return form?.disabled; },
    get readonly() { return form?.readonly; },
  };

  /* ── 标签 ──*/
  const label = () => {
    if (!local.label) return undefined;
    return form?.colon ? `${local.label}:` : local.label;
  };

  /* ── 描述（错误优先） ── */
  const description = () => {
    const err = fieldErr();
    if (err) return err;
    return local.help;
  };

  const labelOnTop = () => (form?.labelAlign ?? local.labelAlign) === 'top';
  const useFlex = () => labelOnTop() || local.contentFlex || local.labelWidth;

  return (
    <FormFieldContext.Provider value={fieldCtx}>
      <Show
        when={useFlex()}
        fallback={
          <Cell
            title={label()}
            value={local.children as any}
            required={local.required}
            description={description()}
            descriptionError={!!fieldErr()}
            center
            class={local.class}
          />
        }
      >
        <div class={local.class} style={{ padding: '4px 0 4px 1rem', background: 'var(--sc-color-cell-bg, #fff)', 'border-bottom': '1px solid var(--sc-color-border, #ebedf0)' }}>
          {labelOnTop() ? (
            <>
              <Show when={local.label}>
                <div style={{ 'font-size': '0.9rem', 'font-weight': 500, 'margin-bottom': '4px', color: 'var(--sc-color-text, #323233)' }}>
                  {label()}
                  {local.required && <span style={{ color: 'var(--sc-color-danger, #e01823)' }}> *</span>}
                </div>
              </Show>
              <div style={{ flex: local.contentFlex ? 1 : undefined, 'min-width': 0, display: local.contentFlex ? 'flex' : undefined, 'justify-content': local.contentFlex ? 'flex-end' : undefined }}>{local.children}</div>
            </>
          ) : (
            /* side-by-side with configurable label width + content flex */
            <div style={{ display: 'flex', 'align-items': 'center', 'min-height': '44px' }}>
              <Show when={local.label}>
                <div style={{
                  width: (local.labelWidth ?? form?.labelWidth) || 'auto',
                  'flex-shrink': 0,
                  'font-size': '0.9rem',
                  'font-weight': 500,
                  color: 'var(--sc-color-text, #323233)',
                  'margin-right': '12px',
                }}>
                  {label()}
                  {local.required && <span style={{ color: 'var(--sc-color-danger, #e01823)' }}> *</span>}
                </div>
              </Show>
              <div style={{ flex: local.contentFlex ? 1 : undefined, 'min-width': 0, display: local.contentFlex ? 'flex' : undefined, 'justify-content': local.contentFlex ? 'flex-end' : undefined }}>{local.children}</div>
            </div>
          )}
          <Show when={description()}>
            <div style={{ 'font-size': '0.8rem', 'margin-top': '2px', color: fieldErr() ? 'var(--sc-color-danger, #e01823)' : 'var(--sc-color-text-secondary, #969799)' }}>
              {description()}
            </div>
          </Show>
        </div>
      </Show>
    </FormFieldContext.Provider>
  );
};
