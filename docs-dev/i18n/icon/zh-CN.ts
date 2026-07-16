export default {
    demo: {
        icon: '图标',
        iconDesc: 'Icon prop.',
        iconClickable: 'Clickable',
        iconClickableDesc: 'Clickable icon.',
        iconDynamic: 'Dynamic',
        iconDynamicDesc: 'Dynamic.',
        iconLineFill: 'Line/Fill',
        iconLineFillDesc: 'Line vs fill.',
        iconOnly: '仅图标',
        iconOnlyDesc: 'Icon only.',
        iconText: '图标和文字',
        iconTextDesc: 'Icon with text.',
        iconTreeShake: 'Tree Shake',
        iconTreeShakeDesc: 'Tree shake.',
        iconWithButton: 'With Button',
        iconWithButtonDesc: '配合按钮。',
        iconBasicMobile: '基础用法',
        iconBasicMobileDesc: 'Specify icon via name prop; variant toggles line/fill style',
        iconLineFillMobileDesc: 'Compare two styles of the same icon',
        iconSizeColorMobile: 'Size & Color',
        iconSizeColorMobileDesc: 'size supports numbers (px) or any CSS unit; color sets the color',
        iconLibraryMobile: 'Icon Library (Preview)',
        iconLibraryMobileDesc: 'Click to copy JSX code. 129 icons total.',
        iconClickableMobileDesc: '设置 aria-label 和 style 将图标变为可交互按钮。',
        iconColorMobileDesc: 'color 属性设置图标颜色，不设置时继承父级文字颜色（currentColor）。',
        iconSizeMobileDesc: 'size 支持数字（自动补 px）或任意 CSS 单位字符串。'
    },
    section: {
        iconRequired: 'Icon & Required',
        iconLibrary: 'Icon Library',
        iconButton: "图标 按钮"
    },
    demoDesc: {
        icon_treeshake: '从 solid-component/icons 导入单个图标组件，打包工具自动 tree-shake，只打包实际使用的图标。',
        icon_with_button: 'variant=\'line\'（默认）为线性空心风格，variant=\'fill\' 为填充实心风格。',
        icon_sizes: 'size 支持数字（自动补 px）或任意 CSS 单位字符串。',
        icon_color: 'color 属性设置图标颜色，不设置时继承父级文字颜色（currentColor）。',
        icon_clickable: '设置 aria-label 和 style 将图标变为可交互按钮，配合 cursor:pointer 提示可点击。'
    },
    componentProps: {
        icon: {
            name: '图标名称。',
            variant: '线性 / 填充风格：line / fill。',
            size: '尺寸，数字自动补 px。',
            color: '图标颜色。',
            class: '自定义 CSS class。',
            style: '内联样式。',
            id: 'DOM id。',
            'aria-label': '无障碍标签，功能性图标需设置。',
            onClick: '点击事件。'
        }
    }
};
