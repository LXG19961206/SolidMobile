import { BasePropsAndAttrs } from "../common/types";

export interface Cascader extends BasePropsAndAttrs {
  title: string,
  placeholder: string,
  textColor: string,
  textActive: string,
  source: CascaderSource [],
  closeable: boolean,
  value: CascaderSource['value'] []
}

export type CascaderSource = {
  name: string,
  value: string | number,
  class: string,
  children?: CascaderSource [],
  disabled: boolean
}