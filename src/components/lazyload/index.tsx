import { onMount, onCleanup, createSignal, Show } from 'solid-js'
import { Dynamic } from 'solid-js/web' 
import { LazyloadProps } from './types'
import { getVisibilityWithRect, getScrollElement } from '../../util/dom'
import * as SchduleUtil from '../../util/schedule'
import { HTMLNativeEvent } from '../../dict/native'
import { debounce, times } from 'lodash'
import { Millisecond, Second } from '../../dict/time'

export default (props: LazyloadProps) => {

  const [active, setActive] = createSignal(false)

  const [wrapper, setWrapper] = createSignal<HTMLElement>()

  const scopeEffects: Function [] = []

  onMount(async () => {

    const listener = debounce(
      () => setActive(getVisibilityWithRect(wrapper())), Millisecond * 200
    )

    await SchduleUtil.waitUntilNextMicrotask()

    listener()

    const scrollEl = getScrollElement(wrapper())

    scrollEl.addEventListener(HTMLNativeEvent.scroll, listener)

    scopeEffects.push(
      () => scrollEl.removeEventListener(HTMLNativeEvent.scroll, listener)
    )

  })

  onCleanup(() => {

    scopeEffects.forEach(stopEffect => stopEffect())

  })

  return (
    <div class="solidMobile-lazyload-wrapper" ref={setWrapper}>
      <Show
        fallback={ <Dynamic component={ () => props.inactiveView }></Dynamic> } 
        when={active()}>
        <Dynamic component={ () => props.activeView }></Dynamic>
      </Show>
    </div>
  )
   

}