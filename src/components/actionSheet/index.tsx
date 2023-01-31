import { createSignal, Show, For, Accessor, Setter } from 'solid-js'
import { Portal } from 'solid-js/web'
import { isArray } from 'lodash'
import './index.less'

import Overlay from '../overlay'
import { ActionSheetProps, OptionItem } from './types'

let showStatusGetter: Accessor<boolean>, showStatusSetter: Setter<boolean>

let actionSheetGetter: Accessor<HTMLDivElement | void>, actionSheetSetter: Setter<HTMLDivElement | void>

const close = (duration: number) => {
  actionSheetGetter()?.classList.add('hide')
  setTimeout(() => showStatusSetter(false), duration)
}

export default (props: ActionSheetProps) => {

  const [overlay, setOverlay] = createSignal<HTMLDivElement>()

  const duration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--solidMobile-actionSheet-animation-close')) * 1000;

  [showStatusGetter, showStatusSetter] = props.bind;

  [actionSheetGetter, actionSheetSetter] = createSignal<HTMLDivElement>()

  const classList = () => ({
    "solidMobile-actionSheet-round": !!props.round
  })

  const whenSelect = (item: OptionItem) => {

    props.whenSelect && props.whenSelect(item)

    if (props.closeOnSelect)  close(duration)

  }

  return (
    <Show when={showStatusGetter()}>
      <Show when={props.overlay}>
        <Overlay
          onClick={() => props.closeWhenClickOverlay && showStatusSetter(false)}
          style={props.overlayStyle}
          portal={props.portal!}
          show={!!props.overlay}>
          <div class="solidMobile-actionSheet-overlay" ref={setOverlay}></div>
        </Overlay>
      </Show>
      <Portal mount={props.overlay ? overlay()! : props.portal}>
        <div
          ref={actionSheetSetter}
          classList={classList()}
          style={{ "z-index": props.zIndex }}
          class="solidMobile-actionSheet">
          <Show when={props.items && props.items.length}>
            <div class="solidMobile-actionSheet-items">
              <For each={props.items}>
                {
                  (item) => (
                    <div
                      onClick={[whenSelect, item]}
                      class="solidMobile-actionSheet-item">
                      <p class="solidMobile-actionSheet-item-name"> {item.name} </p>
                      <p class="solidMobile-actionSheet-item-subname"> {item.subname} </p>
                    </div>
                  )
                }
              </For>
            </div>
          </Show>
        </div>
      </Portal>
    </Show>
  )
}