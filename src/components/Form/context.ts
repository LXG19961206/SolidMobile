import { createContext, useContext } from 'solid-js';
import type { FormValue, FormContextValue } from './types';

/** Form 内部上下文。未被 Provider 包裹时返回 undefined。 */
export const FormContext = createContext<FormContextValue>();

/**
 * 在 FormItem / 表单控件中获取 Form 上下文。
 * 未处于 <Form> 内时返回 undefined，组件应 fallback 到独立模式。
 */
export function useFormContext<T extends FormValue = FormValue>(): FormContextValue<T> | undefined {
  return useContext(FormContext) as FormContextValue<T> | undefined;
}
