export default {
  layout: {
    props: {
      rowGap: '列间距，数字自动补 px。',
      rowAlign: '垂直对齐：start / center / end / stretch / baseline。',
      rowJustify: '水平分布：start / center / end / between / around / evenly。',
      rowWrap: '是否换行。',
      colSpan: '栅格占位 1-24，不设则自动填充。',
      colOffset: '左偏移 1-24。',
      class: '自定义 CSS class。',
      style: '内联样式。',
    },
    cssVars: {},
    demo: {
      grid: '基础栅格',
      offset: '偏移',
      align: '对齐与间距',
    },
    demoDesc: {
      grid: 'Col span 取值 1-24，等分栅格；总和超出 24 自动换行。',
      offset: 'Col offset 设置左偏移，同样基于 24 栅格。',
      align: 'Row 的 justify 控制水平分布，gap 控制列间距。',
    },
    intro: '基于 flex 的 24 栏栅格系统。Row 为容器，Col 为子项，span 控制占宽、offset 控制偏移。',
  },
};
