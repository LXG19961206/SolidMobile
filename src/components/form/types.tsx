import { Accessor, Setter } from "solid-js";
import { NoLimitFunc, ValueGetterFunc } from "../../@types/common";
import { BasePropsAndAttrs } from "../common/types";

export type FormValue = { [key: string]: string | void | number | boolean } 


export interface FormProps<D = FormValue> extends BasePropsAndAttrs {
  lazy: boolean,
  bind: [Accessor<FormValue>, Setter<FormValue>],
  value: FormValue,
  onChange: (value: D | unknown) => unknown
}