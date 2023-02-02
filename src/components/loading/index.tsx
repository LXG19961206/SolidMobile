
import { isNumber } from 'lodash'
import { Show, Switch, Match } from 'solid-js'
import Icon from '../icon'
import Overlay from '../overlay'
import { LoadingProps } from './types'
import './index.less'

const Content = (props: Partial<LoadingProps>) => {
  return (
    <>
      <span class="solidMobile-loading">
        <Icon
          color={props.color}
          name={"Loading"}
          size={isNumber(props.size) ? props.size : parseFloat(props.size!)}>
        </Icon>
        <Show when={props.vertical}> <br /> </Show>
        <Show when={props.text}>
          <span class="solidMobile-loading-text">
            {props.text}
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