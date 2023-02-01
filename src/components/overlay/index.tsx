import './index.less'
import { OverLayProps } from './types'
import { Show, onMount, createEffect, on, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { HTMLNativeEvent } from '../../dict/native'
import { pick } from 'lodash'
import { useNativeEventFilter } from '../../hooks'


export default (props: OverLayProps) => {

  const [overlayRef, setRef] = createSignal<HTMLDivElement>()


  createEffect(on(overlayRef, () => {
    const wrapper = overlayRef()
    wrapper && wrapper.addEventListener(
      HTMLNativeEvent.touchMove, (evt: Event) => evt.preventDefault()
    )
  }))
  
  return (
    <Portal mount={props.portal}>
      <Show when={props.show}>
        <div
          { ...useNativeEventFilter(props) }
          style={{ 
            "z-index": props.zIndex,
            height: props.portal ? '100%' : '100vh',
            width: props.portal ? '100%' : '100vw'
          }}
          ref={setRef}
          class="solidMobile-overlay">
          {props.content || props.children}
        </div>
      </Show>
    </Portal>
  )
}