import { Accessor, JSXElement, Setter } from "solid-js";
import { BasePropsAndAttrsWithoutListeners } from "../common/types";
import { InputAlignTypes } from "../input/types";

export type FormValue = { [key: string]: string | void | number | boolean }


export interface FormProps<D extends FormValue = FormValue> extends BasePropsAndAttrsWithoutListeners {
  lazy: boolean,
  bind: [Accessor<FormValue>, Setter<FormValue>],
  value: FormValue,
  onChange: (value: D) => unknown,
  onSubmit: (value: D) => unknown,
  onSubmitNative: (evt: SubmitEvent) => unknown,
  validator: (value: D) => boolean | Promise<boolean>,
  ValidateRules: ValidateRules<keyof D, D>,
  showError: boolean,
  errorTextAlign: "left" | "right" | "center",
  validateOnChange: boolean,
  lazyValidate: boolean,
  align: InputAlignTypes,
  scrollToError: boolean,
  labelWidth: string,
  labelAlign: "top" | "left" | "center",
  scrollToErr: boolean,
  disabled: boolean,
  readonly: boolean,
  colon: boolean
}

type TipsWhenFailed = string

export type ValidateRules<
  T extends (string | number | symbol) = string,
  D extends FormValue = FormValue> = Record<T, Array<{
    validator: RegExp | ((value: string | number | boolean, formValue: D) => boolean),
    errTip?: ((val: string | number | boolean) => TipsWhenFailed) | TipsWhenFailed,
    successCallback?: (name: string, value: string | number | boolean, formValue: D) => unknown,
    failCallback?: (name: string, value: string | number | boolean, formValue: D) => unknown,
  }>>
