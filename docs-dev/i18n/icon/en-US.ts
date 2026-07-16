export default {
    demo: {
        icon: 'Icon',
        iconClickable: 'Clickable',
        iconClickableDesc: 'Clickable icon.',
        iconDesc: 'Icon prop.',
        iconDynamic: 'Dynamic',
        iconDynamicDesc: 'Dynamic.',
        iconLineFill: 'Line/Fill',
        iconLineFillDesc: 'Line vs fill.',
        iconOnly: 'Icon Only',
        iconOnlyDesc: 'Icon only.',
        iconText: 'Icon + Text',
        iconTextDesc: 'Icon with text.',
        iconTreeShake: 'Tree Shake',
        iconTreeShakeDesc: 'Tree shake.',
        iconWithButton: 'With Button',
        iconWithButtonDesc: 'With button.',
        iconBasicMobile: 'Basic Usage',
        iconBasicMobileDesc: 'Specify icon via name prop; variant toggles line/fill style',
        iconLibraryMobile: 'Icon Library (Preview)',
        iconLibraryMobileDesc: 'Click to copy JSX code. 129 icons total.',
        iconLineFillMobileDesc: 'Compare two styles of the same icon',
        iconSizeColorMobile: 'Size & Color',
        iconSizeColorMobileDesc: 'size supports numbers (px) or any CSS unit; color sets the color'
    },
    section: {
        iconButton: 'Icon Button',
        iconLibrary: 'Icon Library',
        iconRequired: 'Icon & Required'
    },
    componentIntro: {
        IconIntro: '131 curated Remix Icons in line and fill variants.'
    },
    nav: {
        icon: 'Icon'
    },
    demoDesc: {
        icon_treeshake: 'Import from solid-component/icons. Bundler tree-shakes unused icons.',
        icon_with_button: 'variant=\'line\'（默认）为线性空心风格，variant=\'fill\' 为填充实心风格。',
        icon_sizes: 'size supports numbers (px) or any CSS unit string.',
        icon_color: 'color sets icon color; inherits parent text color when not set.',
        icon_clickable: 'Set aria-label and cursor style for clickable, accessible icons.'
    },
    componentProps: {
        icon: {
            name: 'Icon name.',
            variant: 'Style variant: line / fill.',
            size: 'Size. Numbers auto-suffixed with px.',
            color: 'Icon color.',
            class: 'Custom CSS class.',
            style: 'Inline styles.',
            id: 'DOM id.',
            'aria-label': 'Accessibility label. Required for functional icons.',
            onClick: 'Click event.'
        }
    }
};
