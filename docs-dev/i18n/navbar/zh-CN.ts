export default {
    componentIntro: {
        NavBarIntro: '顶部导航条，提供左中右三区域布局，支持返回箭头、固定定位和占位元素。'
    },
    nav: {
        navbar: 'NavBar 导航栏'
    },
    demoDesc: {
        navbar_fixed: 'fixed + placeholder。手机模拟器的 transform 会创建新的定位上下文，fixed 自动局限在手机屏幕内。',
        navbar_basic: '最简单的导航栏，只有标题。',
        navbar_back: '设置 backArrow 显示返回图标，onBack 处理点击。',
        navbar_right: 'right 可传入按钮、图标或任意 JSX。',
        navbar_custom: 'left 和 right 同时自定义，适合复杂操作栏。'
    },
    componentProps: {
        navbar: {
            title: '标题。',
            left: '左侧自定义内容。',
            right: '右侧自定义内容。',
            backArrow: '是否显示返回箭头。',
            onBack: '返回箭头点击回调。',
            onLeftClick: '左侧区域点击回调。',
            onRightClick: '右侧区域点击回调。',
            fixed: '是否固定在顶部。',
            placeholder: '固定时生成占位元素，避免内容被遮挡。',
            border: '是否显示底部边框。',
            zIndex: 'z-index。',
            background: '背景色。',
            color: '文字颜色。',
            height: '导航栏高度。'
        }
    }
};
