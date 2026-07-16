export default {
    demo: {
        tabsCustomColor: 'Tabs Custom Color',
        tabsCustomColorDesc: 'Tabs Custom Color Description',
        tabsDisabled: 'Tabs Disabled',
        tabsDisabledDesc: 'Tabs Disabled Description',
        tabsIconTitle: 'Tabs Icon Title',
        tabsIconTitleDesc: 'Tabs Icon Title Description',
        tabsMobileTitle: 'Tabs  (Mobile) Title',
        tabsScrollable: 'Scrollable Tabs'
    },
    componentIntro: {
        TabsIntro: 'Tab switcher. Lazy-rendered panels, JSX titles.'
    },
    nav: {
        tabs: 'Tabs'
    },
    demoDesc: {
        tabs_line: 'type=\'line\'，底部指示条跟随切换。',
        tabs_jsx: 'title supports arbitrary JSX.',
        tabs_card: 'type=\'card\'，卡片式标签栏。',
        tabs_controlled: 'External active state management; can disable options.'
    },
    componentProps: {
        tabs: {
            active: 'Current active tab (controlled).',
            defaultActive: 'Default active tab (uncontrolled).',
            onChange: 'Tab change callback.',
            type: 'Style: line / card.',
            color: 'Theme color.',
            background: 'Tab bar background color.',
            duration: 'Animation duration (seconds).',
            animated: 'Content area switch animation.',
            border: 'Show border (line mode only).',
            sticky: 'Sticky positioning.',
            lazyRender: 'Lazy render inactive tabs, default true.',
            titleActiveColor: 'Active title color.',
            titleInactiveColor: 'Inactive title color.',
            beforeChange: 'Before-change guard. Return false to prevent.',
            title: 'Tab title. String or JSX.',
            name: 'Tab identifier, matches Tabs active/defaultActive.',
            disabled: 'Whether this tab is disabled.',
            children: 'Tab panel content.',
            swipeable: 'Enable swipe gesture to switch tabs.'
        }
    }
};
