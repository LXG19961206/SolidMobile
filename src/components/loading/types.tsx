import { JSXElement } from "solid-js";
import { BasePropsAndAttrs } from "../common/types";

export type LoadingType = "point" | "spinner" | "circular" | "special"

export interface LoadingProps extends BasePropsAndAttrs {
  color: string,
  size: string | number,
  type: LoadingType,
  vertical: boolean,
  text: string | JSXElement,
  textColor: string,
  overlay: boolean,
  icon: JSXElement | string
}