import { ButtonOptions } from './types'
import './index.less'
import { SizeDict, ThemeTypeDict } from '../../dict/common'
import { pick, isString } from 'lodash'
import loading from '../../assets/loading.svg'
import { Show, onMount, onCleanup } from 'solid-js'
import { HTMLNativeEvent } from '../../dict/native'
import { MaybeElement } from '../common'


export default (props: Partial<ButtonOptions>) => {

  let buttonElementReference:HTMLButtonElement = document.createElement('button')

  const maybeText = (props.text || props.children || '')!

  const events = pick(props, Object.keys(props).filter(key => /on[A-Za-z0-9]{1,}/.test(key)))

  const classList = () => ({
    'lxgUI-button': true,
    'lxgUI-button-normal': !props.size || props.size === SizeDict.normal,
    'lxgUI-button-mini': props.size === SizeDict.mini,
    'lxgUI-button-large': props.size === SizeDict.large,
    'lxgUI-button-primary': !props.type || props.type === ThemeTypeDict.primary,
    'lxgUI-button-success': props.type === ThemeTypeDict.success,
    'lxgUI-button-danger': props.type === ThemeTypeDict.danger,
    'lxgUI-button-warning': props.type === ThemeTypeDict.warning,
    'lxgUI-button-plain': props.plain,
    'lxgUI-button-round': props.round,
    'lxgUI-button-disabled': props.disabled || props.loadingStatus,
    'lxgUI-button-block': props.block,
    'lxgUI-button-hairline': props.hairline,
  })

  onMount(() => {
    props.action && buttonElementReference.addEventListener(HTMLNativeEvent.click, props.action)
  })

  onCleanup(() => {
    props.action && buttonElementReference.removeEventListener(HTMLNativeEvent.click, props.action)
  })

  return (
    <button
      {...events}
      ref={ buttonElementReference }
      type={props.nativeType}
      style={{ color: props.textColor }}
      disabled={props.loadingStatus || props.disabled || false}
      classList={classList()}>
      {
        <>
          <MaybeElement
            maybeJsx={maybeText}>
            <p class="lxgUI-button-text"> {maybeText} </p>
          </MaybeElement>
          <Show when={props.loadingStatus || props.icon}>
            <img
              src={props.loadingStatus ? loading : props.icon}
              class={props.iconClass || "lxgUI-button-icon"} />
          </Show>
        </>
      }
    </button>
  )
}