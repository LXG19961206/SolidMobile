export default {
  button: {
  props: {
    type: '按钮语义色：primary / secondary / success / warning / danger / info。',
    variant: '按钮填充方式：solid（实心）、outline（线框）、ghost（透明）。',
    size: '按钮尺寸：xs / sm / md / lg。',
    block: '通栏按钮，宽度撑满父容器。',
    round: '胶囊形状，使用 full 圆角值。',
    disabled: '禁用状态，不可点击。',
    loading: '加载中状态，显示旋转动画并禁用交互。',
    icon: '图标，支持 Icon 名称字符串或 JSX 元素。',
    iconPosition: '图标相对文字的位置：left / right。',
    color: '自定义背景色，优先级高于 variant。',
    onClick: '点击事件回调。禁用或加载中时不触发。',
  },
  cssVars: {
    '--sc-color-primary': '主色背景（primary 类型）。',
    '--sc-color-primary-hover': '主色悬停态。',
    '--sc-color-primary-active': '主色按下态。',
    '--sc-border-radius-sm': '小按钮圆角（xs/sm）。',
    '--sc-border-radius-md': '中按钮圆角（md）。',
    '--sc-border-radius-lg': '大按钮圆角（lg）。',
    '--sc-border-radius-full': '胶囊圆角（round 模式）。',
  },
  demo: {
    types: '按钮类型',
    sizes: '按钮尺寸',
    variant: '按钮变体',
  },
  demoDesc: {
    button_types: '六种 type：primary / secondary / success / warning / danger / info',
    button_sizes: '四档尺寸：xs (28px) / sm (32px) / md (40px) / lg (48px)',
    button_variants: 'solid / outline / ghost 三种填充方式。',
  },
  intro: '通用的操作触发按钮。支持多种变体风格、四种尺寸、图标、加载态、链接模式及自定义颜色。',
  },
};
