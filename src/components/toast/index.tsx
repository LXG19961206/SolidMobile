import './index.less'
import { ToastProps } from './types'
import { Show, createSignal, Switch, Match, Accessor, Setter, JSXElement, JSX } from 'solid-js'
import { Portal } from 'solid-js/web'
import { isString } from 'lodash'
import Icon from '../icon'
import Overlay from '../overlay'
import { BasePropsAndAttrs } from '../common/types'
import { OverLayProps } from '../overlay/types'

export const ToastTypeDict = {
  success: 'success',
  fail: 'fail',
  loading: 'loading'
}

let lastToastShowStatus: Accessor<boolean>,
  lastToastStatusSetter: Setter<boolean>

let overlayRef: HTMLElement

const Toast = (props: Partial<ToastProps>) => {

  if (lastToastShowStatus && lastToastShowStatus()) {
    lastToastStatusSetter(false)
  }

  [lastToastShowStatus, lastToastStatusSetter] = createSignal(true)

  const classList = () => ({
    'solidMobile-toast-breakWord': props.keepAll,
    'solidMobile-toast-withOverlay': !!props.overlay,
    [`solidMobile-toast-${props.position || 'middle'}`]: true
  })

  const whenClickOverlay = () => props.closeWhenClickOverlay && lastToastStatusSetter(false)

  const whenClickToast = () => props.closeWhenClick && lastToastStatusSetter(false)

  const node = (
    <Show when={lastToastShowStatus()}>
      <Show when={props.overlay}>
        <Overlay
          style={{ ...props.overlayStyle as JSX.CSSProperties }}
          onClick={ whenClickOverlay }
          show={true}>
          <div class="solidMobile-toast-overlay" ref={el => overlayRef = el}>
          </div>
        </Overlay>
      </Show>
      <Portal mount={props.overlay ? overlayRef : props.portal}>
        <div
          onClick={ whenClickToast }
          classList={classList()}
          style={{ ...props.style as JSX.CSSProperties ,"z-index": props.zIndex }}
          class="solidMobile-toast">
          <Show when={props.icon || props.type}>
            <p class="solidMobile-toast-icon">
              <Switch>
                <Match when={props.type === ToastTypeDict.success}>
                  <Icon name="success"></Icon>
                </Match>
                <Match when={props.type === ToastTypeDict.loading}>
                  <Icon name="Loading" class="solidMobile-toast-icon-withRotate"></Icon>
                </Match>
                <Match when={props.type === ToastTypeDict.fail}>
                  <Icon name="error"></Icon>
                </Match>
                <Match when={isString(props.icon)}>
                  <Icon name={props.icon as string} />
                </Match>
                <Match when={props.icon}>
                  {props.icon as JSXElement}
                </Match>
              </Switch>
            </p>
          </Show>
          <span class="solidMobile-toast-text">
            {props.message}
          </span>
        </div>
      </Portal>
    </Show>
  )

  props.duration !== 0 && setTimeout(() => {
    if (!lastToastShowStatus()) return
    lastToastStatusSetter(false)
  }, props.duration || 3000)

  return node
}


export default Toast