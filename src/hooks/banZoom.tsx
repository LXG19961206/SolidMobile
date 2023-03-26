import { onMount, onCleanup } from "solid-js"
import { disableIosDBClickZoom } from "../util/dom"
import { isFunction } from 'lodash'
export const useBanZoom = () => {
  
  let dispose: Function

  onMount(() => {

    dispose = disableIosDBClickZoom()

  })

  onCleanup(() => isFunction(dispose) && dispose())

}