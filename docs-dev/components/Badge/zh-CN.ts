export default {
  badge: {
    props: {
      content: '徽标内容。数字超出 max 时显示 max+。',
      dot: '仅显示小红点，忽略 content。',
      max: '数字上限，超出后显示 max+，如 99+。',
      position: '位置：top-right / top-left / bottom-right / bottom-left。',
      color: '自定义背景色。',
      class: '自定义 CSS class。',
      style: '内联样式。',
    },
    demo: {
      withAvatar: '配头像',
      withButton: '配按钮',
      withTab: '配标签页',
      position: '位置与颜色',
      standalone: '独立使用',
    },
    demoDesc: {
      withAvatar: '最常见场景——头像角标表示未读消息或状态。',
      withButton: '按钮角标提示待处理数量。',
      withTab: 'Tab 徽标提示各分类下的数量。',
      withCell: '列表项右侧的状态标记。',
      position: '支持四个角的位置，color 自定义背景色。',
      standalone: '不包裹子元素时原地渲染，适合内联文本标记。',
    },
    intro: '用于消息数量、状态提示的小型徽标，通常附着在图标、按钮、标签页等组件上。',
  },
};
