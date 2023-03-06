import { HTMLNativeEvent } from '../dict/native'

const fn = (evt: Event) => evt.preventDefault()

export const placeholderFn = () => {}

export const disableIOSElasticScroll = () => {

  const { touchMove } = HTMLNativeEvent;

  [touchMove].forEach(event => (
    document.documentElement.addEventListener(event, fn, {
      passive: false
    })
  ))

  return () => {
    [touchMove].forEach(event => (
      document.documentElement.removeEventListener(event, fn)
    ))
  }
}


let lastTouchEnd = 0, alreadyWork = false

const disableZoomTouchStartListener = (event: TouchEvent) => event.touches.length > 1 && event.preventDefault()

const disableZoomTouchEndListener = (event: TouchEvent) => {

  const now = +new Date()

  now - lastTouchEnd <= 300 && event.preventDefault()

  lastTouchEnd = now

}

export const disableIosDBClickZoom = () => {

  if (alreadyWork) return placeholderFn

  alreadyWork = true

  document.addEventListener(HTMLNativeEvent.touchStart, disableZoomTouchStartListener)

  document.addEventListener(HTMLNativeEvent.touchEnd, disableZoomTouchEndListener, false)

  return () => {

    alreadyWork = false

    document.removeEventListener(HTMLNativeEvent.touchStart, disableZoomTouchStartListener)

    document.removeEventListener(HTMLNativeEvent.touchEnd, disableZoomTouchEndListener)

  }

}