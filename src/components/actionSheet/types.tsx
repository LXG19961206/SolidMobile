import { Accessor, JSX, JSXElement, Setter } from "solid-js"
import { EventHandleFunc, NoLimitFunc } from "../../@types/common"
import { BasePropsAndAttrs } from "../common/types"

export type OptionItem = {
  name: string | JSXElement,
  subname?: string | JSXElement,
  disabeld?: boolean,
  callback?: NoLimitFunc,
  loading?: boolean
}

export interface ActionSheetProps extends BasePropsAndAttrs {
  bind: [Accessor<boolean>, Setter<Boolean>], 
  items?: OptionItem [],
  itemBorder?: boolean,
  title?: string | JSXElement,
  cancelText?: string | JSXElement,
  description?: string | JSXElement,
  closeable?: boolean,
  duration?: number,
  zIndex?: number,
  lockScroll?: boolean,
  round?: boolean,
  overlay?: boolean,
  overlayStyle?: JSX.CSSProperties,
  closeOnSelect?: boolean,
  closeWhenClickOverlay?: boolean,
  portal?: Node,
  beforeClose?: NoLimitFunc,
  whenSelect: (item: OptionItem) => unknown 
}