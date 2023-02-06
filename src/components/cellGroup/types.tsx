import { JSXElement } from "solid-js";
import { BasePropsAndAttrs } from "../common/types";

export interface CellGroupProps extends BasePropsAndAttrs {
  isCard?: boolean,
  children: JSXElement
}