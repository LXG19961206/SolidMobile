import { SizeDict } from "../../dict/common";
import { CellGroupOptions, CellOptions } from "./types";
import { createRenderEffect, JSX, Show } from 'solid-js'
import './index.less'
import rightIcon from '../../assets/arrow-right.png'
import { MaybeElement } from '../common'

export default (props: Partial<CellOptions>) => {

  const classList = () => ({
    'lxgUI-cell-item': true,
    'lxgUI-cell-item-normal': !props.size || props.size === SizeDict.normal,
    'lxgUI-cell-item-mini': props.size === SizeDict.mini,
    'lxgUI-cell-item-large': props.size === SizeDict.large,
  })

  return (
    <div
      onClick={props.action}
      classList={classList()}>
      <div class="lxgUI-cell-item-top">
        <Show when={!!props.icon}>
          <img
            onClick={props.iconAction}
            class={`lxgUI-cell-item-icon`}
            src={props.icon}
          />
        </Show>
        <MaybeElement maybeJsx={props.title}>
          <span
            onClick={props.titleAction}
            class={props.titleClass || `lxgUI-cell-item-title`}>
            {props.title}
          </span>
        </MaybeElement>
        <MaybeElement maybeJsx={props.value}>
          <span
            onClick={props.valueAction}
            class={props.valueClass || `lxgUI-cell-item-value`}>
            {props.value}
            <Show when={!!props.isLink}>
              <img
                class={`lxgUI-cell-item-icon lxgUI-cell-item-icon-${props.arrowDirection}`}
                src={rightIcon}
              />
            </Show>
          </span>
        </MaybeElement>
      </div>
      <MaybeElement maybeJsx={props.detail}>
        <p onClick={props.detailAction}
          class={props.detailClass || `lxgUI-cell-item-detail`}>
          {props.detail}
        </p>
      </MaybeElement>
    </div>
  )
}

export const CellGroup = (props: CellGroupOptions) => {
  return (
    <div classList={{
      "lxgUI-cell-group": true,
      "lxgUI-cell-group-card": props.isCard }}>  
      { <> {props.children} </> }
    </div>
  )
}