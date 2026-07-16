export default {
    demo: {
        badgeDot: 'Badge',
        badgeDotDesc: 'Badge & dot.',
        badgeStandalone: 'Standalone',
        badgeStandaloneDesc: 'Standalone.'
    },
    componentIntro: {
        BadgeIntro: '用于消息数量、状态提示的小型徽标，通常附着在图标、按钮、标签页等组件上。'
    },
    demoDesc: {
        badge_with_avatar: '最常见场景——头像角标表示未读消息。',
        badge_with_button: '按钮角标提示待处理数量。',
        badge_with_tab: 'Tab 徽标提示各分类下的数量。',
        badge_standalone: '不包裹子元素时原地渲染，适合列表项右侧的状态标记。'
    },
    componentProps: {
        badge: {
            content: '徽标内容。数字超出 max 时显示 max+。',
            dot: '仅显示小红点。',
            max: '数字上限，如 99。',
            position: '位置：top-right / top-left / bottom-right / bottom-left。',
            color: '自定义背景色。'
        }
    }
};
