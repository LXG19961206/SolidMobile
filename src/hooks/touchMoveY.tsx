import { isFunction } from "lodash"
import { Accessor, onCleanup, onMount } from "solid-js"
import { HTMLNativeEvent } from "../dict/native"

interface TouchMoveOpts {
  upwardCallback?: (distance: number, lastY: number) => unknown
  downwardCallback?: (distance: number, lastY: number) => unknown
}

export const useTouchMoveY = (
  el: (HTMLElement | Element | Node) | Accessor<(HTMLElement | Element | Node)>,
  opts: TouchMoveOpts
) => {

  let startY = 0

  const touchStart = (
    evt: TouchEvent
  ) => {
    console.log(evt, 123)

    startY = 0

  }

  const touchMove = (
    evt: TouchEvent
  ) => {
    console.log(evt, 456)
  }

  const touchEnd = () => {}

  onMount(() => {

    const realEl = isFunction(el) ? el() : el

    realEl.addEventListener(HTMLNativeEvent.touchStart, touchStart as EventListener)

    realEl.addEventListener(HTMLNativeEvent.touchMove, touchMove as EventListener)

    realEl.addEventListener(HTMLNativeEvent.touchEnd, touchEnd as EventListener)

  })

  onCleanup(() => {

    const realEl = isFunction(el) ? el() : el

    realEl.removeEventListener(HTMLNativeEvent.touchStart, touchStart as EventListener)

    realEl.removeEventListener(HTMLNativeEvent.touchMove, touchMove as EventListener)

    realEl.removeEventListener(HTMLNativeEvent.touchEnd, touchEnd as EventListener)

  })

}