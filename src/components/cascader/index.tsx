import { create, isNil, range } from 'lodash'
import { createMemo, createSignal, mergeProps, For, createEffect, on, Show } from 'solid-js'
import { CascaderSource, CascaderProps } from './types'
import ActionSheet from '../actionSheet'
import Icon from '../icon'
import './index.less'
import { useBanZoom } from '../../hooks'

const getColCount = (cols: CascaderSource[]) => {

  let depth = 1, pointer = cols[0]

  while (pointer && pointer.children) {
    depth += 1
    pointer = pointer.children[0]
  }

  return depth

}

export default (preProps: CascaderProps) => {

  useBanZoom()

  const [show, setShowState] = createSignal(true)

  const props = mergeProps(preProps)

  const colAccessors = createMemo(
    () => range(getColCount(props.source)).map(() => createSignal<CascaderSource[]>([]))
  )

  const idxAccessors = createMemo(
    () => range(getColCount(props.source)).map(() => createSignal<number>(-1))
  )

  const allCols = createMemo(() => colAccessors().map(([getter]) => getter()))

  const [currentVal, valSetter] = props.bind || createSignal([])

  const [targetIdx, setTargetIdx] = createSignal(0)

  const colCount = createMemo(() => allCols().length)

  const allCurrentIdxs = createMemo(() => idxAccessors().map(([getter]) => getter()))

  const currentNames = createMemo(
    () => allCols().map((col, idx) => col[allCurrentIdxs()[idx]]?.text || "")
  )

  createEffect(

    on([allCurrentIdxs, () => props.source], () => {

      let currentDepth = 0, target = props.source

      while (currentDepth < allCols().length) {

        const [_getter, setter] = colAccessors()[currentDepth]

        const [idxGetter, _] = idxAccessors()[currentDepth]

        setter(target as CascaderSource[])

        if (currentDepth + 1 <= colCount() && target[idxGetter()]?.children) {

          target = (target as CascaderSource[])[idxGetter()].children!

          ++currentDepth

        } else {

          break

        }
      }

    }))

  const change = (targetIdx: number, idx: number) => {

    idxAccessors()[targetIdx][1](idx)

    if (targetIdx + 1 < colCount()) setTargetIdx(targetIdx + 1)

    const { value } = allCols()[targetIdx][idx]

    valSetter([
      ...currentVal().slice(0, targetIdx),
      value,
      ...currentVal().slice(targetIdx + 1)
    ])
  }

  const clickTab = (targetIdx: number) => {
    setTargetIdx(targetIdx)
    props.onClickTab?.call(void 0, targetIdx)
  }


  currentVal && createEffect(on(currentVal, (
    newVal, oldVal
  ) => {

    if (!oldVal?.length) return

    const changeIdx = newVal.findIndex((item, idx) => idx + 1 > oldVal.length || !Object.is(item, oldVal[idx]))
    
    if (changeIdx > -1) {
      
      idxAccessors().forEach(([_, setter], idx) => idx > changeIdx && setter(-1))

      valSetter(currentVal().map((preVal, idx) => idx > changeIdx ? '' : preVal))

    }

  }))

  createEffect(
    on(currentVal, newVal => props.onChange?.call(void 0, newVal))
  )

 
  return (
    <ActionSheet
      round
      onClose={props.onClose}
      closeable={props.closeable}
      lockScroll={false}
      title={props.title}
      bind={[show, setShowState]}
      overlay>
      <div class="solid-mobile-cascader-tab">
        <For each={currentNames()}>
          {
            (value, idx) => (
              <Show
                when={(!isNil(value) && targetIdx() >= idx()) || !isNil(currentVal()[idx()])}>
                <div
                  onclick={() => clickTab(idx())}
                  classList={{
                    "solid-mobile-cascader-tab-item-nil": !value,
                    "solid-mobile-cascader-tab-item": true,
                    "actived": targetIdx() === idx()
                  }}>
                  {value || '请选择'}
                  <span
                    style={{ background: props.color }} 
                    class="solid-mobile-cascader-tab-item-active-line"></span>
                </div>
              </Show>
            )
          }
        </For>
      </div>
      <div
        style={{ transform: `translateX(${-targetIdx() * 100}%)` }}
        class="solid-mobile-cascader">
        <For each={allCols()}>
          {
            (col, idx) => (
              <div
                style={{ left: idx() * 100 + '%' }}
                class="solid-mobile-cascader-unit">
                <Show when={props.top}>
                  { props.top?.call(void 0, idx(), allCols()[idx()]) }
                </Show>
                <For each={col}>
                  {(item, i) => (
                    <Show when={targetIdx() === idx()}>
                      <div
                        style={{ color: allCurrentIdxs()[idx()] === i() ? props.color : ''}}
                        onClick={() => change(idx(), i())}
                        classList={{
                          "solidMobild_activable": true,
                          "solid-mobile-cascader-unit-item": true,
                          "solid-mobile-cascader-unit-item-actived": allCurrentIdxs()[idx()] === i(),
                        }}> {isNil(item.name) ? item.text : item.name}
                        <Show when={allCurrentIdxs()[idx()] === i()}>
                          <Icon name="tick"></Icon>
                        </Show>
                      </div>
                    </Show>
                  )}
                </For>
                <Show when={props.bottom}>
                  { props.bottom?.call(void 0, idx(), allCols()[idx()]) }
                </Show>
              </div>
            )
          }
        </For>
      </div>
    </ActionSheet>

  )




}