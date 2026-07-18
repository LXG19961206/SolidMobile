export default {
  floatingball: {
    props: {
      inset: '初始位置，距视口边缘的距离。支持 left / top / right / bottom，默认 { right: 16, bottom: 24 }。',
      draggable: '是否可拖动，默认 true。',
      snapToEdge: '松手时自动吸附到最近边缘，默认 true。',
      zIndex: '层级，默认 999。',
      class: '自定义 CSS class。',
      style: '内联样式。',
      children: '球内内容（图标、文字等）。',
    },
    cssVars: {
      '--sc-floating-ball-size': '悬浮球尺寸。',
      '--sc-floating-ball-bg': '背景色，默认跟随主题主色。',
      '--sc-floating-ball-color': '内容颜色。',
      '--sc-floating-ball-shadow': '阴影。',
      '--sc-floating-ball-radius': '圆角，默认 50%。',
      '--sc-floating-ball-z-index': '层级。',
    },
    demo: {
      basic: '基础用法',
      custom: '自定义样式',
      fixed: '不可拖动',
    },
    demoDesc: {
      basic: '固定在右下角，可拖动，松手吸附到最近边缘。',
      custom: '通过 CSS 变量自定义尺寸、圆角、渐变色背景和阴影。',
      fixed: 'draggable={false} 固定位置，不可拖动。',
    },
    intro: '固定定位的悬浮球组件。支持拖动、松手自动吸附到最近边缘。常用于回到顶部、快速操作、页面导航等移动端场景。',
  },
};
