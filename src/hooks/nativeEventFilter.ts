import { pick, pickBy } from 'lodash'
import { EventHandleFunc } from "../@types/common";
import { BasePropsAndAttrs } from "../components/common/types";

type NativeEventListeners = { [eventName: `on${string}`]: EventHandleFunc | void }

export const useNativeEventFilter = function  <T extends Partial<BasePropsAndAttrs>>(
  props: T
): NativeEventListeners {
  return pick(
    props,
    Object.keys(props)
      /* attrName must start with string 'on' */
      .filter(key => /^on(\:?)[a-zA-Z]{1,}$/.test(key))
      /* and muse be native event of HTML */
      .filter(eventName => eventName.replace(':', '').toLocaleLowerCase() in window)
  )
}