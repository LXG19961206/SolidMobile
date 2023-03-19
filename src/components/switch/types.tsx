import { Accessor, JSXElement, Setter } from "solid-js";

export interface SwitchProps<T> {
  bind: [Accessor<T>, Setter<T>],
  disabled?: boolean,
  loading?: boolean,
  size?: string | number,
  activeColor?: string,
  buttonContent?: JSXElement,
  inactiveColor?: string,
  activedValue?: T,
  inactivedValue?: T,
  toggleOnClick?: boolean,
  onChange?: (current: boolean) => unknown,
  onClick?: (current: boolean) => unknown
}