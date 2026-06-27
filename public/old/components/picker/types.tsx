import { Accessor, JSXElement, Setter } from "solid-js"
import { BasePropsAndAttrs } from "../common/types"

export type PickerOptions = {
  text: string | number,
  value: string | number,
  children?: PickerOptions [],
  disabled?: boolean,
  className?: string
}

export interface PickerProps {
  bind?: [Accessor<(number|string) []>, Setter<(number | string )[]> ],
  columns?: PickerOptions [] | Array<PickerOptions []>,
  title?: string | JSXElement,
  confirmText?: string | JSXElement,
  cancelText?: string | JSXElement,
  visibleItemCount?: number,
  ratio?: number,
  optionHeight?: number,
  swipeDuration?: number,
  useMomentum?: boolean,
  onChange?: (current: PickerOptions [],value: (number | string) []) => unknown,
  onConfirm?: (current: PickerOptions [],value: (number | string) []) => unknown,
  onCancel?: (current: PickerOptions [],value: (number | string) []) => unknown,
  resetChildrenPos?: boolean,
  overlay?: boolean,
  placeholders?: string | string []
}