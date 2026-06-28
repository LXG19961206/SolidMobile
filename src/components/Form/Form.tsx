import {
  createSignal, createMemo, mergeProps, splitProps,
  type Component,
  onCleanup,
} from 'solid-js';
import { cn } from '../../utils';
import { FormContext } from './context';
import type { FormValue, FormProps, FormRule } from './types';

const defaultProps: Partial<FormProps> = {
  validateOnChange: false,
  validateOnBlur: false,
  colon: false,
};

/** 字段校验规则注册表：name → rules[] */
type RuleMap = Map<string, FormRule[]>;

/**
 * Form 表单容器 — 提供 Context，管理表单值和校验。
 *
 * 支持受控（value + onChange）和非受控（defaultValue）两种模式。
 * FormItem 通过 Context 读写字段值，Form 本身不直接操作子组件。
 */
export const Form: Component<FormProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, [
    'value', 'onChange', 'defaultValue', 'onSubmit',
    'validateOnChange', 'validateOnBlur',
    'disabled', 'readonly',
    'labelAlign', 'labelWidth', 'colon',
    'class', 'style', 'children',
  ]);

  /* ── 值管理 ── */
  const isControlled = () => local.value !== undefined;
  const [innerValue, setInnerValue] = createSignal<FormValue>(
    local.value ?? local.defaultValue ?? {},
  );

  const formValue = (): FormValue =>
    isControlled() ? local.value! : innerValue();

  const setFormValue = (v: FormValue) => {
    if (isControlled()) {
      local.onChange?.(v as any);
    } else {
      setInnerValue(v);
    }
  };

  /* ── 字段错误 ── */
  const [fieldErrs, setFieldErrs] = createSignal<Record<string, string | null>>({});

  /* ── 校验规则注册 ── */
  const ruleMap: RuleMap = new Map();

  function registerRules(name: string, rules: FormRule[]) {
    ruleMap.set(name, rules);
  }

  function unregisterRules(name: string) {
    ruleMap.delete(name);
  }

  /* ── 字段值操作 ── */
  function setFieldValue(name: string, value: unknown) {
    const next = { ...formValue(), [name]: value };
    setFormValue(next);
    // 清除旧错误
    setFieldError(name, null);
    // 触发校验
    if (local.validateOnChange) {
      validateField(name);
    }
  }

  function initField(name: string, defaultValue?: unknown) {
    const current = formValue();
    if (!(name in current)) {
      const next = { ...current };
      if (defaultValue !== undefined) {
        next[name] = defaultValue;
      } else {
        next[name] = '';
      }
      setFormValue(next);
    }
  }

  function setFieldError(name: string, err: string | null) {
    setFieldErrs(prev => {
      if (prev[name] === err) return prev;
      return { ...prev, [name]: err };
    });
  }

  /* ── 校验 ── */
  async function validateField(name: string): Promise<boolean> {
    const rules = ruleMap.get(name);
    if (!rules?.length) return true;

    const value = formValue()[name];
    for (const rule of rules) {
      try {
        const ok = await rule.validator(value, formValue() as any);
        if (!ok) {
          const msg = typeof rule.message === 'function'
            ? rule.message(value)
            : rule.message;
          setFieldError(name, msg);
          return false;
        }
      } catch {
        const msg = typeof rule.message === 'function'
          ? rule.message(value)
          : rule.message;
        setFieldError(name, msg);
        return false;
      }
    }
    setFieldError(name, null);
    return true;
  }

  async function validateAll(): Promise<boolean> {
    const names = Array.from(ruleMap.keys());
    const results = await Promise.all(names.map(n => validateField(n)));
    return results.every(Boolean);
  }

  /* ── 提交 ── */
  async function submit() {
    const ok = await validateAll();
    if (!ok) return;
    local.onSubmit?.(formValue() as any);
  }

  /* ── Context (stable reference, getters for reactive reads) ── */
  const ctx = {
    formValue,
    setFieldValue,
    initField,
    fieldErrs,
    setFieldError,
    validateField,
    validateAll,
    submit,
    registerRules,
    unregisterRules,
    get disabled() { return local.disabled; },
    get readonly() { return local.readonly; },
    get labelAlign() { return local.labelAlign; },
    get labelWidth() { return local.labelWidth; },
    get colon() { return local.colon; },
  };

  /* ── 处理 native form submit ── */
  let formEl!: HTMLFormElement;
  const onNativeSubmit = (e: Event) => {
    e.preventDefault();
    submit();
  };

  return (
    <FormContext.Provider value={ctx}>
      <form
        ref={formEl!}
        class={cn(local.class)}
        style={typeof local.style === 'object' ? local.style : undefined}
        onSubmit={onNativeSubmit}
        {...rest}
      >
        {local.children}
      </form>
    </FormContext.Provider>
  );
};
