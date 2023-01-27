import { JSXElement, Show } from 'solid-js'
import { isFunction } from 'lodash'

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