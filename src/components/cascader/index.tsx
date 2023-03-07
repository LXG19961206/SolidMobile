import { create, range } from 'lodash'
import { createMemo, createSignal, mergeProps } from 'solid-js'
import { CascaderSource, CascaderProps } from './types'

const getColCount = (cols: CascaderSource []) => {
  
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
    () => range(getColCount(props.source)).map(() => createSignal<CascaderSource []>([]))
  )

  const idxAccessors = createMemo(
    () => range(getColCount(props.source)).map(() => createSignal<number>(-1))
  )

  const [currentVal, valSetter] = props.bind || createSignal([])



}