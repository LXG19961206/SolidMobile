export default {
  icon: {
    props: {
      name: '图标名称。',
      variant: '风格：line（线性）/ fill（填充）。',
      size: '尺寸，数字自动补 px。',
      color: '图标颜色。',
      'aria-label': '无障碍标签，功能性图标需设置。',
      class: '自定义 CSS class。',
      style: '内联样式。',
      onClick: '点击事件。',
    },
    demo: {
      basic: '基础用法',
      size: '尺寸',
      color: '颜色',
      clickable: '可点击',
      line: '线性 / 填充',
    },
    demoDesc: {
      basic: '通过 name 属性指定图标名，variant 切换线框/填充。',
      size: 'size 支持数字（px）或 CSS 字符串。',
      color: 'color 设置颜色，不设置时继承父级文字色。',
      clickable: '设置 aria-label 和 cursor 样式变为可交互按钮。',
      line: "variant='line' 线性空心，variant='fill' 填充实心。",
    },
    library: {
      title: '图标库',
      desc: '共 129 个图标。点击复制 JSX 代码。',
      search: '搜索图标...',
      line: '线性',
      fill: '填充',
      size: '尺寸',
      copied: '已复制',
    },
    intro: '129 个精选 Remix 图标，支持线性/填充双风格。',
  },
};
