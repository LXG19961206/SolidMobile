import './index.less'
import { TitleProps } from './types'
import { JSX, Show } from 'solid-js'
import { isString } from 'lodash'
import Icon from '../icon'

export default (props: Partial<TitleProps>) => {

  const classList = () => ({
    "solidMobile-titleBar-fixed": !!props.fixed,
    "solidMobile-titleBar-content": true,
    "solidMobile-titleBar-content-border": !!props.border,
  })

  return (
    <div class={"solidMobile-titleBar"}>
      <div
        style={{
          ...props.style as JSX.CSSProperties,
          "z-index": props.zIndex,
          color: props.color,
          background: props.background,
          "border-color": isString(props.border) ? props.border : ''
        }}
        classList={classList()}>
        <p class="solidMobile-titleBar-content-left">
          <Show when={props.backArrow}>
            <Icon
              onClick={props.backAction!} 
              name="arrow-left"></Icon>
          </Show>
          <Show when={props.leftTextOrIcon}>
            <span class="text" onClick={props.leftAreaAction}>
              {props.leftTextOrIcon}
            </span>
          </Show>
        </p>
        <p class="solidMobile-titleBar-content-title">
          {props.title}
        </p>
        <p class="solidMobile-titleBar-content-right">
          <Show when={props.rightTextOrIcon}>
            <span class="text" onClick={props.rightAreaAction}>
              {props.rightTextOrIcon}
            </span>
          </Show>
        </p>
      </div>
      <Show when={props.placeholder && props.fixed}>
        {/* If show, ensure placeholder has the same height with the titlebar */}
        <div
          style={{ height: (props.style as JSX.CSSProperties)?.height }}
          class="solidMobile-titleBar-placeholder">
        </div>
      </Show>
    </div>
  )
}