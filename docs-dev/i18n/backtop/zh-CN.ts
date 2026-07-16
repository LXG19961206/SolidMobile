export default {
    demo: {
        backtopBasic: '基础用法'
    },
    componentIntro: {
        BackTopIntro: '基于 FloatingBall 的回到顶部组件。滚动超过阈值自动出现，点击平滑回到顶部。'
    },
    nav: {
        backtop: 'BackTop 回到顶部'
    },
    demoDesc: {
        backtop_basic: '滚动超过阈值自动出现，点击平滑回到顶部。默认阈值 200px。',
        backtop_custom: '自定义内容和样式，通过 children 和 style 属性。'
    },
    componentProps: {
        backtop: {
            threshold: '滚动超过此距离（px）才显示，默认 200。',
            target: '监听滚动的元素。不传时自动向上查找最近的可滚动祖先，找不到 fallback 到 window。',
            class: '自定义 CSS class。',
            style: '内联样式。'
        }
    }
};
