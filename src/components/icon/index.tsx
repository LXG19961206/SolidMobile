import './index.less'
import { IconProps } from './types'
import { isNumber } from 'lodash'
import { JSX } from 'solid-js/jsx-runtime'

export default (props: IconProps) => {
  return (
    <svg
      style={{ 
        color: props.color, 
        "font-size": isNumber(props.size) ? `${props.size}px` : props.size,
        ...(props.style || {}) as JSX.CSSProperties        
      }} 
      class={`icon ${props.class}`} aria-hidden="true">
      <use href={`#icon-${props.name}`}></use>
    </svg>
  )
}