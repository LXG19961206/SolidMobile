import { create, isNil, range } from 'lodash'
import { createMemo, createSignal, mergeProps, For, createEffect, on } from 'solid-js'
import { CascaderSource, CascaderProps } from './types'
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

  const props = mergeProps(preProps)

  const colAccessors = createMemo(
    () => range(getColCount(props.source)).map(() => createSignal<CascaderSource[]>([]))
  )

  const idxAccessors = createMemo(
    () => range(getColCount(props.source)).map(() => createSignal<number>(0))
  )

  const [currentVal, valSetter] = props.bind || createSignal([])

  const [targetIdx, setTargetIdx] = createSignal(0)

  const allCols = createMemo(() => colAccessors().map(([getter]) => getter()))

  const colCount = createMemo(() => allCols().length)

  const allCurrentIdxs = createMemo(() => idxAccessors().map(([getter]) => getter()))

  createEffect(

    on([allCurrentIdxs, () => props.source], () => {

      let currentDepth = 0, target = props.source

      while (currentDepth < allCols().length) {

        const [_getter, setter] = colAccessors()[currentDepth]

        const [idxGetter, _] = idxAccessors()[currentDepth]

        setter(target as CascaderSource [])
          
        if (currentDepth + 1 <= colCount() && target[idxGetter()]?.children) {

          target = (target as CascaderSource [])[idxGetter()].children!

          ++currentDepth

        } else {

          break

        }


      }

    }))

  const change = (targetIdx: number, idx: number) => {
    idxAccessors()[targetIdx][1](idx)
    setTargetIdx(targetIdx + 1)
  }

  return (
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
                  <div 
                    onClick={ () => change(idx(), i()) }
                    class="solid-mobile-cascader-unit-item"> {isNil(item.name) ? item.text : item.name}
                  </div>
                )}
              </For>
            </div>
          )
        }
      </For>
    </div>
  )




}