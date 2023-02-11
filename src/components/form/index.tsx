import { createSignal } from 'solid-js'
import { FormProps, FormValue } from './types'
import { FormValueContext } from './context'
import { isFunction } from 'lodash'
import { propDefaultValue } from '../../util/propDefaultValue'

export default function <T extends FormValue = FormValue>(props: Partial<FormProps<T>>) {

  const [formValue, setFromValue] = (
    props.bind || createSignal<FormValue>(props.value || {})
  )

  const [fieldErrs, setFieldErrs] = createSignal<{ [key: keyof FormValue]: string | null }>({})

  const setFields = (name: string) => !(name in formValue()) && setFormItemValue(name, '')

  const setFormItemValue = (
    name: string,
    value: string | void | number | boolean
  ) => {

    setFromValue({ ...formValue(), [name]: value })

    setFieldErrs({ ...fieldErrs(), [name]: null })

    if (isFunction(props.onChange)) {
      props.onChange(formValue())
    }

    if (props.validateOnChange) {
      execCheck(formValue() as T)
    }
  }

  const execCheck = (currentValue: T) => {

    if (isFunction(props.validator)) {
      
      return props.validator(currentValue)

    } else if (props.ValidateRules) {

      let isFail = false

      // use tryCatch here is only for exit forEach when some valdator is not pass

      try {

        Object.entries(props.ValidateRules).forEach(([name, rules]) => {

          const currentFieldValue = currentValue[name]

          rules.forEach(rule => {

            const [validator, errTip] = rule

            const result = isFunction(validator)
              ? validator(currentFieldValue!, currentValue)
              : validator.test(currentFieldValue as string)

            if (!result) {

              isFail = true

              setFieldErrs({
                ...fieldErrs(), [name]: errTip || null
              })

              if (propDefaultValue(props.lazyValidate, true)) {
                throw new Error(errTip || '')
              }
            }

          })

        })
      } catch (err) {

      }

      return !isFail
    }
  }

  const submit = (evt: SubmitEvent) => {

    evt.preventDefault()

    const currentValue = formValue() as T

    if (!execCheck(currentValue)) return

    if (props.onSubmitNative) {
      props.onSubmitNative(evt)
    }

    if (isFunction(props.onSubmit)) {
      props.onSubmit(formValue())
    }

  }

  return (
    <FormValueContext.Provider
      value={{
        formValue,
        setFormItemValue,
        setFields,
        scrollToErr: props.scrollToErr,
        lazy: !!props.lazy,
        labelAlign: props.labelAlign,
        fieldErrs,
        showError: props.showError,
        align: props.align,
        scrollToError: props.scrollToError,
        labelWidth: props.labelWidth,
        disabled: props.disabled,
        readonly: props.readonly,
        colon: props.colon
      }}>
      <form onSubmit={submit}>
        {props.children}
      </form>
    </FormValueContext.Provider>
  )
}