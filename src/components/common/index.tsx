import { JSXElement, Show, createEffect, children } from 'solid-js'
import { isFunction } from 'lodash'
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
            fallback={props.children}
            when={isFunction(props.maybeJsx)}> {<> {props.maybeJsx} </> }
          </Show>
        )
      }
    </>
  )
}

export function WithAttrsAndListeners<T extends BasePropsAndAttrs> (props: T) {
  return (
    <>
      { props.children }
    </>
  )
}