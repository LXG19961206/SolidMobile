import type { JSX, Accessor, Setter } from 'solid-js';

/** 表单值 — 一个字符串键到任意值的映射 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormValue = Record<string, any>;

/** 校验触发时机 */
export type RuleTrigger = 'onChange' | 'onBlur' | 'onSubmit';

/** 单条校验规则 */
export interface FormRule<V = unknown, T extends FormValue = FormValue> {
  /** 校验函数。返回 true 表示通过，返回 false 或 Promise<false> 表示失败 */
  validator: (value: V, formValue: T) => boolean | Promise<boolean>;
  /** 校验失败时的提示文本 */
  message: string | ((value: V) => string);
  /** 触发时机，默认 'onChange' */
  trigger?: RuleTrigger;
}

/** useFormContext 暴露的上下文 */
export interface FormContextValue<T extends FormValue = FormValue> {
  /** 当前表单值 */
  formValue: Accessor<T>;
  /** 整体替换表单值 */
  setFormValue: (value: T) => void;
  /** 重置表单值为 defaultValue 或空对象，并清除所有错误 */
  resetFormValue: () => void;
  /** 更新某个字段 */
  setFieldValue: (name: string, value: unknown) => void;
  /** 初始化空字段（FormItem 挂载时注册） */
  initField: (name: string, defaultValue?: unknown) => void;
  /** 字段级错误映射 name → 错误文本 */
  fieldErrs: Accessor<Record<string, string | null>>;
  /** 设置某字段的错误 */
  setFieldError: (name: string, err: string | null) => void;
  /** 手动校验某字段 */
  validateField: (name: string) => Promise<boolean>;
  /** 校验所有字段 */
  validateAll: () => Promise<boolean>;
  /** 触发表单提交 */
  submit: () => void;
  /** 是否禁用所有表单项 */
  disabled?: boolean;
  /** 是否只读所有表单项 */
  readonly?: boolean;
  /** 标签对齐方式 */
  labelAlign?: 'top' | 'left' | 'right';
  /** 标签宽度 */
  labelWidth?: string;
  /** 统一标签对齐，FormItem 可单独覆盖 */
  colon?: boolean;
  /** @internal */
  registerRules?: (name: string, rules: FormRule[]) => void;
  /** @internal */
  unregisterRules?: (name: string) => void;
  /** @internal */
  validateOnBlur?: boolean;
}

/** Form 组件 Props */
export interface FormProps<T extends FormValue = FormValue> {
  /** 受控值 */
  value?: T;
  /** 值变化回调（受控模式） */
  onChange?: (value: T) => void;
  /** 默认值（非受控模式） */
  defaultValue?: T;
  /** 提交回调。若返回 Promise 则表示异步提交，Form 内部暂不处理 loading 态 */
  onSubmit?: (value: T) => void | Promise<void>;
  /** 是否在字段变化时校验，默认 false */
  validateOnChange?: boolean;
  /** 是否在字段失焦时校验 */
  validateOnBlur?: boolean;
  /** 全局禁用 */
  disabled?: boolean;
  /** 全局只读 */
  readonly?: boolean;
  /** 标签对齐 */
  labelAlign?: 'top' | 'left' | 'right';
  /** 标签宽度，如 '6em' */
  labelWidth?: string;
  /** 标签后加冒号 */
  colon?: boolean;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式 */
  style?: JSX.CSSProperties | string;
  /** 子元素 */
  children?: JSX.Element;
  /** ref 回调，组件挂载时传入 { setFormValue, resetFormValue, submit, validateAll }，null 时销毁 */
  ref?: ((api: { setFormValue: (v: T) => void; resetFormValue: () => void; submit: () => void; validateAll: () => Promise<boolean> }) => void) | null;
}

/** Form ref API */
export interface FormRef<T extends FormValue = FormValue> {
  setFormValue: (v: T) => void;
  resetFormValue: () => void;
  submit: () => void;
  validateAll: () => Promise<boolean>;
}

/** FormFieldContext — FormItem 注入给其子控件的上下文 */
export interface FormFieldContextValue {
  /** 字段名 */
  name: string;
  /** 当前值 */
  value: unknown;
  /** 值变化回调 */
  onChange: (value: unknown) => void;
  /** 失焦回调 */
  onBlur: () => void;
  /** 字段错误文本，无错误时为 null */
  error: string | null;
  /** 是否必填 */
  required?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
}

/** FormItem Props */
export interface FormItemProps {
  /** 字段名，对应 formValue 中的 key */
  name: string;
  /** 标签文本 */
  label?: string | JSX.Element;
  /** 是否必填 */
  required?: boolean;
  /** 校验规则 */
  rules?: FormRule[];
  /** 帮助文本（无错误时展示在 description 位置） */
  help?: string;
  /** 自定义标签对齐，覆盖 Form 设置 */
  labelAlign?: 'top' | 'left' | 'right';
  /** 自定义标签宽度 */
  labelWidth?: string;
  /** 内容区自动拉伸（flex: 1），适合 Textarea 等需要撑满的场景 */
  contentFlex?: boolean;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式 */
  style?: JSX.CSSProperties | string;
  /** 表单控件 */
  children?: JSX.Element;
}
