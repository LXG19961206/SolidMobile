import './index.less'
import { OverLayProps } from './types'
import { Show, onMount, onCleanup, createEffect } from 'solid-js'
import { Portal } from 'solid-js/web'

import { isNil } from 'lodash'

export default (props: OverLayProps) => {

  const overflow = document.documentElement.style.overflow

  createEffect(() => {
    if (isNil(props.disableScroll) || props.disableScroll) {
      props.show
        ? document.documentElement.style.overflow = "hidden"
        : document.documentElement.style.overflow = overflow
    }
  })



  return (
    <Portal mount={props.portal}>
      <Show when={props.show}>
        <div
          style={{ 
            "z-index": props.zIndex,
            height: props.portal ? '100%' : '100vh',
            width: props.portal ? '100%' : '100vw'
          }}
          class="solidMobile-overlay">
          {props.content || props.children}
        </div>
      </Show>
    </Portal>

  )
}