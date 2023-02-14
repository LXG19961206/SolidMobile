import { useNativeEventFilter } from "../../hooks"
import { propDefaultValue } from "../../util/propDefaultValue"
import { ColProps, RowProps } from "./types"
import './index.less'
import { create, isNumber } from "lodash"
import { createEffect, createSignal } from "solid-js"

const addItemsGutter = (
  el: HTMLDivElement | void,
  gutter: number | string
  
) => {

  const count = el && el.childElementCount

  if (count) {

    const [value, unit] = gutter.toString().replace(/(\d+)?([a-zA-Z]{1,})?/, '$1,$2').split(',');

    const chunkGutter = +value / 2 + (unit || 'px')

    Array.prototype.forEach.call(el.children, (child: HTMLElement, idx) => {

      if (!idx) {

        child.style.paddingRight = chunkGutter

      } else if (el.lastChild === child) {

        child.style.paddingLeft = chunkGutter

      } else {

        child.style.paddingRight = chunkGutter
        
        child.style.paddingLeft = chunkGutter

      }

    })

  }
}

export const Row = (props: Partial<RowProps>) => {

  const [wrapper, setWrapper] = createSignal<HTMLDivElement>()

  const classList = () => ({
    "solidMobile-row": true,
    [`solidMobile-row-justify-${propDefaultValue(props.justify, 'start')}`]: true,
    [`solidMobile-row-align-${propDefaultValue(props.align, 'top')}`]: true,
    "solidMobile-row-wrap": propDefaultValue(props.wrap, true)
  })

  createEffect(() => {
    if (props.gutter && props.children) {
      addItemsGutter(wrapper() ,props.gutter)
    }
  })


  return (
    <div
      ref={setWrapper}
      { ...useNativeEventFilter(props) }
      classList={classList()}>
      { props.children }
    </div>
  )
}

export const Col = (props: Partial<ColProps>) => {
  const classList = () => ({
    "solidMobile-col": true,
    [`solidMobile-col-span-${props.span}`]: true,
    [`solidMobile-col-offset-${props.offset}`]: true
  })
  return (
    <div
      { ...useNativeEventFilter(props) }
      classList={classList()}>
        { props.children }
      </div>
  )
}