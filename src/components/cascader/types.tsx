import { Accessor, JSXElement, Setter } from "solid-js";
import { BasePropsAndAttrs } from "../common/types";

export interface CascaderProps {
  title?: string | JSXElement,
  placeholder?: string,
  color?: string,
  onChange?: (value: (number | string) []) => unknown,
  onClose?: () => unknown,
  onClickTab?: (idx: number) => unknown
  textColor?: string,
  textActive?: string,
  source: CascaderSource [],
  closeable?: boolean,
  top?: (idx: number, souce: CascaderSource []) => JSXElement,
  bottom?: (idx: number, source: CascaderSource []) => JSXElement,
  value?: CascaderSource['value'] [],
  bind?: [
    Accessor<CascaderSource['value'] []>,
    Setter<CascaderSource['value'] []>,
  ]
}

export type CascaderSource = {
  name?: string,
  text?: string,
  value: string | number,
  className?: string,
  children?: CascaderSource [],
  disabled?: boolean
}