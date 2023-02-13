import { useNativeEventFilter } from "../../hooks"
import { propDefaultValue } from "../../util/propDefaultValue"
import { ColProps, RowProps } from "./types"
import './index.less'

export const Row = (props: Partial<RowProps>) => {

  const classList = () => ({
    "solidMobile-row": true,
    [`solidMobile-row-justify-${propDefaultValue(props.justify, 'start')}`]: true,
    [`solidMobile-row-align-${propDefaultValue(props.align, 'top')}`]: true,
    "solidMobile-row-wrap": propDefaultValue(props.wrap, true)
  })

  return (
    <div
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