import { InputProps, InputTypeDict } from './types'
import { createEffect, createSignal, Show } from 'solid-js'
import { attrsForward } from '../../util/attrsForward'
import './index.less'
import { propDefaultValue } from '../../util/propDefaultValue'
import { mergeEvent } from '../../util/merageEvent'
import { isNumber } from 'lodash'
import { HTMLNativeEvent } from '../../dict/native'
import { MaybeElement } from '../common'
import Icon from '../icon'



export default (props: Partial<InputProps>) => {

  const [getter, setter] = props.bind || []

  let [iconElement, setIconEl] = createSignal<HTMLSpanElement>()

  const intersectionOfInputAttrsAndProps = ['disabled', 'readonly', 'name', 'id', 'placeholder']

  const makeReactive = (event: Event, formatterFlag: boolean) => {
    const input = event.target as HTMLInputElement
    /* handle max length */
    if (
      props.type ===  InputTypeDict.number && 
      isNumber(props.maxlength) && 
      input.value.length > props.maxlength
    ) {
      input.value = input.value.slice(0, props.maxlength)
    }
    if (props.formatter && formatterFlag) {
      input.value = props.formatter(input.value)
    }
    setter && setter(input.value)
  }

  const onChange = mergeEvent(
    props.onChange, 
    (evt) => props.lazy && makeReactive(evt, !!props.formatter && props.formatterTrigger === HTMLNativeEvent.change)
  )

  const onInput = mergeEvent(
    props.onInput, 
    (evt) => !props.lazy && makeReactive(evt, !!props.formatter && props.formatterTrigger === HTMLNativeEvent.input)
  )

  const onBlur = mergeEvent(
    props.onBlur,
    evt => makeReactive(evt, !!props.formatter && props.formatterTrigger === HTMLNativeEvent.blur)
  )

  const onClear = () => {
    setter?.call(void 0, '')
  }

  const classList = () => ({
    "solidMobile-input-cell-with-clear": !!props.clearIcon || !!props.clearable
  })

  createEffect(() => {
    if (props.clearIcon || props.clearable || setter) {
      iconElement()?.addEventListener(HTMLNativeEvent.click, setter!.bind(void 0, ''), { once: true })
    }
  })

  return (
    <Show
      fallback={TextArea(props)} 
      when={!props.textarea}>
        <div 
          classList={classList()}
          class="solidMobile-input-cell">
          <span class="solidMobile-input-cell-label"> { props.label }{ props.colon ? ':' : '' } </span>
          <input
            { ...attrsForward(props, intersectionOfInputAttrsAndProps) }
            class="solidMobile-input-cell-field"
            onInput={onInput}
            onChange={onChange}
            onBlur={onBlur}
            value={ getter ? getter() : props.value }
            type={propDefaultValue(props.type, InputTypeDict.text)}
          />
          <Show when={props.clearable && getter?.call(void 0) }>
            <span
              ref={setIconEl}
              class="solidMobile-input-cell-clearIcon">
              <Icon
                onClick={ onClear }
                name={"shut"}></Icon>
              <MaybeElement maybeJsx={props.clearIcon}>
                <Icon
                  onClick={ onClear }
                  name={props.clearIcon as string}></Icon>
              </MaybeElement>
            </span>
          </Show>
        </div>
    </Show>
  )
}

export const TextArea = (props: Partial<InputProps>) => {
  return <textarea {...props}></textarea>
}