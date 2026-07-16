export default {
    demo: {
        tooltipBasic: '基础 Hover',
        tooltipPlacement: '多方向弹出',
        tooltipClick: 'Click 触发',
        tooltipCustomContent: 'JSX 内容',
        tooltipDelay: '延迟控制',
        tooltipControlled: '受控模式'
    },
    section: {
        tooltipBasic: '基础用法',
        tooltipCSSVars: 'CSS 变量'
    },
    componentIntro: {
        TooltipIntro: '气泡提示组件，hover/click/focus 时在触发元素旁弹出气泡。内置自动翻转定位、CSS 三角箭头、延迟控制，通过 Portal 渲染避免层级遮挡。'
    },
    nav: {
        tooltip: 'Tooltip 气泡提示'
    },
    cssVars: {
        Tooltip: {
            __sc_tooltip_bg: '气泡背景色，默认 #1f2937。',
            __sc_tooltip_color: '气泡文字颜色，默认 #fff。',
            __sc_tooltip_font_size: '气泡字号，默认 0.8rem。',
            __sc_tooltip_padding: '气泡内边距，默认 6px 10px。',
            __sc_tooltip_radius: '气泡圆角，默认 6px。',
            __sc_tooltip_max_width: '气泡最大宽度，默认 240px。',
            __sc_tooltip_arrow_size: '三角箭头大小，默认 5px。',
            __sc_tooltip_z_index: '气泡层级，默认 1000。'
        }
    },
    demoDesc: {
        tooltip_basic: '默认 hover 触发，鼠标悬停按钮即可看到气泡。',
        tooltip_placement: '支持 top / bottom / left / right 四个方向，viewport 空间不足时自动翻转。',
        tooltip_click: 'trigger="click" — 点击触发元素切换气泡，点击外部区域关闭。',
        tooltip_custom_content: 'content 支持传入 JSX，可在气泡内使用 Icon 和富文本。',
        tooltip_delay: 'delay={{ show: 500, hide: 200 }} — 出现慢、消失快，提升交互体验。',
        tooltip_controlled: 'trigger="manual" + open/onOpenChange — 完全由外部控制显示/隐藏。'
    },
    componentProps: {
        tooltip: {
            content: '气泡内容，支持字符串或 JSX。',
            placement: '弹出方向：top / bottom / left / right，空间不足时自动翻转。',
            trigger: '触发方式：hover（默认）/ click / focus / manual。manual 时完全受控。',
            open: '受控模式：是否显示气泡。',
            defaultOpen: '非受控模式默认状态。',
            onOpenChange: '显示状态变化回调。',
            showArrow: '是否显示三角箭头。',
            delay: '显示/隐藏延迟，number 或 { show, hide } 对象。',
            arrowSize: '箭头大小（px），默认 5。',
            offset: '气泡距触发元素的间距（px），不含箭头。',
            maxWidth: '气泡最大宽度，默认跟随 --sc-tooltip-max-width（240px）。长文本场景可加大。',
            closeable: '是否显示关闭按钮（✕），移动端 click 场景推荐开启。',
            teleport: 'Portal 挂载目标，默认 document.body。',
            zIndex: '气泡层级。',
            class: '气泡自定义 CSS class。',
            style: '气泡内联样式。'
        }
    }
};
