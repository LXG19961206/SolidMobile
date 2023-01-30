import './index.less'
import { ToastProps } from './types'
import { Show, createSignal, Switch, Match } from 'solid-js'
import { Portal } from 'solid-js/web'
import { NoLimitFunc } from '../../@types/common'
import Icon from '../icon'

const [isToastExist, setExist] = createSignal(false)

let lastToastSetter: NoLimitFunc

const Toast = (props: Partial<ToastProps>) => {

  if (isToastExist()) {
    lastToastSetter(false)
    setExist(false)
  }

  setExist(true)

  const [show, setShow] = createSignal(true)

  const node = (
    <Show when={show()}>
      <Portal mount={props.portal}>
        <div
          class="solidMobile-toast">
          <Show when={props.icon || props.type}>
            <p class="solidMobile-toast-icon">
              <Switch>
                <Match when={props.type === 'success'}>
                  <Icon name="success"></Icon>
                </Match>
                <Match when={props.type === 'loading'}>
                  <Icon name="loading"></Icon>
                </Match>
                <Match when={props.type === 'fail'}>
                  <Icon name="error"></Icon>
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

  lastToastSetter = setShow

  props.duration !== 0 && setTimeout(() => {

    if (!show()) return

    setShow(false)

    setExist(false)

  }, props.duration || 3000)

  return node
}


export default Toast