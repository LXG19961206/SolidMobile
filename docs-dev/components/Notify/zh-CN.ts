export default {
  notify: {
    props: {
      message: '通知文本，支持换行。',
      type: '类型：primary / success / warning / danger。',
      position: '位置：top / bottom，默认 top。',
      duration: '显示时长 (ms)，0 不自动关闭，默认 3000。',
      color: '文字颜色。',
      background: '背景色。',
      lockScroll: '锁定背景滚动。',
      onClick: '点击回调。',
      onClose: '关闭回调。',
      className: '自定义 CSS class。',
      zIndex: '自定义层级。',
    },
    methods: {
      primary: 'Notify.primary(msg, opts?) — 主要通知。',
      success: 'Notify.success(msg, opts?) — 成功通知（默认 2s）。',
      warning: 'Notify.warning(msg, opts?) — 警告通知。',
      danger: 'Notify.danger(msg, opts?) — 危险通知。',
      show: 'Notify.show(options) — 完整配置。',
      dismissAll: 'Notify.dismissAll() — 关闭所有。',
    },
    demo: {
      types: '通知类型',
      position: '位置',
      custom: '自定义样式',
    },
    demoDesc: {
      types: 'primary / success / warning / danger 四种类型。',
      position: '支持顶部和底部两个位置。',
      custom: '通过 color / background 自定义外观。',
    },
    intro: '顶部通知栏组件。命令式 API，用于页面级全局通知反馈。',
  },
};
