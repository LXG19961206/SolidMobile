import { isNil, isString } from "lodash";
import { mergeProps, on, createMemo, createSignal } from "solid-js";
import { SwitchProps } from "./types";
import "./index.less"

export default function <V = boolean>(preProps: SwitchProps<V>) {

  const props = mergeProps(preProps, {
    size: (isString(preProps.size) || isNil(preProps.size) ? preProps.size : `${preProps.size}px`) as string,
    toggleOnClick: isNil(preProps.toggleOnClick) ? true : preProps.toggleOnClick
  })

  const contradiction = createMemo<V []>(
    () => !isNil(props.activedValue) && !isNil(props.inactivedValue) 
      ? [props.activedValue, props.inactivedValue] as V []
      : [true, false] as V []
  )

  const toggle = (val: V): V => {
    return val === contradiction()[0] ? contradiction()[1] : contradiction()[0]
  }

  const [isChecked, setCheckedStatus] = (
    createSignal(props.bind[0]() === contradiction()[0])
  )

  const classList = () => ({
    "solidMobile-switch-wrapper-actived": isChecked(),
    "solidMobile-switch-wrapper-disabled": props.disabled,
  })

  const click = () => {

    if (props.disabled) return

    if (props.toggleOnClick) {

      setCheckedStatus(!isChecked())

      const [getter, setter] = props.bind

      setter(toggle.bind(void 0, getter()))

    }

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
          { props.buttonContent }
      </div>
    </div>
  )

}