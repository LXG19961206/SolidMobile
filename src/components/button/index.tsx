import { ButtonProps } from './types'
import './index.less'
import { pick, isString } from 'lodash'
import { Show, JSX } from 'solid-js'
import { MaybeElement } from '../common'
import Icon from '../icon'
import { useNativeEventFilter } from '../../hooks'



export default (props: Partial<ButtonProps>) => {

  let buttonElementReference: HTMLButtonElement = document.createElement('button')


  const maybeText = (props.text || props.children || '')!


  const classList = () => ({
    'solidMobild_activable': true,
    'solidMobile-button': true,
    [`solidMobile-button-${props.size || 'normal'}`]: true,
    [`solidMobile-button-${props.type || 'custom'}`]: true,
    'solidMobile-button-plain': props.plain,
    'solidMobile-button-round': props.round,
    'solidMobile-button-disabled': props.disabled || props.loadingStatus,
    'solidMobile-button-block': props.block,
    'solidMobile-button-hairline': props.hairline,
  })


  return (
    <button
      {...useNativeEventFilter(props)}
      ref={buttonElementReference}
      onClick={props.action}
      onTouchStart={props.action}
      type={props.nativeType}
      style={{ ...(props.style || {}) as JSX.CSSProperties, background: props.color, color: props.textColor }}
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