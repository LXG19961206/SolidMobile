export default {
  empty: {
    props: {
      description: '描述文字。',
      image: '图片：预设类型（default / network / search）或自定义 JSX。',
      children: '自定义底部内容（如操作按钮）。',
      class: '自定义 CSS class。',
      style: '内联样式。',
    },
    demo: {
      preset: '预设类型',
      custom: '自定义内容',
    },
    demoDesc: {
      preset: '三种预设：default（通用空状态）、network（网络异常）、search（无搜索结果）。',
      custom: '自定义 JSX 图片 + 底部按钮，用于业务特定场景。',
    },
    intro: '数据为空时的占位提示。内置三种预设图片，支持自定义 JSX 和底部操作。',
  },
};
