import { range } from "lodash"
import { createEffect, createMemo, createSignal, on } from "solid-js"
import Picker from "../components/picker"
import city from "./city"

import City from './city'

const cols = [
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
      {
        text: '泉州',
        value: 'Xiamen',
        children: [
          { text: '泉州村', value: 'Siming' },
          { text: '泉州屯', value: 'Haicang' },
        ],
      },
    ],
  },
]

const cols2 = [
  range(20).map(item => ({
    text: 2005 + item + '年',
    value: 2005 + item
  })),
  range(12).map(item => ({
    text: item + 1 + '月',
    value: item + 1
  })),
  range(30).map(item => ({
    text: item + 1 + '日',
    value: item + 1
  })),
]

const [val, setVal] = createSignal([0, 0, 0])



const years = createMemo(() => {
  return range(20).map(item => ({
    text: 2005 + item + '年',
    value: 2005 + item
  }))
})

const month = createMemo(() => {
  return range(12).map((item, i) => ({
    text: item + 1 + '月',
    value: item + 1,
    disabled: i < 6
  }))
})

const [col3, setCol3] = createSignal(range(30).map(item => ({
  text: item + 1 + '日',
  value: item + 1
})))

createEffect(on(val, (val, val2, val3) => {
  let fn = () => {
    if (val[1] === 2) {

      if (
        (val[0] % 4 === 0 && val[0] % 100) || val[0] % 400 === 0
      ) {
        return range(29).map(item => ({
          text: item + 1 + '日',
          value: item + 1
        }))

      } else {
        return range(28).map(item => ({
          text: item + 1 + '日',
          value: item + 1
        }))

      }

    } else if ([1, 3, 5, 7, 8, 10, 12].includes(val[1])) {
      return range(31).map(item => ({
        text: item + 1 + '日',
        value: item + 1
      }))

    } else {
      return range(30).map(item => ({
        text: item + 1 + '日',
        value: item + 1
      }))
    }
  }
  setCol3(fn())
}))

const [bindCity, setCity] = createSignal(['1230000', '130300', '130302'])

export default () => {
  return (
    <Picker
      onChange={setVal}
      placeholders="请选择"
      resetChildrenPos
      columns={city}
    ></Picker>
  )
}