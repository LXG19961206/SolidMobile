export default {
  tag: {
    props: {
      type: '语义色：primary / success / warning / danger / info。',
      variant: '填充方式：solid（实心）/ outline（线框）。',
      size: '尺寸：sm / md。',
      round: '胶囊圆角。',
      closeable: '是否可关闭。',
      onClose: '关闭回调。',
      color: '自定义颜色，覆盖 type。',
      class: '自定义 CSS class。',
      style: '内联样式。',
    },
    demo: {
      types: '语义色',
      variant: '填充变体',
      size: '尺寸与圆角',
      closeable: '可关闭',
      scenes: '场景示例',
    },
    demoDesc: {
      types: '五种语义色：primary / success / warning / danger / info。',
      variant: 'solid 实心填充 / outline 线框轮廓。',
      size: 'sm / md 两种尺寸，round 切换胶囊圆角。',
      closeable: '点击 ✕ 关闭标签。',
      scenes: '字典标签、标签云、可移除筛选条件等常见场景。',
    },
    intro: '用于标记和分类的小型标签，支持多种语义色和填充方式。',
  },
};
