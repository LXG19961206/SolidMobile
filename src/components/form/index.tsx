import { createContext, createSignal, Accessor } from 'solid-js'
import { BasePropsAndAttrs } from '../common/types'
import { FormValue } from './types'
import { FormValueContext } from './context'

export default (props: BasePropsAndAttrs) => {

  const [formValue, setFromValue] = createSignal<FormValue>({})

  const fields: string [] = [], 
      setFields = (name: string) => fields.includes(name) || fields.push(name)

  const setFormItemValue = (
    name: string,
    value: string | void | number | boolean
  ) => {
    setFromValue({ ...formValue(), [name]: value })
    console.log(formValue())
  }

  return (
    <FormValueContext.Provider 
      value={{ formValue, setFormItemValue, fields, setFields }}>
      <form>
        { props.children }
      </form>
    </FormValueContext.Provider>
  )
}