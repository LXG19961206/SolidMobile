import { JSXElement, createSignal } from "solid-js";
import { BasePropsAndAttrs } from "../common/types";

export interface OverLayProps extends BasePropsAndAttrs {
  show: boolean,
  zIndex: number,
  disableScroll: boolean,
  content: JSXElement
}