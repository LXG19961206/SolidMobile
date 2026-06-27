
import { isNumber } from 'lodash'
import { Show, Switch, Match } from 'solid-js'
import Icon from '../icon'
import Overlay from '../overlay'
import { LoadingProps, LoadingType } from './types'
import './index.less'
import { isString } from 'lodash'
import { propDefaultValue } from '../../util/propDefaultValue'

const Content = (props: Partial<LoadingProps>) => {
  return (
    <>
      <span class="solidMobile-loading">
        <Show
          fallback={ props.icon } 
          when={ isString(props.icon) || !props.icon }>
          <Icon
            color={props.color}
            name={ props.icon as string || ("loading-" + propDefaultValue<LoadingType>(props.type, 'point'))}
            size={isNumber(props.size) ? props.size : parseFloat(props.size!)}>
          </Icon>
        </Show>
        <Show
          fallback={ <span class="solidMobile-loading-gap"></span> } 
          when={props.vertical}> <br /> 
        </Show>

        <Show when={props.text || props.children}>
          <span
            style={{ 
              "font-size": isNumber(props.size) ? props.size + 'px' : props.size,
              color: props.textColor 
            }} 
            class="solidMobile-loading-text">
            {props.text || props.children }
          </span>
        </Show>
      </span>
    </>
  )
}


export default (props: Partial<LoadingProps>) => {
  return (
    <Switch>
      <Match when={props.overlay}>
        <Overlay show={!!props.overlay}>
          <Content {...props}></Content>
        </Overlay>
      </Match>
      <Match when={!props.overlay}>
        <Content {...props}></Content>
      </Match>
    </Switch>
  )
}