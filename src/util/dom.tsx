import { HTMLNativeEvent } from '../dict/native'

const fn = (evt: Event) => evt.preventDefault() 

export const disabledIOSElasticScroll = () => {
  
  const { touchEnd, touchMove, touchStart } = HTMLNativeEvent;

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