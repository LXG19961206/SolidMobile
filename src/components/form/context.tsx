import { createContext,Accessor,useContext } from 'solid-js'
import { InputAlignTypes } from '../input/types'
import { FormValue } from './types'


export const FormValueContext = createContext<{
  formValue: Accessor<FormValue>,
  scrollToErr?: boolean,
  setFormItemValue: (
    name: string,
    value: string | void | number | boolean
  ) => unknown,
  setFields: (name: string) => unknown,
  lazy: boolean,
  showError?: boolean,
  fieldErrs: Accessor<Record<string, string | null>>,
  errorTextAlign?: "left" | "right" | "center",
  align?: InputAlignTypes,
  scrollToError?: boolean,
  labelClass?: string,
  labelWidth?: string,
  labelAlign?: "top" | "left" | "center",
  disabled?: boolean,
  readonly?: boolean,
  colon?: boolean
}>()


export const useFormContext = () => useContext(FormValueContext) 