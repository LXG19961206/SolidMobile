import './index.less'
import { IconProps } from './types'
import { isNumber, pick } from 'lodash'
import { JSX } from 'solid-js/jsx-runtime'
import '../../assets/iconfont.js'
import { useNativeEventFilter } from '../../hooks'
export default (props: IconProps) => {
  return (
    <span {...useNativeEventFilter(props)}>
      <svg
        style={{
          color: props.color,
          "font-size": isNumber(props.size) ? `${props.size}px` : props.size,
          ...(props.style || {}) as JSX.CSSProperties
        }}
        class={`icon ${props.class || ''}`} aria-hidden="true">
        <use href={`#icon-${props.name}`}></use>
      </svg>
    </span>
  )
}