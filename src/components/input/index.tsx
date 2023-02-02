import { InputProps } from './types'
import { Show } from 'solid-js'
import { attrsForward } from '../../util/attrsForward'
import './index.less'


export default (props: Partial<InputProps>) => {

  const [getter, setter] = props.bind || []

  const intersectionOfInputAttrsAndProps = ['disabled', 'readonly', 'name', 'id', 'placeholder']

  const makeReactive = (event: Event) => {
    if (!setter) return
    const input = event.target as HTMLInputElement
    setter(input.value)
  }

  return (
    <Show
      fallback={TextArea(props)} 
      when={!props.textarea}>
        <div class="solidMobile-input-cell">
          <span class="solidMobile-input-cell-label"> { props.label }{ props.colon ? ':' : '' } </span>
          <input
            { ...attrsForward(props, intersectionOfInputAttrsAndProps) }
            class="solidMobile-input-cell-field"
            onInput={makeReactive}
            value={ getter ? getter() : props.value }
            type="text" 
          />
        </div>
    </Show>
  )
}

export const TextArea = (props: Partial<InputProps>) => {
  return <textarea {...props}></textarea>
}