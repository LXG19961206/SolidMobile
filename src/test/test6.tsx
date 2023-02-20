import { range } from "lodash"
import Picker from "../components/picker"

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

export default () => {
  return (
    <Picker
      resetChildrenPos 
      columns={cols2}></Picker>
  )
}