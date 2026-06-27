import { isNil } from 'lodash'

export const propDefaultValue = function<T = unknown>(
  propValue: T | void, 
  defaultValue: T
): T {
  return isNil(propValue) ? defaultValue : propValue as T
}