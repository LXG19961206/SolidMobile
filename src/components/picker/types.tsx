import { JSXElement } from "solid-js"
import { BasePropsAndAttrs } from "../common/types"

export type PickerOptions = {
  text: string | number,
  value: string | number,
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
  ratio?: number,
  optionHeight?: number,
  swipeDuration?: number,
  useMomentum?: boolean,
  onChange?: (value: (number | string) []) => unknown,
  resetChildrenPos?: boolean
}