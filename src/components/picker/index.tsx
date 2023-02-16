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

  const [cols, setCols] = createSignal<Array<PickerOptions []>>()

  const isTree = () => !isArray(props.columns[0])

  createEffect(on(colCount, () => {

    let currentDepth = 1, target = props.columns

    const tempCols = []

    while (currentDepth < colCount()) {

      if (isTree()) {

        tempCols.push(target as PickerOptions [])

      } else {

      }

    }


  }))

}