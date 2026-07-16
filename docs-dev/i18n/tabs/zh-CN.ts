export default {
    demo: {
        tabsCustomColor: 'Tabs Custom Color',
        tabsCustomColorDesc: 'Tabs Custom Color Description',
        tabsDisabled: 'Tabs Disabled',
        tabsDisabledDesc: 'Tabs Disabled Description',
        tabsIconTitle: 'Tabs Icon Title',
        tabsIconTitleDesc: 'Tabs Icon Title Description',
        tabsMobileTitle: 'Tabs  (Mobile) Title',
        tabsScrollable: '横向滚动'
    },
    demoDesc: {
        tabs_line: 'type=\'line\'，底部指示条跟随切换。',
        tabs_jsx: 'title 支持传入任意 JSX。',
        tabs_card: 'type=\'card\'，卡片式标签栏。',
        tabs_controlled: '外部管理激活状态，可设置 disabled 禁用选项。'
    },
    componentProps: {
        tabs: {
            active: '当前激活的 tab（受控）。',
            defaultActive: '默认激活的 tab（非受控）。',
            onChange: '切换回调。',
            type: '样式风格：line / card。',
            color: '主题色。',
            background: '标签栏背景色。',
            duration: '动画时长（秒）。',
            animated: '内容区切换动画。',
            border: '显示外边框（仅 line）。',
            sticky: '粘性定位。',
            lazyRender: '延迟渲染未激活的 tab，默认 true。',
            titleActiveColor: '标题选中态颜色。',
            titleInactiveColor: '标题默认态颜色。',
            beforeChange: '切换前回调，返回 false 阻止切换。',
            title: 'Tab 标题，支持字符串或 JSX。',
            name: 'Tab 标识符，对应 Tabs 的 active/defaultActive。',
            disabled: '是否禁用该 Tab。',
            children: 'Tab 内容。',
            swipeable: '是否支持手势滑动切换。'
        }
    }
};
