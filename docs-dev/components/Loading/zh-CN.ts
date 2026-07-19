export default {
  loading: {
    props: {
      text: '加载文字。与 children 二选一。',
      children: '子元素，text 未提供时生效。',
      type: '内置动画类型：spinner / circular / dots，默认 spinner。',
      size: '动画尺寸，数字自动补 px。',
      color: '动画颜色。',
      textColor: '文字颜色。',
      vertical: '文字与动画纵向排列，默认 false。',
      overlay: '全屏遮罩模式。',
      mount: 'Overlay Portal 挂载目标。',
      icon: '自定义图标，设置后忽略 type。',
      class: '自定义 CSS class。',
      style: '内联样式。',
    },
    demo: {
      types: '动画类型',
      text: '文字与排列',
      sizeColor: '尺寸与颜色',
      overlay: '遮罩模式',
    },
    demoDesc: {
      types: '三种内置动画：spinner（旋转圆环）、circular（弧形旋转）、dots（三点弹跳）。',
      text: 'text 显示加载文字，vertical 纵向排列。',
      sizeColor: 'size 控制尺寸，color 控制动画颜色。',
      overlay: 'overlay 全屏遮罩 + 滚动锁定，常用于表单提交等场景。',
    },
    jsxDemo: 'JSX 内嵌',
    jsxDesc: 'JSX 使得 Loading 可以内嵌到 Button、Card、ListItem 等任意组件中。',
    intro: '展示加载中状态的视觉反馈。内置三种动画类型，支持自定义图标、文字、纵向布局及全屏遮罩模式。',
  },
};
