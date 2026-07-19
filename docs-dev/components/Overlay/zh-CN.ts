export default {
  overlay: {
    props: {
      open: '控制遮罩显示/隐藏。',
      onClose: '点击背景或按 Escape 时的回调。',
      zIndex: '自定义层级，默认 999。',
      lockScroll: '是否锁定 body 滚动，默认 true。',
      mount: 'Portal 挂载目标。',
      duration: '过渡动画时长（ms），默认 200。',
      class: '自定义 CSS class。',
      style: '内联样式。',
    },
    demo: {
      basic: '基础遮罩',
      content: '遮罩 + 内容',
      scroll: '允许滚动穿透',
    },
    demoDesc: {
      basic: '点击遮罩背景或按 Escape 关闭。',
      content: '在遮罩上展示 Loading 提交状态，2 秒后自动关闭。',
      scroll: 'lockScroll={false} 背景仍可滚动，适合 Toast 等轻量场景。',
    },
    intro: '全屏半透明遮罩层。所有弹出层组件（Dialog、ActionSheet、Popup 等）的基础设施。',
  },
};
