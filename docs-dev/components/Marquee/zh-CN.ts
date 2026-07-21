export default {
  marquee: {
    props: {
      duration: '完整循环的秒数，默认 10s。值越小越快。',
      direction: '滚动方向：left（默认）/ right。',
      pauseOnHover: '悬停时暂停动画，默认 true。',
      gap: '内容间距。',
      class: '自定义 CSS class。',
      style: '内联样式。',
      children: '滚动内容，保持原样渲染。',
    },
    cssVars: {
      '--mq-duration': '动画时长。',
      '--mq-direction': '动画方向。',
      '--mq-gap': '内容间距。',
    },
    demo: {
      basic: '基础用法',
      speed: '速度',
      direction: '方向',
      pause: '悬停暂停',
      notify: '配合 Notify',
    },
    demoDesc: {
      basic: '默认 10s 向左循环。内容渲染两次实现无缝衔接。',
      speed: 'duration={3} 3 秒快速滚动。',
      direction: 'direction="right" 反向滚动。',
      pause: 'pauseOnHover={false} 鼠标放上去继续滚。',
      notify: '点击跑马灯文字弹出 Notify 通知（手动关闭模式），演示 Marquee 内的交互。',
    },
    intro: '跑马灯组件，水平无缝滚动容器。内容保持原样渲染，不侵入任何样式。支持速度、方向、悬停暂停控制。',
  },
};
