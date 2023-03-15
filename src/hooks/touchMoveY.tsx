import { isFunction } from "lodash"
import { Accessor, onCleanup, onMount } from "solid-js"
import { HTMLNativeEvent } from "../dict/native"

interface TouchMoveOpts {
  upwardCallback?: (
    payload: {
      distance: number,
      lastY: number,
      evt: TouchEvent
    }) => unknown

  downwardCallback?: (
    distance: number, 
    lastY: number,
    evt: TouchEvent
  ) => unknown
}

export const useTouchMoveY = (
  el: (HTMLElement | Element | Node) | Accessor<(HTMLElement | Element | Node)>,
  opts: TouchMoveOpts
) => {


  const touchStart = (
    evt: TouchEvent
  ) => {

  }

  const touchMove = (
    evt: TouchEvent
  ) => {
    
  }

  const touchEnd = () => { }

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