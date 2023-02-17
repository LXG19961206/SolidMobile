import { isArray } from 'lodash'
import './index.less'
import { PickerOptions, PickerProps } from './types'
import { createEffect, createMemo, createSignal, on } from 'solid-js'

const getColCount = (cols: PickerProps['columns']) => {
  // if get a empty list, return 0
  if (!cols.length) {
    
    return 0
    
  } else if ((cols as Array<unknown>).every(isArray)) {
    
    return cols.length

  } else {

    let depth = 1, pointer = (cols as PickerOptions [])[0]
    
    while (pointer && pointer.children) {
      depth += 1
      pointer = pointer.children[0]
    }

    return depth

  }
}



const columns = [
  {
    text: '浙江',
    value: 'Zhejiang',
    children: [
      {
        text: '杭州',
        value: 'Hangzhou',
        children: [
          { text: '西湖区', value: 'Xihu' },
          { text: '余杭区', value: 'Yuhang' },
        ],
      },
      {
        text: '温州',
        value: 'Wenzhou',
        children: [
          { text: '鹿城区', value: 'Lucheng' },
          { text: '瓯海区', value: 'Ouhai' },
        ],
      },
    ],
  },
  {
    text: '福建',
    value: 'Fujian',
    children: [
      {
        text: '福州',
        value: 'Fuzhou',
        children: [
          { text: '鼓楼区', value: 'Gulou' },
          { text: '台江区', value: 'Taijiang' },
        ],
      },
      {
        text: '厦门',
        value: 'Xiamen',
        children: [
          { text: '思明区', value: 'Siming' },
          { text: '海沧区', value: 'Haicang' },
        ],
      },
    ],
  },
];

export default (props: PickerProps) => {

  const colCount = createMemo(() => getColCount(props.columns))

  const accessors = createMemo(
    _ => new Array(colCount()).fill(0).map(() => createSignal<PickerOptions []>([]))
  )

  const idxAccessors = createMemo(
    _ => new Array(colCount()).fill(0).map(() => createSignal<number>(0))
  )

  const translateAccessors = createMemo(
    _ => new Array(colCount()).fill(0).map(() => createSignal<number>(0))
  )

  const durationAccessors = createMemo(
    _ => new Array(colCount()).fill(0).map(() => createSignal<number>(0))
  )

  const allCols = createMemo(_ => accessors().map(([getter]) => getter()))

  const allCurrentIdxs = createMemo(_ => idxAccessors().map(([getter]) => getter()))

  const allTranslate = createMemo(_ => translateAccessors().map(([getter]) => getter()))

  const allDuration = createMemo(_ => durationAccessors().map(([getter]) => getter()))

  const [targetIdx, setTargetIdx] = createSignal(0)


  const isTree = () => !isArray(props.columns[0])

  createEffect(on(colCount, () => {

    let currentDepth = 0, isFlat = !isTree(), target = props.columns

    while (currentDepth < colCount()) {

      const [_getter, setter] = accessors()[currentDepth]

      const [idxGetter, _idxSetter] = idxAccessors()[currentDepth]

      if (isFlat) {

        setter((props.columns as PickerOptions [][])[currentDepth])

      } else {

        setter(target as PickerOptions [])

        if (currentDepth + 1 <= colCount()) {

          target = (target as PickerOptions [])[idxGetter()].children!

        }

      }

      ++currentDepth

    }

    console.log(
      allCols(), allCurrentIdxs()
    )

  }))


  return (
    <div></div>
  )

}