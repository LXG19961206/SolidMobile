import { StringIterator } from "lodash";
import { Accessor, JSXElement, Setter } from "solid-js";
import { EventHandleFunc, NoLimitFunc, Size } from "../../@types/common";
import { BasePropsAndAttrs } from "../common/types";


type InputVal = HTMLInputElement["value"]

type InputType = HTMLInputElement["type"]

type ValueFormatter = <T extends string = string>(val: string) => T 

type FormatterTriggers = "input" | "change" | "blur"

type InputAlignTypes = "right" | "left" | "center"


export interface InputProps extends BasePropsAndAttrs {
  bind: [Accessor<InputVal>, Setter<InputVal>],
  label: string | JSXElement,
  name: string,
  type: InputType,
  lazy: boolean,
  size: Size,
  value: InputVal,
  maxlength: number | string,
  placeholder: string,
  border: boolean,
  disabled: boolean,
  readonly: boolean,  
  colon: boolean,
  required: boolean,
  center: boolean,
  clearable: boolean,
  clearIcon: string | JSXElement,
  clickable: boolean,
  islink: boolean,
  textarea: boolean,
  autofocus: boolean,
  showWordLimit: boolean,
  showError: boolean,
  errorText: string | JSXElement,
  errorTextAlign: string,
  formatter: ValueFormatter,
  formatterTrigger: FormatterTriggers,
  labelClass: string,
  labelWidth: string,
  labelAlign: string,
  align: InputAlignTypes,
  leftIcon: string | JSXElement,
  rightIcon: string | JSXElement,
  autosize: boolean,
  onChange: EventHandleFunc,
  onInput: EventHandleFunc,
  onClose: NoLimitFunc,
  onBlur: EventHandleFunc,
  onFocus: EventHandleFunc,
  onClickLabel: NoLimitFunc,
  onClickValue: NoLimitFunc,
  onClickLeftIcon: NoLimitFunc,
  onClickRightIcon: NoLimitFunc
}