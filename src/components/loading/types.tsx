import { JSXElement } from "solid-js";
import { BasePropsAndAttrs } from "../common/types";

export interface LoadingProps extends BasePropsAndAttrs {
  color: string,
  size: string | number,
  vertical: boolean,
  text: string | JSXElement,
  textColor: string,
  overlay: boolean
}