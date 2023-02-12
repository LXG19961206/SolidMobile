import { InputProps, InputTypeDict } from './types'
import { createEffect, createSignal, on, onMount, Show, Switch, Match, JSXElement } from 'solid-js'
import { attrsForward } from '../../util/attrsForward'
import { propDefaultValue } from '../../util/propDefaultValue'
import { mergeEvents } from '../../util/merageEvent'
import { isNumber, isFunction, isNil, isString } from 'lodash'
import { HTMLNativeEvent } from '../../dict/native'
import { MaybeElement } from '../common'
import Icon from '../icon'
import './index.less'
import { NoLimitFunc } from '../../@types/common'
import { useFormContext } from '../form/context'

declare module "solid-js" {
  namespace JSX {
    interface CustomEvents {
      click: NoLimitFunc
    }
  }
}


export default (props: Partial<InputProps>) => {

  const formCtx = useFormContext()

  const isLazy = () => props.lazy || formCtx?.lazy

  const [getter, setter] = props.bind || []

  const intersectionOfInputAttrsAndProps = ['maxlength', 'name', 'id', 'placeholder']

  const [inputEl, setInputEl] = createSignal<HTMLInputElement | HTMLTextAreaElement>()

  const [labelEl, setLabelEl] = createSignal<HTMLLabelElement>()

  const [satisfyRules, setSatisfyStatus] = createSignal<boolean>(false)

  const [selfErr, setSelfErr] = createSignal<string | JSXElement>('')

  const shouldUseContext = () => !!(formCtx && (props.name || props.label))

  const labelWidth = () => props.labelWidth || formCtx?.labelWidth

  const showError = () => props.showError || formCtx?.showError

  const errorTextAlign = () => props.errorTextAlign || formCtx?.errorTextAlign

  const labelAlign = () => props.labelAlign || formCtx?.labelAlign

  const shouldFieldCheck = () => ((props.validator || props.rules?.length) && (props.showError))

  const disabled = () => !!(props.disabled || formCtx?.disabled)

  const readonly = () => !!(props.readonly || formCtx?.readonly)

  const colon = () => !!(props.colon || formCtx?.colon)

  const isTextArea = () => props.textarea || props.type === InputTypeDict.textarea

  const currentErrFromForm = () => {
    if (!formCtx) return
    return formCtx?.fieldErrs()[(props.name || props.label) as string]
  }

  createEffect(on(currentErrFromForm, (errExist) => {
    if (formCtx?.scrollToErr && inputEl() && errExist) {
      inputEl()?.scrollIntoView()
    }
  }))

  const getValue = (): string | number => {
    // if use "bind" prop, returns getter. 
    if (!!getter) {
      return getter()
      // or if user set "value" prop 
    } else if (!isNil(props.value)) {
      return props.value
      // or if value is from form context
    } else if (shouldUseContext()) {
      return formCtx!.formValue()[(props.name || props.label)! as string] as string | number
    } else {
      return ''
    }
  }

  const [currentLen, setLength] = createSignal(getValue()?.toString()?.length || 0)

  const makeReactive = (event: Event, formatterFlag: boolean) => {

    const input = event.target as HTMLInputElement

    if (props.formatter && formatterFlag) {
      input.value = props.formatter(input.value)
    }

    setter && setter(input.value)

    if (shouldUseContext()) {
      formCtx!.setFormItemValue(
        (props.name || props.label) as string,
        input.value
      )
    }
  }

  const handleTextArea = (event: Event) => {
    const input = event.target as HTMLInputElement

    // auto handle textarea height while "autosize" is true 
    if (
      (isTextArea()) &&
      input.value &&
      props.autosize
    ) {
      input.style.height = ''
      labelEl()!.style.height = ''
      if (input.offsetHeight < input.scrollHeight) {
        input.style.height = (input.scrollHeight + 'px')
        if (labelAlign() === 'center') {
          labelEl()!.style.height = (input.scrollHeight + 'px')
        }
      }
    }
  }

  const execCheck = () => {
    const value = inputEl()?.value || ''

    if (shouldFieldCheck()) {

      let isPass = true

      const rules = [...(props.rules || []), { 
        validator: props.validator, errTip: props.errorText, successCallback: null, failCallback: null }
      ]

      try {

        rules.filter(item => item.validator).forEach(rule => {

          const { validator, failCallback, successCallback, errTip } = rule
          
          let result = (isFunction(validator)) ? validator(value) : validator!.test(value)

          if (!result) {
            
            errTip && setSelfErr(errTip as (string | JSXElement))

            isFunction(failCallback) && failCallback(value)
  
            isPass = false

            if (propDefaultValue(props.lazyValidate, true)) {
              throw new Error('')
            }
  
          } else {
            isFunction(successCallback) && successCallback(value)
          }

  
        })
      } catch(err) {
      }
      setSatisfyStatus(isPass)
    }

  }

  getter && createEffect(on(getter!, () => {
    execCheck()
    if (
      // if is number type input
      props.type === InputTypeDict.number &&
      // and user set "maxlength" prop 
      isNumber(props.maxlength) &&
      inputEl?.call(void 0) &&
      // and the length of value is over limit
      inputEl()!.value.length > props.maxlength
    ) {
      inputEl()!.value = inputEl()!.value.slice(0, props.maxlength)
    }
  }))

  // when "lazy" prop is true, reactive handler exec only "onchange" event dispatch
  const onChange = mergeEvents(
    props.onChange,
    (evt) => isLazy() && makeReactive(evt, !!props.formatter && props.formatterTrigger === HTMLNativeEvent.change)
  )

  // when "lazy" prop is false, reactive handler exec only "oninput" event dispatch
  const onInput = mergeEvents(
    props.onInput,
    (evt) => !isLazy() && makeReactive(evt, !!props.formatter && props.formatterTrigger === HTMLNativeEvent.input),
    handleTextArea,
    (evt) => setLength((evt.target as HTMLInputElement).value.length)
  )

  const onBlur = mergeEvents(
    props.onBlur,
    evt => makeReactive(evt, !!props.formatter && (props.formatterTrigger === HTMLNativeEvent.blur || !props.formatterTrigger)),
    execCheck
  )

  const onClear = () => {
    setter?.call(void 0, '')
    inputEl()!.style.height = ''
    labelEl()!.style.height = ''
  }

  const classList = () => ({
    // style of "clearIcon" is also used for other rightIcons.
    "solidMobile-input-cell-with-clear": !!props.clearIcon || !!props.clearable || !!props.rightIcon || !!props.islink,
    "solidMobile-input-cell-required": !!props.required,
    "solidMobile-input-cell-align-center": !!props.center,
    "solidMobile-input-cell-disabled": !!disabled(),
    "solidMobile-input-cell-textarea-autosize": isTextArea(),
    [`solidMobile-input-cell-with-label-${propDefaultValue(labelAlign(), 'left')}`]: true,
  })

  // returns "not null check" result
  const isRequiredButEmpty = () => !!props.required && !props.value && !getter?.call(void 0)


  const inputClassList = () => ({
    "solidMobile-input-cell-field-required": isRequiredButEmpty() && showError()
  })

  onMount(() => {
    props.autofocus && inputEl()?.focus();
    shouldFieldCheck() && execCheck()
    if (shouldUseContext()) {
      formCtx!.setFields(props.name || props.label as string)
    }
  })

  return (
    <div
      classList={classList()}
      class="solidMobile-input-cell">
      <span
        ref={setLabelEl}
        on:click={props.onClickLabel}
        style={{ width: isString(labelWidth()) ? labelWidth() : labelWidth() + 'px' }}
        class={"solidMobile-input-cell-label" + ` ${props.labelClass}`}>
        <MaybeElement maybeJsx={props.leftIcon}>
          <Icon
            on:click={props.onClickLeftIcon}
            name={props.leftIcon as string}>
          </Icon>
        </MaybeElement>
        {props.label}{colon() ? ':' : ''}
      </span>
      <Show
        fallback={
          <>
            <textarea
              {...attrsForward(props, intersectionOfInputAttrsAndProps)}
              class="solidMobile-input-cell-field"
              classList={inputClassList()}
              disabled={disabled()}
              readOnly={readonly()}
              onInput={onInput}
              onChange={onChange}
              ref={setInputEl}
              onFocus={props.onFocus}
              on:click={props.onClickValue}
              onBlur={onBlur}
              value={getValue()}
            />
          </>
        }
        when={!isTextArea()}>
        <input
          {...attrsForward(props, intersectionOfInputAttrsAndProps)}
          class="solidMobile-input-cell-field"
          disabled={disabled()}
          readOnly={readonly()}
          classList={inputClassList()}
          onInput={onInput}
          onChange={onChange}
          ref={setInputEl}
          onFocus={props.onFocus}
          on:click={props.onClickValue}
          onBlur={onBlur}
          value={getValue()}
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
      <Show when={
        getValue() &&
        props.showWordLimit &&
        props.maxlength &&
        isTextArea()}>
        <span class="solidMobile-input-cell-field-limit">
          {currentLen() + `/${props.maxlength}`}
        </span>
      </Show>

      <Switch 
        fallback={
          <Show when={ showError() && props.showWordLimit}>
            <span
              style={{ visibility: 'hidden' }} 
              class="solidMobile-input-cell-error-tip"> { props.showWordLimit!.toString() } 
            </span>
          </Show>
        }>
        <Match when={showError() && currentErrFromForm()}>
          <span
            style={{ "text-align": errorTextAlign() }}
            class="solidMobile-input-cell-error-tip">
            {currentErrFromForm()}
          </span>
        </Match>
        <Match when={showError() && selfErr() && !satisfyRules() }>
          <span
            style={{ "text-align": errorTextAlign() }}
            class="solidMobile-input-cell-error-tip">
            { selfErr() || props.errorText }
          </span>
        </Match>
      </Switch>
    </div>
  )
}