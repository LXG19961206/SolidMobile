import { SizeDict } from "../../dict/common";
import { CellGroupProps, CellProps } from "./types";
import { JSX, Show } from 'solid-js'
import './index.less'
import rightIcon from '../../assets/arrow-right.png'
import { MaybeElement } from '../common'
import Icon from '../icon/index'

export default (props: Partial<CellProps>) => {

  const classList = () => ({
    'lxgUI-cell-item': true,
    'lxgUI-cell-item-normal': !props.size || props.size === SizeDict.normal,
    'lxgUI-cell-item-small': props.size === SizeDict.small,
    'lxgUI-cell-item-large': props.size === SizeDict.large
  })

  return (
    <div
      onClick={props.action}
      style={{ ...(props.style || {}) as JSX.CSSProperties }}
      classList={classList()}>
      <div class="lxgUI-cell-item-top">
        <MaybeElement maybeJsx={props.icon}>
          <Icon name={props.icon as string}></Icon>
        </MaybeElement>
        <span
          onClick={props.titleAction}
          class={props.titleClass || `lxgUI-cell-item-title`}>
          <MaybeElement maybeJsx={props.title}>
            <> {props.title} </>
          </MaybeElement>
        </span>
        <span
          onClick={props.valueAction}
          class={props.valueClass || `lxgUI-cell-item-value`}>
          <MaybeElement maybeJsx={props.value}>
            <>
              {props.value}
              <Show when={!!props.isLink}>
                <Icon
                  class={`lxgUI-cell-item-icon lxgUI-cell-item-icon-${props.arrowDirection}`}
                  name="arrowright"
                />
              </Show>
            </>
          </MaybeElement>
        </span>
      </div>
      <p
        onClick={props.detailAction}
        class={props.detailClass || `lxgUI-cell-item-detail`}>
        <MaybeElement maybeJsx={props.detail}>
          <> {props.detail} </>
        </MaybeElement>
      </p>
    </div>
  )
}

export const CellGroup = (props: CellGroupProps) => {
  return (
    <div classList={{
      "lxgUI-cell-group": true,
      "lxgUI-cell-group-card": props.isCard
    }}>
      {<> {props.children} </>}
    </div>
  )
}