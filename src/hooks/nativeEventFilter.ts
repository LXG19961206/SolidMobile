import { pick, pickBy } from 'lodash'
import { EventHandleFunc } from "../@types/common";
import { BasePropsAndAttrs } from "../components/common/types";

type NativeEventListeners = { [eventName: `on${string}`]: EventHandleFunc | void }

export const useNativeEventFilter = function  <T extends Partial<BasePropsAndAttrs>>(props: T): NativeEventListeners {
  return pick(
    props, 
    Object.keys(props)
      .filter(key => /^on(\:?)[a-zA-Z]{1,}$/.test(key))
      .filter(eventName => eventName.replace(':', '').toLocaleLowerCase() in window)
  )
}