import { createContext, createSignal, Accessor } from 'solid-js'
import { BasePropsAndAttrs } from '../common/types'
import { FormProps, FormValue } from './types'
import { FormValueContext } from './context'
import { isFunction } from 'lodash'

export default function <T = FormValue>(props: Partial<FormProps<T>>) {

  const [formValue, setFromValue] = (
    props.bind || createSignal<FormValue>(props.value || {})
  )

  const setFields = (name: string) => !(name in formValue()) && setFormItemValue(name, '')

  const setFormItemValue = (
    name: string,
    value: string | void | number | boolean
  ) => {
    setFromValue({ ...formValue(), [name]: value })
    if (isFunction(props.onChange)) {
      props.onChange(formValue())
    }
  }

  return (
    <FormValueContext.Provider 
      value={{ formValue, setFormItemValue, setFields, lazy: !!props.lazy }}>
      <form>
        { props.children }
      </form>
    </FormValueContext.Provider>
  )
}