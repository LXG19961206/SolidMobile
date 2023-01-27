import { PositionDict, SizeDict, ThemeTypeDict } from "../dict/common"

import { Accessor } from 'solid-js'

export type ThemeType = keyof typeof ThemeTypeDict

export type Size = keyof typeof SizeDict

export type Position = keyof typeof PositionDict

export type EventName = `on${string}`

export type ComponentProps<T> = {
  [key in keyof T] : T[key] extends Function ? T[key] : Accessor<T[key]> 
}

export type NoLimitFunc = (...arg: unknown []) => unknown