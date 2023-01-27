import { JSXElement } from "solid-js";
import { NoLimitFunc, Position, Size } from "../../@types/common";

export interface CellOptions {
  title: string | JSXElement,
  value: string | JSXElement,
  detail: string | JSXElement,
  size: Size,
  icon: string,
  isLink: boolean,
  alignCenter: boolean,
  arrowDirection: Position,
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

export interface CellGroupOptions {
  isCard?: boolean,
  children: JSXElement
}