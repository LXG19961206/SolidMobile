import './index.less'
import { OverLayProps } from './types'
import { Show, onMount, createEffect, on, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { HTMLNativeEvent } from '../../dict/native'
import { pick } from 'lodash'


export default (props: OverLayProps) => {

  const [overlayRef, setRef] = createSignal<HTMLDivElement>()

  const events = pick(props, Object.keys(props).filter(key => /on[A-Za-z0-9]{1,}/.test(key)))

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
          { ...events }
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