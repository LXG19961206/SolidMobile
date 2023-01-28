import { ButtonProps } from './types'
import './index.less'
import { SizeDict, ThemeTypeDict } from '../../dict/common'
import { pick, isString } from 'lodash'
import loading from '../../assets/loading.svg'
import { Show, JSX } from 'solid-js'
import { HTMLNativeEvent } from '../../dict/native'
import { MaybeElement } from '../common'
import Icon from '../icon'

export default (props: Partial<ButtonProps>) => {

  let buttonElementReference: HTMLButtonElement = document.createElement('button')

  const maybeText = (props.text || props.children || '')!

  const events = pick(props, Object.keys(props).filter(key => /on[A-Za-z0-9]{1,}/.test(key)))

  const classList = () => ({
    'solidMobile-button': true,
    'solidMobile-button-normal': !props.size || props.size === SizeDict.normal,
    'solidMobile-button-mini': props.size === SizeDict.mini,
    'solidMobile-button-small': props.size === SizeDict.small,
    'solidMobile-button-large': props.size === SizeDict.large,
    'solidMobile-button-primary': !props.type || props.type === ThemeTypeDict.primary,
    'solidMobile-button-success': props.type === ThemeTypeDict.success,
    'solidMobile-button-danger': props.type === ThemeTypeDict.danger,
    'solidMobile-button-warning': props.type === ThemeTypeDict.warning,
    'solidMobile-button-plain': props.plain,
    'solidMobile-button-round': props.round,
    'solidMobile-button-disabled': props.disabled || props.loadingStatus,
    'solidMobile-button-block': props.block,
    'solidMobile-button-hairline': props.hairline,
  })

  return (
    <button
      {...events}
      ref={buttonElementReference}
      onClick={props.action}
      type={props.nativeType}
      style={{ ...(props.style || {}) as JSX.CSSProperties, color: props.textColor }}
      disabled={props.loadingStatus || props.disabled || false}
      classList={classList()}>
      {
        <>
          <MaybeElement
            maybeJsx={maybeText}>
            <p class="solidMobile-button-text">
              {maybeText}
              <Show when={props.loadingStatus || props.icon}>
                {
                  props.loadingStatus
                    ? (
                      <Icon name={'Loading'} class={props.iconClass || "solidMobile-button-icon"} />
                    )
                    : (
                      <Show
                        fallback={props.icon}
                        when={props.icon && isString(props.icon)}>
                        <Icon
                          name={props.loadingStatus ? 'Loading' : props.icon as string}
                          class={props.iconClass || "solidMobile-button-icon"}
                        />
                      </Show>
                    )
                }
              </Show>
            </p>
          </MaybeElement>
        </>
      }
    </button>
  )
}