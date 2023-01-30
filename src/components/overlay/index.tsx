import './index.less'
import { OverLayProps } from './types'
import { Show, onMount } from 'solid-js'
import { Portal } from 'solid-js/web'
import { HTMLNativeEvent } from '../../dict/native'

import { isNil } from 'lodash'

export default (props: OverLayProps) => {

  let overlay:HTMLDivElement

  onMount(() => {
    if (isNil(props.disableScroll) || props.disableScroll) {
      overlay.addEventListener(HTMLNativeEvent.touchMove, (evt) => {
        evt.preventDefault()
      })
    }
  })

  return (
    <Portal mount={props.portal}>
      <Show when={props.show}>
        <div
          ref={ el => overlay = el }
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