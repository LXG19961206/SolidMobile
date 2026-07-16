export default {
    demo: {
        buttonAddToCart: 'Button Add To Cart',
        buttonBuyNow: 'Button Buy Now',
        buttonCapsule: 'Button Capsule',
        buttonClickSubmit: 'Button Click Submit',
        buttonEdit: 'Button Edit',
        buttonFavorite: 'Button Favorite',
        buttonIconMobileDesc: 'Button Icon  (Mobile) Description',
        buttonLoadingDisabled: 'Button Loading Disabled',
        buttonLoadingDisabledMobileDesc: 'Button Loading Disabled  (Mobile) Description',
        buttonMobileTitle: 'Button  (Mobile) Title',
        buttonNext: 'Button Next',
        buttonRoundBlock: 'Button Round Block',
        buttonRoundBlockMobileDesc: 'Button Round Block  (Mobile) Description',
        buttonSearch: 'Button Search',
        buttonSemanticTypeMobileDesc: 'Button Semantic Type  (Mobile) Description',
        buttonSettings: 'Button Settings',
        buttonSizeMobileDesc: 'Button Size  (Mobile) Description',
        buttonSubmitting: 'Button Submitting',
        buttonVariantMobileDesc: 'Button Variant  (Mobile) Description'
    },
    componentIntro: {
        ButtonIntro: '通用的操作触发按钮。支持多种变体风格、四种尺寸、图标、加载态、链接模式及自定义颜色。'
    },
    nav: {
        button: 'Button 按钮'
    },
    cssVars: {
        Button: {
            __sc_border_radius_full: '胶囊圆角（round 模式）。',
            __sc_border_radius_lg: '大圆角（size=lg）。',
            __sc_border_radius_md: '中圆角（size=md）。',
            __sc_border_radius_sm: '小圆角（size=sm）。',
            __sc_color_primary: '主色背景（primary 类型）。',
            __sc_color_primary_active: '主色按下态。',
            __sc_color_primary_hover: '主色悬停态。',
            __sc_color_primary_pale: '主色浅色背景（ghost/outline 悬停）。',
            __sc_color_text_inverse: '按钮文字颜色。'
        }
    },
    demoDesc: {
        button_sizes: '四档尺寸：xs (28px) / sm (32px) / md (40px) / lg (48px)',
        button_variants: 'solid（实心）、outline（线框）、ghost（透明）三种填充方式，与 type 正交组合。',
        button_round: '完全圆角，适合标签或筛选按钮。',
        button_icon_only: '纯图标按钮必须设置 aria-label 以保证无障碍访问。',
        button_link: '设置 href 后自动渲染为 <a> 标签，支持 target 控制打开方式。',
        button_color: '直接覆盖背景色，文字色自动计算对比度。也可手动指定 textColor。',
        button_form_actions: 'Primary 主操作 + Outline 取消，右对齐。',
        button_mobile_actions: 'block + round + size=lg，适合移动端底部固定区域。',
        button_danger: 'danger 变体用于删除类操作，搭配 outline 取消。',
        button_types: '六种 type：primary / secondary / success / warning / danger / info',
        button_icon_text: '通过 icon 和 iconPosition 控制。icon 支持字符串（内置图标名）或 JSX。默认图标在左。',
        button_submit: 'nativeType="submit" 配合 form 标签使用。'
    },
    componentProps: {
        button: {
            text: '按钮文字。与 children 二选一，text 优先。',
            children: '按钮子元素。text 未提供时生效。',
            type: '按钮语义色：primary / secondary / success / warning / danger / info。',
            variant: '按钮填充方式。solid 实心，outline 线框，ghost 透明。',
            size: '按钮尺寸：xs / sm / md / lg。',
            block: '通栏按钮，宽度撑满父容器。',
            round: '胶囊形状，使用 full 圆角值。',
            hairline: '0.5px 细线边框（实验性）。',
            color: '自定义背景色，优先级高于 variant。',
            textColor: '自定义文字颜色。',
            icon: '图标元素。支持传入任意 JSX。',
            iconPosition: '图标相对文字的位置：left / right。',
            disabled: '禁用状态，不可点击。',
            loading: '加载中状态，显示旋转动画并禁用交互。',
            loadingText: '加载中显示的文字，不设置则保留原文字。',
            nativeType: 'HTML button type 属性：button / submit / reset。',
            href: '链接地址。设置后按钮渲染为 a 标签。',
            target: '链接打开方式，仅在 href 存在时生效。',
            onClick: '点击事件回调。禁用或加载中时不触发。',
            class: '自定义 CSS class。',
            style: '内联样式。',
            'aria-label': '无障碍标签，纯图标按钮必须设置。'
        }
    },
    component: {
        button: {
            title: 'Button 按钮',
            intro: '通用按钮组件，支持多种类型、变体和尺寸。',
            type: '按钮类型',
            variant: '按钮变体',
            size: '按钮尺寸',
            primary: '主要按钮',
            danger: '危险按钮',
            default: '默认按钮',
            text: '文字按钮',
            dashed: '虚线按钮',
            block: '块级按钮',
            loading: '加载状态',
            disabled: '禁用状态',
            icon: '图标按钮'
        }
    }
};
