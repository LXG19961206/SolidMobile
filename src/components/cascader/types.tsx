import { Accessor, Setter } from "solid-js";
import { BasePropsAndAttrs } from "../common/types";

export interface CascaderProps extends BasePropsAndAttrs {
  title: string,
  placeholder: string,
  textColor: string,
  textActive: string,
  source: CascaderSource [],
  closeable: boolean,
  value?: CascaderSource['value'] [],
  bind?: [
    Accessor<CascaderSource['value'] []>,
    Setter<CascaderSource['value'] []>,
  ]
}

export type CascaderSource = {
  name: string,
  value: string | number,
  class: string,
  children?: CascaderSource [],
  disabled: boolean
}