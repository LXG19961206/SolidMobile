import { JSXElement, Show, createEffect, children } from 'solid-js'
import { isFunction, isNumber,isString } from 'lodash'
import { BasePropsAndAttrs } from './types'

export type MaybeElementProps = {
  maybeJsx: JSXElement | string,
  children: JSXElement
}

export const MaybeElement = (props: MaybeElementProps) => {
  return (
    <>
      {
        !!props.maybeJsx && (
          <Show
            fallback={props.maybeJsx}
            when={isString(props.maybeJsx) || isNumber(props.maybeJsx)}> {props.children}
          </Show>
        )
      }
    </>
  )
}

export function WithAttrsAndListeners<T extends BasePropsAndAttrs> (props: T) {
  
}