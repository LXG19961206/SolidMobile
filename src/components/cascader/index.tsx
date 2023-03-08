import { create, isNil, range } from 'lodash'
import { createMemo, createSignal, mergeProps, For, createEffect, on, Show } from 'solid-js'
import { CascaderSource, CascaderProps } from './types'
import ActionSheet from '../actionSheet'
import Icon from '../icon'
import './index.less'

const getColCount = (cols: CascaderSource[]) => {

  let depth = 1, pointer = cols[0]

  while (pointer && pointer.children) {
    depth += 1
    pointer = pointer.children[0]
  }

  return depth

}

export default (preProps: CascaderProps) => {

  const [show, setShowState] = createSignal(true)

  const props = mergeProps(preProps)

  const colAccessors = createMemo(
    () => range(getColCount(props.source)).map(() => createSignal<CascaderSource[]>([]))
  )

  const idxAccessors = createMemo(
    () => range(getColCount(props.source)).map(() => createSignal<number>(0))
  )

  const allCols = createMemo(() => colAccessors().map(([getter]) => getter()))

  const [currentVal, valSetter] = props.bind || createSignal([])

  const [currentNames, nameSetter] = createSignal<(string | void)[]>(range(allCols().length).map(() => void 0))

  const [targetIdx, setTargetIdx] = createSignal(0)


  const colCount = createMemo(() => allCols().length)

  const allCurrentIdxs = createMemo(() => idxAccessors().map(([getter]) => getter()))

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

    const { value, text } = allCols()[targetIdx][idx]

    valSetter([
      ...currentVal().slice(0, targetIdx),
      value,
      ...currentVal().slice(targetIdx + 1)
    ])

    nameSetter([
      ...currentNames().slice(0, targetIdx),
      text || '',
      ...currentNames().slice(targetIdx + 1)
    ])

  }

  return (
    <ActionSheet
      round
      bind={[show, setShowState]}
      overlay>
      <div class="solid-mobile-cascader-tab">
        <For each={currentNames()}>
          {
            (value, idx) => (
              <Show
                when={!isNil(value) || targetIdx() === idx()}>
                <div
                  onclick={() => setTargetIdx(idx())}
                  classList={{
                    "solid-mobile-cascader-tab-item": true,
                    "actived": targetIdx() === idx()
                  }}>
                  {value || '请选择'}
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
                <For each={col}>
                  {(item, i) => (
                    <Show when={targetIdx() === idx()}>
                      <div
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
              </div>
            )
          }
        </For>
      </div>
    </ActionSheet>

  )




}