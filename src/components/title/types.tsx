import { JSXElement } from "solid-js";
import { NoLimitFunc } from "../../@types/common";
import { BasePropsAndAttrs } from "../common/types";

export interface TitleProps extends BasePropsAndAttrs {
  color: string,
  background: string,
  title: string | JSXElement,
  leftTextOrIcon: string | JSXElement,
  rightTextOrIcon: string | JSXElement,
  backArrow: boolean,
  border: boolean | string,
  fixed: boolean,
  placeholder: boolean,
  zIndex: number,
  backAction: NoLimitFunc,
  leftAreaAction: NoLimitFunc,
  rightAreaAction: NoLimitFunc
}