export default {
  toast: {
    props: {
      message: '提示消息内容，支持字符串或 JSX。',
      type: '类型：success / error / warning / loading / info，决定图标和默认样式。',
      position: '显示位置：top / middle / bottom，默认 middle。',
      duration: '自动关闭毫秒数，0 表示不自动关闭。默认 3000。',
      overlay: '是否显示半透明遮罩，默认 false。',
      closeOnClick: '点击 toast 自身是否关闭。',
      onClose: '关闭回调。',
      icon: '自定义图标，覆盖 type 默认图标。',
      zIndex: '自定义层级。',
      stack: '多个 toast 堆叠展示，默认 false（同位置替换）。',
    },
    methods: {
      show: 'Toast.show(options) — 完整配置显示 toast。',
      success: "Toast.success(msg, opts?) — 成功提示（默认 2s）。",
      error: "Toast.error(msg, opts?) — 错误提示（默认 3s + overlay）。",
      warning: "Toast.warning(msg, opts?) — 警告提示。",
      loading: "Toast.loading(msg, opts?) — 加载中（不自动关闭）。",
      info: "Toast.info(msg, opts?) — 信息提示（默认 2.5s）。",
      dismissAll: 'Toast.dismissAll() — 关闭所有 toast。',
    },
    demo: {
      types: '基础类型',
      position: '位置',
      overlay: '遮罩与多行',
      dismiss: '批量关闭',
    },
    demoDesc: {
      types: '五种内置类型：success / error / warning / loading / info。',
      position: '支持 top / middle / bottom 三个位置。',
      overlay: 'overlay 开启遮罩防止操作；消息支持换行。',
      dismiss: 'Toast.dismissAll() 一键关闭所有 toast。',
    },
    intro: '全局的轻量级反馈提示。命令式 API，无需引入组件即可调用。',
  },
};
