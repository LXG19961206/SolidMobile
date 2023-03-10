import { JSXElement } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { EventHandleFunc, NoLimitFunc, ValueGetterFunc } from "../../@types/common";


export interface BasePropsAndAttrs extends BasePropsAndAttrsWithoutListeners {
  [event: `on${string}`]: EventHandleFunc | NoLimitFunc | void | (<T>(value: T) => unknown)
}

export interface BasePropsAndAttrsWithoutListeners {
  style?: string | JSX.CSSProperties,
  id?: string,
  class?: string,
  children?: JSXElement | string,
}