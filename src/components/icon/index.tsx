import './index.less'
import { IconProps } from './types'
import { isNumber,pick } from 'lodash'
import { JSX } from 'solid-js/jsx-runtime'
import '../../assets/iconfont.js'
export default (props: IconProps) => {

  const events = pick(props, Object.keys(props).filter(key => /on[A-Za-z0-9]{1,}/.test(key)))

  return (
    <svg
      { ...events }
      style={{ 
        color: props.color, 
        "font-size": isNumber(props.size) ? `${props.size}px` : props.size,
        ...(props.style || {}) as JSX.CSSProperties        
      }} 
      class={`icon ${props.class || ''}`} aria-hidden="true">
      <use href={`#icon-${props.name}`}></use>
    </svg>
  )
}