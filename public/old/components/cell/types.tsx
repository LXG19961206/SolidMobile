import { JSXElement } from "solid-js";
import { NoLimitFunc, Position, Size } from "../../@types/common";
import { BasePropsAndAttrs } from "../common/types";

 export interface CellProps extends BasePropsAndAttrs {
  title: string | JSXElement,
  value: string | JSXElement,
  detail: string | JSXElement,
  size: Exclude<Size, 'mini'>,
  icon: JSXElement | string,
  isLink: boolean,
  alignCenter: boolean,
  arrowDirection: Exclude<Position, 'middle'>,
  titleClass: string,
  valueClass: string,
  detailClass: string,
  required: boolean,
  action: NoLimitFunc,
  titleAction: NoLimitFunc,
  valueAction: NoLimitFunc,
  detailAction: NoLimitFunc,
  iconAction: NoLimitFunc
}