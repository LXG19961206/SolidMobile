export default {
  scrollbar: {
    props: {
      width: '滚动条宽度，默认 6px。',
      color: '滑块颜色，默认浅灰 #d1d5db，暗色模式自动切换为 #475569。',
      trackColor: '轨道颜色，默认透明。',
      direction: '滚动方向：vertical（默认）/ horizontal / both。会自动给子元素设置对应的 overflow。',
      children: '内容节点。子元素会被自动注入 overflow 样式和滚动条 class，无需手动设置 overflow。',
    },
    cssVars: {
      '--sc-scrollbar-width': '滚动条宽度，默认 6px。',
      '--sc-scrollbar-color': '滑块颜色。',
      '--sc-scrollbar-track': '轨道颜色，默认 transparent。',
    },
    demo: {
      basic: '基础用法',
      color: '自定义颜色',
      width: '自定义宽度',
      list: '配合 List 虚拟列表',
    },
    demoDesc: {
      basic: '包裹任何内容，自动注入统一风格的滚动条。容器需设置显式高度。',
      color: '通过 color prop 自定义滑块颜色。',
      width: 'width={4} 设置更细的滚动条。',
      list: 'ScrollBar + List 虚拟列表，1000 条数据流畅滚动，暗色模式自适应。',
    },
    intro: '自定义滚动条容器。包裹 children，注入统一风格的滚动条样式。支持亮色/暗色自动切换，宽度和颜色可配。',
  },
};
