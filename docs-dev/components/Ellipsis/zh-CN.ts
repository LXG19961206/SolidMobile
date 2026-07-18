export default {
  ellipsis: {
    props: {
      lines: '显示行数，超出后打省略号，默认 1。',
      expandable: '是否可展开/收起，开启后仅在内容溢出时显示按钮。',
      expanded: '受控模式：当前是否展开。',
      defaultExpanded: '非受控模式：默认是否展开。',
      onExpandChange: '展开状态变化回调。',
      showAction: '是否显示展开/收起按钮，默认 true。',
      expandElement: '展开按钮内容，支持 JSX。',
      collapseElement: '收起按钮内容，支持 JSX。',
      as: '渲染的 HTML 标签，默认 div。',
      class: '自定义 CSS class。',
      style: '内联样式。',
    },
    cssVars: {
      '--sc-ellipsis-action-color': '展开/收起按钮文字颜色。',
      '--sc-ellipsis-action-hover-opacity': '按钮 hover 态透明度。',
      '--sc-ellipsis-action-gap': '按钮内图标与文字间距。',
      '--sc-ellipsis-action-padding': '按钮左侧内边距。',
    },
    demo: {
      basic: '单行省略',
      multi: '多行省略',
      expand: '可展开',
      custom: '自定义按钮',
      controlled: '受控模式',
    },
    demoDesc: {
      basic: '默认单行省略，超出显示省略号。',
      multi: 'lines 控制行数，超出后在第 N 行末尾打省略号。',
      expand: 'expandable 开启后内容溢出时自动显示展开按钮。',
      custom: '通过 expandElement / collapseElement 自定义按钮内容。',
      controlled: '通过 expanded + onExpandChange 外部控制展开状态。',
    },
    intro: '文字省略组件，处理文字超出隐藏。支持单行/多行省略和展开/收起，内置 ResizeObserver 自适应容器尺寸变化。',
  },
};
