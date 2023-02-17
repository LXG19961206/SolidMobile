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
      ],
    },
  ]


export default () => {
  return (
    <Picker columns={cols}></Picker>
  )
}