import { JSXElement } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { NoLimitFunc } from "../../@types/common";


export interface BasePropsAndAttrs {
  style?: string | JSX.CSSProperties,
  id?: string,
  class?: string,
  children?: JSXElement | string,
  [event: `on${string}`]: NoLimitFunc
}