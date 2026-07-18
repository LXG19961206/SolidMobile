export default {
  backtop: {
    props: {
      threshold: '滚动超过此距离（px）才显示，默认 200。',
      target: '监听滚动的元素。不传时自动向上查找最近的可滚动祖先。',
      class: '自定义 CSS class。',
      style: '内联样式。',
      children: '自定义内容，默认 ↑ 图标。',
    },
    demo: {
      basic: '基础用法',
    },
    demoDesc: {
      basic: '基于 FloatingBall 的回到顶部组件。滚动超过阈值自动出现，点击平滑回到顶部。默认阈值 200px。',
    },
    intro: '基于 FloatingBall 的回到顶部组件。滚动超过阈值自动出现，点击平滑回到顶部。',
  },
};
