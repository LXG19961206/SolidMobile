export default {
    demo: {
        loading: 'Loading',
        loadingDesc: 'Loading spinner.',
        loadingIconProp: 'Icon',
        loadingIconPropDesc: 'Custom icon.',
        loadingOverlay: 'Overlay',
        loadingOverlayDesc: 'Overlay.',
        loadingOverlayMode: 'Overlay',
        loadingOverlayModeDesc: 'Overlay.',
        loadingPure: 'Pure',
        loadingPureDesc: 'Animation only.',
        loadingSizeColor: 'Size & Color',
        loadingSizeColorDesc: 'Size & color.',
        loadingTypes: 'Types',
        loadingTypesDesc: 'Animation types.',
        loadingVertical: 'Vertical',
        loadingVerticalDesc: 'Vertical.',
        loadingEllipsis: 'Loading Ellipsis',
        loadingTypesMobile: 'Loading Types Mobile',
        loadingTypesMobileDesc: 'Loading Types Mobile Desc',
        loadingTextMobile: 'Loading Text Mobile',
        loadingTextMobileDesc: 'Loading Text Mobile Desc',
        loadingSizeColorMobile: 'Loading Size Color Mobile',
        loadingSizeColorMobileDesc: 'Loading Size Color Mobile Desc',
        loadingOverlayMobile: 'Loading Overlay Mobile',
        loadingOverlayMobileDesc: 'Loading Overlay Mobile Desc',
        loadingRegionData: 'Loading region data...'
    },
    componentIntro: {
        LoadingIntro: '展示加载中状态的视觉反馈。内置三种动画类型，支持自定义图标、文字、纵向布局及全屏遮罩模式。'
    },
    nav: {
        loading: 'Loading 加载'
    },
    demoDesc: {
        loading_types: '三种内置动画：spinner 经典旋转圆环、circular 弧形旋转、dots 三点弹跳。',
        loading_pure: '不传 text / children 时只显示动画，适合按钮内或行内场景。',
        loading_size_color: 'size 支持数字（px）或 CSS 字符串，color 设置动画颜色。',
        loading_vertical: '设为 true 时文字显示在动画下方，适合卡片或全屏加载场景。',
        loading_custom_icon: '传入自定义 JSX 替代内置动画。适合配合 Icon 组件实现旋转刷新等交互。',
        loading_overlay: '设为 true 时渲染全屏半透明遮罩并锁定滚动，适合阻止用户操作的等待场景。'
    },
    componentProps: {
        loading: {
            text: '加载文字。与 children 二选一，text 优先。',
            children: '子元素，text 未提供时生效。',
            type: '内置动画类型：spinner / circular / dots。',
            size: '动画尺寸，数字自动补 px。',
            color: '动画颜色。',
            textColor: '文字颜色。',
            vertical: '文字与动画是否纵向排列。',
            overlay: '是否为全屏遮罩模式。',
            icon: '自定义图标，设置后忽略 type。',
            class: '自定义 CSS class。',
            style: '内联样式。'
        }
    }
};
