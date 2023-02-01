import { createSignal, Show, For, Accessor, Setter } from 'solid-js'
import { Portal } from 'solid-js/web'
import Button from '../button'
import './index.less'

import Overlay from '../overlay'
import { ActionSheetProps, OptionItem } from './types'
import { SizeDict } from '../../dict/common'

let showStatusGetter: Accessor<boolean>,
  showStatusSetter: Setter<boolean>,
  theLastSheetId: number,
  actionSheetGetter: Accessor<HTMLDivElement | void>,
  actionSheetSetter: Setter<HTMLDivElement | void>

const close = (duration: number, id: number) => {
  actionSheetGetter()?.classList.add('hide')
  setTimeout(() => {
    if (theLastSheetId === id && showStatusGetter?.call(void 0)) {
      showStatusSetter(false)
    }
  }, duration)
}

const actionsItemClassList = (itemProps: OptionItem) => ({
  [`solidMobile-actionSheet-item-${itemProps.subname ? 'both' : 'single'}`]: true
})

export default (props: ActionSheetProps) => {

  if (showStatusGetter?.call(void 0)) showStatusSetter(false)

  theLastSheetId = +new Date()

  const [overlay, setOverlay] = createSignal<HTMLDivElement>()

  const duration = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--solidMobile-actionSheet-animation-close')
  ) * 1000;


  const textColorVar = () => getComputedStyle(document.documentElement).getPropertyValue('--solidMobile-dark-main');

  [showStatusGetter, showStatusSetter] = props.bind;

  [actionSheetGetter, actionSheetSetter] = createSignal<HTMLDivElement>()

  const classList = () => ({
    "solidMobile-actionSheet-round": !!props.round
  })

  const whenSelect = (item: OptionItem) => {
    props.onSelect?.call(void 0, item)
    if (props.closeOnSelect) close(duration, theLastSheetId)
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
                      classList={actionsItemClassList(item)}
                      class="solidMobile-actionSheet-item">
                      <p class="solidMobile-actionSheet-item-name"> {item.name} </p>
                      <p class="solidMobile-actionSheet-item-subname"> {item.subname} </p>
                    </div>
                  )
                }
              </For>
            </div>
          </Show>
          <Show when={props.cancelText}>
            <div class="solidMobile-actionSheet-cancel-gap"></div>
            <Button
              color={'transparent'} 
              textColor={textColorVar()}
              size={SizeDict.large}> { props.cancelText || '取消' }
            </Button>
          </Show>
        </div>
      </Portal>
    </Show>
  )
}