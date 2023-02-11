import { createContext,Accessor,useContext } from 'solid-js'
import { FormValue } from './types'


export const FormValueContext = createContext<{
  formValue: Accessor<FormValue>,
  setFormItemValue: (name: string,value: string | void | number | boolean) => unknown,
  fields: string [],
  setFields: (name: string) => unknown
}>()


export const useFormContext = () => useContext(FormValueContext) 