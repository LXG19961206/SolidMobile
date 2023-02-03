import { InputProps } from './types'
import { Show } from 'solid-js'
import { attrsForward } from '../../util/attrsForward'
import './index.less'
import { propDefaultValue } from '../../util/propDefaultValue'
import { mergeEvent } from '../../util/merageEvent'
import { isNumber } from 'lodash'



export default (props: Partial<InputProps>) => {

  const [getter, setter] = props.bind || []

  const intersectionOfInputAttrsAndProps = ['disabled', 'readonly', 'name', 'id', 'placeholder']

  const makeReactive = (event: Event, formatterFlag: boolean) => {
    const input = event.target as HTMLInputElement
    /* handle max length */
    if (isNumber(props.maxlength) && input.value.length > props.maxlength) {
      input.value = input.value.slice(0, props.maxlength)
    }
    if (props.formatter && formatterFlag) {
      input.value = props.formatter(input.value)
    }
    setter && setter(input.value)
  }

  const onChange = mergeEvent(
    props.onChange, 
    (evt) => props.lazy && makeReactive(evt, !!props.formatter && props.formatterTrigger === 'change')
  )

  const onInput = mergeEvent(
    props.onInput, 
    (evt) => !props.lazy && makeReactive(evt, !!props.formatter && props.formatterTrigger === 'input')
  )

  const onBlur = mergeEvent(
    props.onBlur,
    evt => makeReactive(evt, !!props.formatter && props.formatterTrigger === 'blur')
  )

  return (
    <Show
      fallback={TextArea(props)} 
      when={!props.textarea}>
        <div class="solidMobile-input-cell">
          <span class="solidMobile-input-cell-label"> { props.label }{ props.colon ? ':' : '' } </span>
          <input
            { ...attrsForward(props, intersectionOfInputAttrsAndProps) }
            class="solidMobile-input-cell-field"
            onInput={onInput}
            onChange={onChange}
            onBlur={onBlur}
            value={ getter ? getter() : props.value }
            type={propDefaultValue(props.type, 'text')}
          />
        </div>
    </Show>
  )
}

export const TextArea = (props: Partial<InputProps>) => {
  return <textarea {...props}></textarea>
}