import { JSX, JSXElement } from "solid-js";
import { NoLimitFunc, Position } from "../../@types/common";
import { BasePropsAndAttrs } from "../common/types";

export type ToastType = 'success' | 'loading' | 'fail'

export interface ToastProps extends BasePropsAndAttrs {
  type: ToastType,
  position: Position,
  keepAll: boolean,
  message: string | number | JSXElement,
  icon: String | JSXElement,
  overlay: boolean,
  duration: number,
  zIndex: number,
  portal: Node,
  onClose: NoLimitFunc,
  onOpen: NoLimitFunc,
  overlayStyle: JSX.CSSProperties,
  closeWhenClick: boolean,
  closeWhenClickOverlay: boolean,
  forbidClick: boolean
}