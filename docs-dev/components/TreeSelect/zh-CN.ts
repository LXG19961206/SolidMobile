export default {
  treeselect: {
    props: {
      options: '树形数据。',
      value: '已选叶子节点值数组。',
      defaultValue: '默认选中值。',
      onChange: '选中值变化回调。',
      max: '最大可选数量，0 = 不限制。',
      placeholder: '未选时的占位文字。',
      title: '弹窗标题。',
      disabled: '禁用组件。',
      onLoadChildren: '异步加载子节点。',
      class: '自定义 CSS class。',
      style: '内联样式。',
    },
    cssVars: {
      triggerPadding: '触发器内边距。',
      triggerHeight: '触发器最小高度。',
      zIndex: '弹窗层级。',
      bg: '弹窗内容背景。',
      itemPadding: '列表项内边距。',
    },
    demo: {
      basic: '基础用法',
      maxLimit: '最大选择数',
      asyncLoad: '异步加载',
    },
    demoDesc: {
      basic: '两级树形多选，父节点自动统计子节点选中数量。',
      maxLimit: '限制最多选择 3 项。',
      asyncLoad: '展开时动态加载子节点。',
    },
    intro: 'Push 式多选树组件。逐层导航，勾选叶子节点，父级自动显示已选计数。',
  },
};