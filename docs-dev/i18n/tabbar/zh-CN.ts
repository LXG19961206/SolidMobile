export default {
    demo: {
        tabbarBasic: '基础',
        tabbarBasicDesc: 'Basic tab bar.',
        tabbarAnimatedIcon: 'Tabbar Animated Icon',
        tabbarAnimatedIconDesc: 'Tabbar Animated Icon Description',
        tabbarAnimatedIconNote: 'Tabbar Animated Icon Note'
    },
    componentIntro: {
        TabBarIntro: '移动端底部标签导航栏，支持图标+文字、徽标红点、自定义颜色。一般配合页面容器使用。'
    },
    demoDesc: {
        tabbar_badge: 'Badge + dot 展示未读消息数。',
        tabbar_animated_icon: 'icon 属性接受任意 JSX，TabBarItem 自动注入 active 布尔 prop，组件据此切换选中态样式。适合 Lottie / Rive / CSS animation 等方案。',
        tabbar_fixed: '默认 fixed=true，固定在模拟器底部并占位，模拟真实 App 底部导航体验。'
    },
    componentProps: {
        tabbar: {
            value: '当前选中标签（受控）。',
            defaultValue: '默认选中（非受控）。',
            onChange: '切换回调。',
            fixed: '是否固定在底部，默认 true。',
            border: '是否显示外边框。',
            zIndex: '元素 z-index。',
            height: '标签栏高度，占位高度同步变化。',
            activeColor: '选中标签颜色。',
            inactiveColor: '未选中标签颜色。',
            safeArea: '底部安全区域占位。',
            bgColor: '自定义背景色，支持渐变、半透明毛玻璃。',
            placeholder: 'fixed 时生成等高占位，防止页面内容被遮挡。',
            beforeChange: '切换前回调，返回 false 阻止。'
        }
    }
};
