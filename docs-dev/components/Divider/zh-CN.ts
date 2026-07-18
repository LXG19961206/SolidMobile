export default {
  divider: {
    props: {
      direction: '方向：horizontal（水平）/ vertical（垂直）。',
      text: '中间文字（仅水平模式生效）。',
      dashed: '虚线样式。',
      color: '线条颜色。',
      size: '线条粗细，数字自动补 px。',
      class: '自定义 CSS class。',
      style: '内联样式。',
    },
    demo: {
      horizontal: '基础分割线',
      text: '带文字',
      dashed: '虚线',
      color: '自定义颜色与粗细',
      vertical: '垂直分割',
    },
    demoDesc: {
      horizontal: '默认水平分割线，将上下内容分隔开。',
      text: '通过 text 属性在分割线中间插入文字。',
      dashed: 'dashed 切换为虚线样式。',
      color: 'color 控制线条色，size 控制粗细。',
      vertical: "direction='vertical' 在行内作为垂直分隔符。",
    },
    cssVars: {
      '--sc-divider-color': '线条颜色。与 color 属性等价，CSS 覆盖时优先级低于 color 属性。',
      '--sc-divider-size': '线条粗细。与 size 属性等价，CSS 覆盖时优先级低于 size 属性。',
      '--sc-divider-text-color': '中间文字颜色。',
    },
    intro: '将内容分组的视觉分隔线，支持水平/垂直方向、文字和虚线样式。',
  },
};
