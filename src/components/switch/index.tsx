import { isNil, isString, size } from "lodash";
import { createSignal, mergeProps, on, createMemo, Show } from "solid-js";
import { SwitchProps } from "./types";
import "./index.less"

export default (preProps: SwitchProps) => {

  const props = mergeProps(preProps, {
    size: (isString(preProps.size) || isNil(preProps.size) ? preProps.size : `${preProps.size}px`) as string,
    toggleOnClick: isNil(preProps.toggleOnClick) ? true : preProps.toggleOnClick
  })

  const [isChecked, setCheckedStatus] = props.bind

  const classList = () => ({
    "solidMobile-switch-wrapper-actived": isChecked(),
    "solidMobile-switch-wrapper-disabled": props.disabled,
  })

  const click = () => {

    if (props.disabled) return

    props.toggleOnClick && setCheckedStatus(!isChecked())

    props.onClick?.call(void 0, isChecked())

  }

  createMemo(on(isChecked, current => preProps.onChange?.call(void 0, current)))

  return (
    <div 
      classList={classList()}
      onClick={click}
      style={{ 
        background: isChecked() ? props.activeColor : props.inactiveColor,
        height: props.size ? `calc(${props.size} + 4px)` : '',
        width: props.size ? `calc(${props.size} / 0.5)` : '',
      }}
      class="solidMobile-switch-wrapper">
      <div
        style={{ 
          height: props.size || '',
          width: props.size || '',
          right: (!isChecked() && props.size) ? `calc(100% - 2px - ${props.size})` : ''
        }}
        class={ `solidMobile-switch-button  ${isChecked() ? 'actived' : ''}` }>
      </div>
    </div>
  )

}