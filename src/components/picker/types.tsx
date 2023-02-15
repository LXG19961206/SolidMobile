import { JSXElement } from "solid-js"
import { BasePropsAndAttrs } from "../common/types"

export type PickerOptions = {
  text: string | number,
  value?: string | number,
  children?: PickerOptions [],
  disabled?: boolean,
  className?: string
}

export interface PickerProps {
  columns: PickerOptions [] | Array<PickerOptions []>,
  title?: string | JSXElement,
  confirmText?: string | JSXElement,
  cancelText?: string | JSXElement,
  visibleItemCount?: number,
  optionHeight?: number,
  swipeDuration?: number,
  withInertia?: boolean,
  onChange: (value: PickerOptions) => unknown
}