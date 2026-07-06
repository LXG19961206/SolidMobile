import {
  createMemo, onMount, onCleanup, mergeProps, splitProps,
  Show, type Component,
  createContext, useContext,
} from 'solid-js';
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
 * FormItem — 表单项，负责字段布局和 Form ↔ 控件的值桥接。
 *
 * 通过 FormFieldContext 向子控件注入 name / value / onChange / error。
 * 子控件用 useFormField() 读取，即可同时支持独立使用和表单内使用。
 *
 * 布局模式：
 * - 默认（side-by-side）：label 在左、控件在右，label 宽度由 Form 的 labelWidth 统一控制
 * - label-top：设置 Form.labelAlign="top" 后 label 在上方
 */
export const FormItem: Component<FormItemProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'name', 'label', 'required', 'rules',
    'help', 'labelAlign', 'labelWidth', 'controlAlign', 'contentFlex',
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

  /* ── Field Context ── */
  const fieldCtx: FormFieldContextValue = {
    get name() { return local.name; },
    get value() { return fieldValue(); },
    onChange,
    onBlur,
    get error() { return fieldErr(); },
    get required() { return local.required; },
    get disabled() { return form?.disabled; },
    get readonly() { return form?.readonly; },
    get controlAlign() { return controlAlign(); },
  };

  /* ── 标签 ── */
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

  const top = () => (form?.labelAlign ?? local.labelAlign) === 'top';
  const labelRight = () => (form?.labelAlign ?? local.labelAlign) === 'right';
  const hasLabel = () => !!local.label;
  const labelW = () => (local.labelWidth ?? form?.labelWidth) || undefined;
  const controlAlign = () => local.controlAlign ?? form?.controlAlign ?? 'left';
  const errColor = () =>
    fieldErr() ? 'var(--sc-color-danger, #e01823)' : 'var(--sc-color-text-secondary, #969799)';

  return (
    <FormFieldContext.Provider value={fieldCtx}>
      <div
        class={local.class}
        data-field={local.name}
        data-form-error={fieldErr() || undefined}
        style={{
          '--sc-form-control-height': '40px',
          '--sc-form-item-min-height': 'var(--sc-form-control-height)',
          '--sc-form-item-padding-y': '8px',
          '--sc-form-item-label-top-padding-y': '12px',
          '--sc-form-item-label-gap': '6px',
          '--sc-form-item-label-margin': '12px',
          'padding-top': top()
            ? 'var(--sc-form-item-label-top-padding-y)'
            : 'var(--sc-form-item-padding-y)',
          'padding-bottom': 'var(--sc-form-item-padding-y)',
          'padding-left': '1rem',
          'padding-right': '1rem',
          background: 'var(--sc-color-cell-bg, #fff)',
          'border-bottom': '1px solid var(--sc-color-border, #ebedf0)',
          ...(typeof local.style === 'object' ? local.style : {}),
        }}
      >
        <Show
          when={top()}
          fallback={
            /* ── Side-by-side ── */
            <div style={{ display: 'flex', 'align-items': 'center', 'min-height': 'var(--sc-form-item-min-height)' }}>
              <Show when={labelRight()}>
                <div style={{ flex: 1, 'min-width': 0, display: 'flex', 'justify-content': controlAlign() === 'right' ? 'flex-end' : 'flex-start', ...(typeof local.style === 'object' ? local.style : {}) }}>{local.children}</div>
              </Show>
              <Show when={hasLabel()}>
                <div style={{
                  width: labelW(),
                  'flex-shrink': 0,
                  'font-size': '0.9rem',
                  'font-weight': 500,
                  color: 'var(--sc-color-text, #323233)',
                  'margin-left': labelRight() ? 'var(--sc-form-item-label-margin)' : undefined,
                  'margin-right': labelRight() ? undefined : 'var(--sc-form-item-label-margin)',
                }}>
                  <div style={{ display: 'flex', 'align-items': 'center' }}>
                    <Show when={!labelRight()}>
                      {local.required && (
                        <span style={{
                          color: 'var(--sc-color-danger, #e01823)',
                          'flex-shrink': 0,
                          'margin-right': '0.35rem',
                        }}>*</span>
                      )}
                    </Show>
                    <span style={{ overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }}>
                      {label()}
                    </span>
                    <Show when={labelRight()}>
                      {local.required && (
                        <span style={{
                          color: 'var(--sc-color-danger, #e01823)',
                          'flex-shrink': 0,
                          'margin-left': '0.35rem',
                        }}>*</span>
                      )}
                    </Show>
                  </div>
                  <Show when={description()}>
                    <div style={{
                      'font-size': '0.8rem',
                      'line-height': 1.4,
                      color: errColor(),
                    }}>{description()}</div>
                  </Show>
                </div>
              </Show>
              <Show when={!labelRight()}>
                <div style={{ flex: 1, 'min-width': 0, display: 'flex', 'justify-content': controlAlign() === 'right' ? 'flex-end' : 'flex-start', ...(typeof local.style === 'object' ? local.style : {}) }}>{local.children}</div>
              </Show>
            </div>
          }
        >
          {/* ── Label on top ── */}
          <Show when={hasLabel()}>
            <div style={{
              'font-size': '0.9rem',
              'font-weight': 500,
              'margin-bottom': 'var(--sc-form-item-label-gap)',
              color: 'var(--sc-color-text, #323233)',
            }}>
              {local.required && (
                <span style={{
                  color: 'var(--sc-color-danger, #e01823)',
                  'flex-shrink': 0,
                  'margin-right': '0.35rem',
                }}>*</span>
              )}
              {label()}
            </div>
          </Show>
          <div style={{ flex: 1, 'min-width': 0, 'min-height': 'var(--sc-form-item-min-height)', display: 'flex', 'align-items': 'center', 'justify-content': controlAlign() === 'right' ? 'flex-end' : 'flex-start', ...(typeof local.style === 'object' ? local.style : {}) }}>{local.children}</div>
          <Show when={description()}>
            <div style={{
              'font-size': '0.8rem',
              'margin-top': '2px',
              color: errColor(),
            }}>{description()}</div>
          </Show>
        </Show>
      </div>
    </FormFieldContext.Provider>
  );
};
