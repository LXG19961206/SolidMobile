export default {
  cell: {
    props: {
      title: '左侧标题，支持字符串或 JSX。',
      value: '右侧内容，支持字符串或 JSX。',
      description: '标题下方描述文字。',
      children: '自定义内容，设置后 title/value/description 被忽略。',
      icon: '左侧图标，支持内置图标名或 JSX。',
      size: '尺寸：sm / md / lg，默认 md。',
      required: '显示必填红色星号。',
      center: '内容垂直居中。',
      clickable: '是否可点击。设为 true 时显示右侧箭头。',
      onClick: '点击回调（仅 clickable 时生效）。',
      class: '自定义 CSS class。',
      style: '内联样式。',
    },
    groupProps: {
      title: '分组标题。',
      card: '卡片模式（圆角 + 独立背景）。',
      border: '是否显示单元格分割线，默认 true。',
      children: '子元素（Cell）。',
      class: '自定义 CSS class。',
      style: '内联样式。',
    },
    demo: {
      basic: '基础列表',
      clickable: '可点击与图标',
      form: '表单与必填',
      card: '卡片模式',
    },
    demoDesc: {
      basic: 'Cell 由 title（左）、value（右）、description（下）三部分组成。',
      clickable: 'clickable 显示右侧箭头，icon 传入图标。',
      form: 'required 显示红色星号，description 附加说明文字。',
      card: 'CellGroup 的 card 模式获得圆角背景。',
    },
    cssVars: {
      '--sc-cell-min-height': '单元格最小高度（包含 sm/md/lg 预设尺寸）。',
    },
    intro: '列表项的基础组件。Cell 展示单行信息，CellGroup 将多个 Cell 归为一组，支持标题和卡片模式。',
  },
};
