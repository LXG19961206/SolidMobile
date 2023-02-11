import { Accessor, JSXElement, Setter } from "solid-js";
import { BasePropsAndAttrsWithoutListeners } from "../common/types";

export type FormValue = { [key: string]: string | void | number | boolean } 

export interface FormProps<D extends FormValue = FormValue> extends BasePropsAndAttrsWithoutListeners {
  lazy: boolean,
  bind: [Accessor<FormValue>, Setter<FormValue>],
  value: FormValue,
  onChange: (value: D) => unknown
}