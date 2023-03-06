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

const touchStartListener = (event: TouchEvent) => event.touches.length > 1 && event.preventDefault()

const touchEndListener = (event: TouchEvent) => {

  const now = +new Date()

  now - lastTouchEnd <= 300 && event.preventDefault()

  lastTouchEnd = now

}

export const disableIosDBClickZoom = () => {

  if (alreadyWork) return placeholderFn

  alreadyWork = true

  document.addEventListener(HTMLNativeEvent.touchStart, touchStartListener)

  document.addEventListener(HTMLNativeEvent.touchEnd, touchEndListener, false)

  return () => {

    document.removeEventListener(HTMLNativeEvent.touchStart, touchStartListener)

    document.removeEventListener(HTMLNativeEvent.touchEnd, touchEndListener)

  }

}