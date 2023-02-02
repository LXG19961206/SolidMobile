import { createSignal, Show, For, Accessor, Setter, Switch, Match } from 'solid-js'
import { Portal } from 'solid-js/web'
import Button from '../button'
import Icon from '../icon'
import './index.less'

import Overlay from '../overlay'
import { ActionSheetProps, OptionItem } from './types'
import { SizeDict } from '../../dict/common'
import { MaybeElement } from '../common'
import { NoLimitFunc } from '../../@types/common'
import { propDefaultValue } from '../../util/propDefaultValue'

let showStatusGetter: Accessor<boolean>,
  showStatusSetter: Setter<boolean>,
  theLastSheetId: number,
  actionSheetGetter: Accessor<HTMLDivElement | void>,
  actionSheetSetter: Setter<HTMLDivElement | void>

const close = (duration: number, id: number, beforeClose?: NoLimitFunc) => {

  actionSheetGetter()?.classList.add('hide')

  beforeClose?.call(void 0)

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
    "solidMobile-actionSheet-round": !!props.round,
    "solidMobile-actionSheet-custom": !!props.children
  })

  const whenSelect = (item: OptionItem) => {
    props.onSelect?.call(void 0, item)
    if (props.closeOnSelect) close(duration, theLastSheetId, props.beforeClose)
  }

  const closeSheet = () => {
    close(duration, theLastSheetId, props.beforeClose)
    props.onClose?.call(void 0)
  }

  return (
    <Show when={showStatusGetter() && (props.children || props.items?.length) }>
      <Show when={propDefaultValue(props.overlay, true)}>
        <Overlay
          disableScroll={propDefaultValue(props.lockScroll, true)}
          onClick={() => props.closeWhenClickOverlay && close.call(void 0, duration, theLastSheetId, props.beforeClose)}
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
          <Switch>
            <Match when={props.title || props.closeable}>
              <div class="solidMobile-actionSheet-header">
                <p class="solidMobile-actionSheet-header-title">
                  {props.title || '标题'}
                </p>
                <Show when={props.closeable}>
                  <Icon
                    onClick={closeSheet}
                    name="shut"
                    class='closeIcon'>
                  </Icon>
                </Show>
              </div>
            </Match>
            <Match when={props.description}>
              <div class="solidMobile-actionSheet-desc">
                {props.description}
              </div>
            </Match>
          </Switch>
          <Show
            fallback={props.children}
            when={!props.children}>
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
          </Show>
          <Show when={props.cancelText}>
              <div class="solidMobile-actionSheet-cancel-gap"></div>
              <MaybeElement maybeJsx={props.cancelText}>
                <Button
                  action={props.onCancel || close.bind(void 0, duration, theLastSheetId, props.beforeClose)}
                  color={'transparent'}
                  textColor={textColorVar()}
                  size={SizeDict.large}> {props.cancelText || '取消'}
                </Button>
              </MaybeElement>
            </Show>
        </div>
      </Portal>
    </Show>
  )
}