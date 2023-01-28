import { SizeDict } from "../../dict/common";
import { CellGroupProps, CellProps } from "./types";
import { JSX, Show } from 'solid-js'
import './index.less'
import rightIcon from '../../assets/arrow-right.png'
import { MaybeElement } from '../common'
import Icon from '../icon/index'

export default (props: Partial<CellProps>) => {

  const classList = () => ({
    'solidMobile-cell-item': true,
    'solidMobile-cell-item-normal': !props.size || props.size === SizeDict.normal,
    'solidMobile-cell-item-small': props.size === SizeDict.small,
    'solidMobile-cell-item-large': props.size === SizeDict.large
  })

  return (
    <div
      onClick={props.action}
      style={{ ...(props.style || {}) as JSX.CSSProperties }}
      classList={classList()}>
      <div class="solidMobile-cell-item-top">
        <MaybeElement maybeJsx={props.icon}>
          <Icon name={props.icon as string}></Icon>
        </MaybeElement>
        <span
          onClick={props.titleAction}
          class={props.titleClass || `solidMobile-cell-item-title`}>
          <MaybeElement maybeJsx={props.title}>
            <> {props.title} </>
          </MaybeElement>
        </span>
        <span
          onClick={props.valueAction}
          class={props.valueClass || `solidMobile-cell-item-value`}>
          <MaybeElement maybeJsx={props.value}>
            <>
              {props.value}
              <Show when={!!props.isLink}>
                <Icon
                  class={`solidMobile-cell-item-icon solidMobile-cell-item-icon-${props.arrowDirection}`}
                  name="arrowright"
                />
              </Show>
            </>
          </MaybeElement>
        </span>
      </div>
      <p
        onClick={props.detailAction}
        class={props.detailClass || `solidMobile-cell-item-detail`}>
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
      "solidMobile-cell-group": true,
      "solidMobile-cell-group-card": props.isCard
    }}>
      {<> {props.children} </>}
    </div>
  )
}