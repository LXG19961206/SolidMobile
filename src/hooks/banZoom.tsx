import { onMount, onCleanup } from "solid-js"
import { disableIosDBClickZoom } from "../util/dom"
export const useBanZoom = () => {
  
  let dispose: Function

  onMount(() => {

    dispose = disableIosDBClickZoom()

  })

  onCleanup(() => {

    dispose()
    
  })

}