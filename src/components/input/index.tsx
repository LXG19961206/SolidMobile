import { InputProps, InputTypeDict } from './types'
import { createEffect, createSignal, on, onMount, Show } from 'solid-js'
import { attrsForward } from '../../util/attrsForward'
import './index.less'
import { propDefaultValue } from '../../util/propDefaultValue'
import { mergeEvent } from '../../util/merageEvent'
import { isNumber, isFunction } from 'lodash'
import { HTMLNativeEvent } from '../../dict/native'
import { MaybeElement } from '../common'
import Icon from '../icon'
import { NoLimitFunc } from '../../@types/common'

declare module "solid-js" {
  namespace JSX {
    interface CustomEvents {
      click: NoLimitFunc
    }
  }
}


export default (props: Partial<InputProps>) => {

  const [getter, setter] = props.bind || []

  const intersectionOfInputAttrsAndProps = ['maxlength', 'disabled', 'readonly', 'name', 'id', 'placeholder']

  const [inputEl, setInputEl] = createSignal<HTMLInputElement>()

  const [satisfyRules, setSatisfyStatus] = createSignal<boolean>(false)

  const makeReactive = (event: Event, formatterFlag: boolean) => {
    const input = event.target as HTMLInputElement

    if (props.formatter && formatterFlag) {
      input.value = props.formatter(input.value)
    }
    setter && setter(input.value)
  }

  const execCheck = () => {
    if (props.validator) {
      setSatisfyStatus(
        isFunction(props.validator)
          ? props.validator(getter?.call(void 0) || props.value! || '')
          : props.validator.every(rule => rule.test(getter?.call(void 0) || props.value! || ''))
      )
    }
  }

  getter && createEffect(on(getter!, () => {
    execCheck()
    /* handle max length */
    if (
      isNumber(props.maxlength) &&
      inputEl?.call(void 0) &&
      inputEl()!.value.length > props.maxlength 
    ) {
      inputEl()!.value = inputEl()!.value.slice(0, props.maxlength)
    }
  }))


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
    evt => makeReactive(evt, !!props.formatter && (props.formatterTrigger === HTMLNativeEvent.blur || !props.formatterTrigger)),
    execCheck
  )

  const onClear = () => {
    setter?.call(void 0, '')
  }

  const classList = () => ({
    "solidMobile-input-cell-with-clear": !!props.clearIcon || !!props.clearable,
    "solidMobile-input-cell-required": !!props.required,
  })

  const isRequiredButEmpty = () => !!props.required && !props.value && !getter?.call(void 0)

  const inputClassList = () => ({
    "solidMobile-input-cell-field-required": isRequiredButEmpty() && props.showError
  })

  onMount(() => {
    props.autofocus && inputEl()?.focus()
  })

  return (
    <Show
      fallback={TextArea(props)}
      when={!props.textarea}>
      <div
        classList={classList()}
        class="solidMobile-input-cell">
        <span
          on:click={props.onClickLabel}
          class={"solidMobile-input-cell-label" + ` ${props.labelClass}`}>
          <MaybeElement maybeJsx={props.leftIcon}>
            <Icon
              on:click={props.onClickLeftIcon}
              name={props.leftIcon as string}>
            </Icon>
          </MaybeElement>
          {props.label}{props.colon ? ':' : ''}
        </span>
        <input
          {...attrsForward(props, intersectionOfInputAttrsAndProps)}
          class="solidMobile-input-cell-field"
          classList={inputClassList()}
          onInput={onInput}
          onChange={onChange}
          ref={setInputEl}
          onFocus={props.onFocus}
          on:click={props.onClickValue}
          onBlur={onBlur}
          value={getter ? getter() : props.value}
          type={propDefaultValue(props.type, InputTypeDict.text)}
        />
        <Show when={props.clearable && getter?.call(void 0)}>
          <span
            on:click={props.clearable ? onClear : props.rightIcon ? props.onClickRightIcon : void 0}
            class="solidMobile-input-cell-clearIcon">
            <Icon
              name={"shut"}>
            </Icon>
            <MaybeElement maybeJsx={props.clearIcon}>
              <Icon
                name={props.clearIcon as string}>
              </Icon>
            </MaybeElement>
          </span>
        </Show>
        <Show when={props.showError && (props.value || getter?.call(void 0)) && !satisfyRules()}>
          <span
            style={{ "text-align": props.errorTextAlign }} 
            class="solidMobile-input-cell-error-tip">
            请输入正确的{props.label}
          </span>
        </Show>
      </div>
    </Show>
  )
}

export const TextArea = (props: Partial<InputProps>) => {
  return <textarea {...props}></textarea>
}