export default {
  sidebar: {
    props: {
      items: '选项列表：{ key: string; title: string | JSX.Element }[]。title 支持 JSX。',
      activeKey: '当前选中的 key。',
      onChange: '选中变化回调 (key: string) => void。',
      width: '侧边栏宽度，默认 90px。',
      class: '自定义 CSS class。',
      style: '内联样式。',
    },
    cssVars: {
      '--sc-color-border': '分割线颜色。',
      '--sc-color-background-secondary': '背景色。',
      '--sc-card-bg': '选中/悬停背景色。',
      '--sc-color-primary': '选中态文字色 + 左侧指示条颜色。',
      '--sc-color-text-secondary': '未选中文字色。',
    },
    demo: {
      basic: '基础用法',
    },
    demoDesc: {
      basic: '垂直分组导航，常用于弹出面板中切换多个分组内容。',
    },
    intro: '垂直分组导航组件，用于弹出面板或侧边栏中切换多个分组/表格。支持暗色模式。',
  },
};
