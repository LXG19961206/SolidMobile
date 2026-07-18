export default {
  swipecell: {
    props: {
      rightActions: '右侧滑出按钮配置。',
      leftActions: '左侧滑出按钮配置。',
      threshold: '触发打开的滑动阈值 (px)，默认 30。',
      actionsWidth: '按钮区域宽度 (px)，默认自适应内容。',
      disabled: '是否禁用滑动。',
      onOpen: '打开时回调。',
      onClose: '关闭时回调。',
      children: '内容层，最常见是与 Cell 组件搭配。',
      class: '自定义 CSS class。',
      style: '内联样式。',
    },
    actionProps: {
      text: '按钮文字。',
      theme: '颜色主题：default / primary / success / warning / danger。',
      color: '自定义背景色，优先级高于 theme。',
      onClick: '点击回调。',
      class: '自定义 CSS class。',
    },
    cssVars: {
      '--sc-swipecell-bg': '单元格背景色。',
      '--sc-swipecell-action-font-size': '按钮文字大小。',
      '--sc-swipecell-action-padding': '按钮内边距。',
    },
    demo: {
      right: '右侧滑出',
      left: '左侧滑出',
      both: '双侧滑出',
      disabled: '禁用',
    },
    demoDesc: {
      right: '向左滑动显示右侧操作按钮，适合删除、收藏等操作。',
      left: '向右滑动显示左侧操作按钮，适合标记已读等快速操作。',
      both: '左右均可滑动，双侧按钮。',
      disabled: 'disabled 禁用滑动交互。',
    },
    intro: '可滑动的容器组件，左右可配置操作按钮。常用于列表项。注意：滑动交互源自 iOS 设计规范，Android 平台非最优解，建议仅在删除、收藏等高频快捷操作场景中使用。',
  },
};
