import { isFunction } from "lodash"
import { Accessor, onCleanup, onMount } from "solid-js"
import { HTMLNativeEvent } from "../dict/native"
import { FixedQueue } from "../util/FixedQueue"

type DispatchPayload = {
  distance: number,
  lastY: number,
  evt: TouchEvent,
  getDistanceRecords: () => number [],
  getPosRecords: () => number [],
  getMoveRecords: () => number []
}

interface TouchMoveOpts {

  maxRecordCount?: number

  upwardCallback?: (payload: DispatchPayload) => unknown

  callback?: (payload: DispatchPayload) => unknown

  downwardCallback?: (payload: DispatchPayload) => unknown

}

export const useTouchMoveY = (
  el: (HTMLElement | Element | Node) | Accessor<(HTMLElement | Element | Node)>,
  opts: TouchMoveOpts
) => {

  let distance = 0, chunkMove = 0, lastY = 0

  let distanceRecords = new FixedQueue<number>(opts.maxRecordCount || 30),

      posRecoeds = new FixedQueue<number>(opts.maxRecordCount || 30),
      
      chunkMoveRecords = new FixedQueue<number>(opts.maxRecordCount || 30)


  const touchStart = (
    evt: TouchEvent
  ) => {
    
    distance = chunkMove = lastY = 0

    distanceRecords.clear()

    posRecoeds.clear()

    chunkMoveRecords.clear()

    lastY = evt.touches[0].clientY

    posRecoeds.push(lastY)

    chunkMoveRecords.push(0)

    distanceRecords.push(0)

  }

  const touchMove = (
    evt: TouchEvent
  ) => {
   
    const currentY = evt.touches[0].clientY
    
    chunkMove = currentY - lastY
    
    distance += chunkMove;

    (distance < 0 ? opts.downwardCallback : opts.upwardCallback)?.call(
      void 0, { 
        distance, lastY, evt,
        getDistanceRecords: () => distanceRecords._value,
        getMoveRecords: () => chunkMoveRecords._value,
        getPosRecords: () => posRecoeds._value
      }
    ) 
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