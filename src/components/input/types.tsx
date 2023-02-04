import { StringIterator, tail } from "lodash";
import { Accessor, JSXElement, Setter } from "solid-js";
import { EventHandleFunc, NoLimitFunc, Size } from "../../@types/common";
import { BasePropsAndAttrs } from "../common/types";


type InputVal = HTMLInputElement["value"]

type InputType = 'tel' | 'url' | 'date' | 'file' | 'text' | 'time' | 'week' | 'color' | 'digit' | 'email' | 'image' | 'month' | 'radio' | 'range' | 'reset' | 'button' | 'hidden' | 'number' | 'search' | 'submit' | 'checkbox' | 'password' | 'textarea' | 'datetime-local'

type ValueFormatter = (val: string) => string

type FormatterTriggers = "input" | "change" | "blur"

type InputAlignTypes = "right" | "left" | "center"


export const InputTypeDict: Record<InputType, InputType> = {
  password: 'password',
  text: 'text',
  email: 'email',
  number: 'number',
  tel: 'tel',
  url: 'url',
  date: 'date',
  file: 'file',
  time: 'time',
  week: 'week',
  color: 'color',
  digit: 'digit',
  image: 'image',
  month: 'month',
  radio: 'radio',
  checkbox: 'checkbox',
  range: 'range',
  reset: 'reset',
  button: 'button',
  hidden: 'hidden',
  search: 'search',
  submit: 'submit',
  textarea: 'textarea',
  "datetime-local": 'datetime-local'
}

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
