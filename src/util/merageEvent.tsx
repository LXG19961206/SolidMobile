import { isFunction } from "lodash";
import { EventHandleFunc, NoLimitFunc } from "../@types/common";

export const mergeEvent = function<T = Event> (...fns: (EventHandleFunc | void) []) {
  return (evt: T) => fns.filter(isFunction).forEach(fn => fn.call(void 0, evt))
}