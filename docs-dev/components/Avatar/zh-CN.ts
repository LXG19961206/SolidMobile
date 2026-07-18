export default {
  avatar: {
    props: {
      src: '头像图片地址。',
      alt: '替代文本（无障碍）。',
      size: '尺寸，预设 xs(24) / sm(32) / md(40) / lg(48) / xl(64) 或自定义 px。',
      round: '完全圆形（默认开启，与 square 互斥）。',
      square: '方形。传数字控制圆角大小。',
      icon: '无 src 或加载失败时显示的图标名称。',
      text: '无 src 且无 icon 时的文字（取首字符）。',
      color: '自定义背景色。',
      class: '自定义 CSS class。',
      style: '内联样式。',
    },
    demo: {
      image: '图片头像',
      icon: '图标头像',
      text: '文字头像',
      shape: '形状与尺寸',
      custom: '自定义颜色',
    },
    demoDesc: {
      image: 'src 传入图片地址，支持预设尺寸 xs ~ xl。',
      icon: '无 src 时显示 Icon 图标作为头像。',
      text: '无 src 和 icon 时取 text 首字符作为头像。',
      shape: 'round 圆形 / square 方形，尺寸从 xs 到 xl。',
      custom: 'color 控制背景色，可配合 icon / text 使用。',
    },
    intro: '用户头像组件。图片 → 图标 → 文字首字符三级降级策略。',
  },
};
