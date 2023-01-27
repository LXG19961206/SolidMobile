import { NoLimitFunc, Position, Size, ThemeType } from "../../@types/common"
import { Component, JSXElement, Accessor } from 'solid-js'


export type ButtonNativeTypes = 'submit' | 'reset'

export interface ButtonOptions  {
  type: ThemeType, 
  action: NoLimitFunc,
  size: Size,
  text: string,
  color: string, 
  textColor: string,
  icon: string,
  iconClass: string,
  iconPosition: Position, // todo
  nativeType: ButtonNativeTypes,
  block: boolean,
  plain: boolean,
  round: boolean,
  disabled: boolean,
  hairline: boolean,
  loadingStatus: boolean,
  children: JSXElement | string,
  [event: `on${string}`]: NoLimitFunc
}
