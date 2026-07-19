export default {
  card: {
    props: {
      title: '卡片标题。',
      subtitle: '次要描述文字，显示在标题下方。',
      shadow: '是否显示阴影，默认 true。',
      border: '是否显示边框，默认 true。',
      inset: '沉浸模式：去掉内边距、圆角、边框、阴影，背景变透明，占满容器。默认 false。',
      divider: '是否在标题区下方显示分割线，默认 false。',
      padding: '内边距，默认 16px。inset 模式下忽略。',
      class: '自定义 CSS class。',
      style: '内联样式。',
      children: '卡片内容。',
    },
    cssVars: {
      '--sc-card-bg': '卡片背景色，默认 #fff。',
      '--sc-card-border': '边框颜色，默认 #ebedf0。',
      '--sc-card-radius': '圆角，默认 10px。',
      '--sc-card-padding': '内边距，默认 16px。',
      '--sc-card-title': '标题颜色，默认 #1f2937。',
      '--sc-card-subtitle': '副标题颜色，默认 #6b7280。',
    },
    demo: {
      basic: '基础用法',
      noShadow: '无阴影',
      noBorder: '无边框',
      inset: '沉浸模式',
      customPadding: '自定义内边距',
    },
    demoDesc: {
      basic: '标题 + 副标题 + 内容，默认带阴影和边框。',
      noShadow: 'shadow=false 去掉投影，适合扁平风格。',
      noBorder: 'border=false 去掉边框线。',
      inset: '外层 Card 提供视觉框架，内层 Card(inset) 嵌入其中 — 透明、无边距，只负责标题和内容结构。',
      customPadding: '通过 padding 属性自定义内边距，如 "24px"。',
    },
    intro: '通用的内容容器卡片，带标题、副标题、圆角和阴影。适用于 demo 分组、设置面板、信息区块等场景。',
  },
};
