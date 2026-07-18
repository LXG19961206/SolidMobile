export default {
  lazyload: {
    props: {
      active: '受控模式：外部控制是否激活。',
      placeholder: '未激活时显示的占位内容。',
      children: '激活后渲染的实际内容。',
      rootMargin: '触发边距，默认 "50px"（元素距离视口还有 50px 时就提前加载）。支持负值，如 "-100px" 表示进入视口 100px 后才触发。',
      height: '最小高度，占位期间撑住布局，避免加载后抖动。',
      threshold: '可见比例阈值（0-1），默认 0（刚露头即触发）。0.5 表示元素一半可见时才触发，1 表示完全可见才触发。',
      once: '是否只触发一次，默认 true。',
      class: '自定义 CSS class。',
      style: '内联样式。',
    },
    demo: {
      list: '列表懒加载',
      gallery: '图片画廊',
      controlled: '受控模式',
    },
    demoDesc: {
      list: '向下滚动，卡片进入视口时自动触发懒加载。',
      gallery: '网格卡片在视口内逐个加载。',
      controlled: '通过 active 属性手动控制加载。',
    },
    misc: {
      scrollDown: '⬇ 向下滚动查看',
      scrollHint: '下方内容进入视口后自动加载',
      clickToLoad: '点击加载',
      activated: '已激活',
      reset: '重置',
      loading: '加载中...',
    },
    intro: '基于 IntersectionObserver 的懒加载容器，元素进入视口时才渲染内容。支持受控模式、自定义占位和多种触发阈值。',
  },
};
