import { createContext,Accessor,useContext } from 'solid-js'
import { FormValue } from './types'


export const FormValueContext = createContext<{
  formValue: Accessor<FormValue>,
  setFormItemValue: (name: string,value: string | void | number | boolean) => unknown,
  setFields: (name: string) => unknown,
  lazy: boolean
}>()


export const useFormContext = () => useContext(FormValueContext) 