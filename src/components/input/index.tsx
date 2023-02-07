import { InputProps, InputTypeDict } from './types'
import { createEffect, createSignal, on, onMount, Show, Switch, Match, ValidComponent } from 'solid-js'
import { Dynamic } from 'solid-js/web'

import { attrsForward } from '../../util/attrsForward'
import { propDefaultValue } from '../../util/propDefaultValue'
import { mergeEvents } from '../../util/merageEvent'
import { isNumber, isFunction } from 'lodash'
import { HTMLNativeEvent } from '../../dict/native'
import { MaybeElement } from '../common'
import Icon from '../icon'
import './index.less'
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

  const [inputEl, setInputEl] = createSignal<HTMLInputElement | HTMLTextAreaElement>()

  const [satisfyRules, setSatisfyStatus] = createSignal<boolean>(false)

  const makeReactive = (event: Event, formatterFlag: boolean) => {

    const input = event.target as HTMLInputElement

    if (props.formatter && formatterFlag) {
      input.value = props.formatter(input.value)
    }

    setter && setter(input.value)

    if (
      (props.textarea || props.type === InputTypeDict.textarea) && 
      input.value &&
      props.autosize
    ) {
      input.style.height = 'auto'
      input.style.height = input.scrollHeight + 'px'
    }
  }

  const execCheck = () => {
    const value = inputEl()?.value
    if (props.validator && value) {
      setSatisfyStatus(
        isFunction(props.validator)
          ? props.validator(value)
          : props.validator.every(rule => rule.test(value))
      )
    }
  }

  getter && createEffect(on(getter!, () => {
    execCheck()
    /* handle max length */
    if (
      props.type === InputTypeDict.number &&
      isNumber(props.maxlength) &&
      inputEl?.call(void 0) &&
      inputEl()!.value.length > props.maxlength
    ) {
      inputEl()!.value = inputEl()!.value.slice(0, props.maxlength)
    }
  }))


  const onChange = mergeEvents(
    props.onChange,
    (evt) => props.lazy && makeReactive(evt, !!props.formatter && props.formatterTrigger === HTMLNativeEvent.change)
  )

  const onInput = mergeEvents(
    props.onInput,
    (evt) => !props.lazy && makeReactive(evt, !!props.formatter && props.formatterTrigger === HTMLNativeEvent.input)
  )

  const onBlur = mergeEvents(
    props.onBlur,
    evt => makeReactive(evt, !!props.formatter && (props.formatterTrigger === HTMLNativeEvent.blur || !props.formatterTrigger)),
    execCheck
  )

  const onClear = () => {
    setter?.call(void 0, '')
  }

  const classList = () => ({
    "solidMobile-input-cell-with-clear": !!props.clearIcon || !!props.clearable || !!props.rightIcon || !!props.islink,
    "solidMobile-input-cell-required": !!props.required,
    "solidMobile-input-cell-align-center": !!props.center,
  })

  const isRequiredButEmpty = () => !!props.required && !props.value && !getter?.call(void 0)

  const inputClassList = () => ({
    "solidMobile-input-cell-field-required": isRequiredButEmpty() && props.showError
  })

  onMount(() => {
    props.autofocus && inputEl()?.focus()
  })

  return (
    <div
      classList={classList()}
      class="solidMobile-input-cell">
      <span
        on:click={props.onClickLabel}
        style={{
          "text-align": propDefaultValue(props.labelAlign, 'left'),
          width: props.labelWidth
        }}
        class={"solidMobile-input-cell-label" + ` ${props.labelClass}`}>
        <MaybeElement maybeJsx={props.leftIcon}>
          <Icon
            on:click={props.onClickLeftIcon}
            name={props.leftIcon as string}>
          </Icon>
        </MaybeElement>
        {props.label}{props.colon ? ':' : ''}
      </span>
      <Show
        fallback={
          <textarea
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
          />
        }
        when={!props.textarea && props.type !== InputTypeDict.textarea}>
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
      </Show>
      <Switch>
        <Match when={props.rightIcon}>
          <span
            on:click={props.onClickRightIcon}
            class="solidMobile-input-cell-clearIcon">
            <MaybeElement maybeJsx={props.rightIcon}>
              <Icon name={props.rightIcon as string}></Icon>
            </MaybeElement>
          </span>
        </Match>
        <Match when={props.clearable || props.clearIcon}>
          <span
            on:click={onClear}
            class="solidMobile-input-cell-clearIcon">
            {
              !props.clearIcon
                ? (<Icon name={"shut"}></Icon>)
                : (
                  <MaybeElement maybeJsx={props.clearIcon}>
                    <Icon name={props.clearIcon as string}></Icon>
                  </MaybeElement>
                )
            }
          </span>
        </Match>
        <Match when={props.islink}>
          <span
            on:click={props.onClickLink}
            class="solidMobile-input-cell-clearIcon">
            <Icon name={"right"}></Icon>
          </span>
        </Match>
      </Switch>
      <Show when={props.showError && (props.value || getter?.call(void 0)) && !satisfyRules()}>
        <span
          style={{ "text-align": props.errorTextAlign }}
          class="solidMobile-input-cell-error-tip">
          {props.errorText || `请输入正确的${props.label}`}
        </span>
      </Show>
    </div>
  )
}