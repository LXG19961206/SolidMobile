export default {
    demo: {
        tabbarAnimated: 'Animated Icon',
        tabbarBasic: 'Basic',
        tabbarBasicDesc: 'Basic tab bar.',
        tabbarAnimatedIcon: 'Tabbar Animated Icon',
        tabbarAnimatedIconDesc: 'Tabbar Animated Icon Description',
        tabbarAnimatedIconNote: 'Tabbar Animated Icon Note'
    },
    componentIntro: {
        TabBarIntro: 'Mobile bottom tab navigation. Icon+text, badge/dot.'
    },
    demoDesc: {
        tabbar_badge: 'Badge + dot for unread message count.',
        tabbar_animated_icon: 'Icon accepts any JSX. TabBarItem auto-injects active boolean prop.',
        tabbar_fixed: 'Fixed to bottom with placeholder for native app feel.'
    },
    componentProps: {
        tabbar: {
            value: 'Currently selected tab (controlled).',
            defaultValue: 'Default selected (uncontrolled).',
            onChange: 'Tab change callback.',
            fixed: 'Fixed at bottom, default true.',
            border: 'Show outer border.',
            zIndex: 'Element z-index.',
            height: 'Tab bar height. Placeholder syncs.',
            activeColor: 'Active tab color.',
            inactiveColor: 'Inactive tab color.',
            safeArea: 'Enable bottom safe area padding.',
            bgColor: 'Custom background color. Supports gradients.',
            placeholder: 'Generate equal-height placeholder when fixed.',
            beforeChange: 'Before-change guard. Return false to prevent.'
        }
    }
};
