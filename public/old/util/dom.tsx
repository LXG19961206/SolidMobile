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

export const getVisibilityWithRect = (el?: HTMLElement) => {

  if (!el) return false

  const containerHeight = window.innerHeight || document.documentElement.clientHeight

  const containerWidth = window.innerWidth || document.documentElement.clientWidth

  const rectInstance = el.getBoundingClientRect()

  return ([
    rectInstance.top > 0,
    rectInstance.top < containerHeight, // in slight y
    rectInstance.left > 0,
    rectInstance.left < containerWidth // in slight x
  ]).every(Boolean)

}

export const getScrollElement = (el?: HTMLElement) => {

  if (!el) return window

  const isScrollElement = (el: HTMLElement) => el.scrollHeight > el.clientHeight

  let target = el

  while (!isScrollElement(target)) {

    if (!target.parentElement) break

    target = target.parentElement

  }

  return isScrollElement(target) ? target : window

}