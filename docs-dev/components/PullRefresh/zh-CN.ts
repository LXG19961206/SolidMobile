export default {
  pullrefresh: {
    props: {
      loading: '受控模式：是否正在加载。',
      onRefresh: '刷新回调，返回 Promise 时自动等待完成。',
      pullDistance: '触发刷新的下拉距离 (px)，默认 80。',
      headHeight: '顶部刷新提示区高度 (px)，默认 60。',
      successDuration: '成功状态展示时长 (ms)，默认 500。',
      animationDuration: '回弹动画时长 (ms)，默认 300。',
      disabled: '禁用下拉刷新。',
      pullingText: '下拉文案。',
      loosingText: '释放文案。',
      loadingText: '加载文案。',
      successText: '成功文案。',
      class: '自定义 CSS class。',
      style: '内联样式。',
    },
    cssVars: {
      '--sc-pullrefresh-duration': '回弹动画时长。',
      '--sc-pullrefresh-head': '顶部提示区高度。',
    },
    demo: {
      basic: '基础用法',
      customText: '自定义文案',
      withList: '搭配 List',
    },
    demoDesc: {
      basic: '下拉触发刷新，带阻尼反馈和加载状态。',
      customText: '通过 pullingText / loosingText / loadingText / successText 自定义各状态文案。',
      withList: 'List 内置 pullRefresh 属性，开启后自动集成下拉刷新。',
    },
    intro: '包裹内容区域，支持下拉手势触发刷新，带阻尼反馈、加载状态和成功提示。',
  },
};
