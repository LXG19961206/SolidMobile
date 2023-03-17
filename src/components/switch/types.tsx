import { Accessor, JSXElement, Setter } from "solid-js";
import { BasePropsAndAttrs } from "../common/types";

export interface SwitchProps {
  bind: [Accessor<boolean>, Setter<boolean>],
  disabled?: boolean,
  loading?: boolean,
  size?: string | number,
  activeColor?: string,
  inactiveColor?: string,
  toggleOnClick?: boolean,
  onChange?: (current: boolean) => unknown,
  onClick?: (current: boolean) => unknown
}