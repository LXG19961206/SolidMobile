export default {
    demo: {
        tooltipBasic: 'Basic Hover',
        tooltipPlacement: 'Placements',
        tooltipClick: 'Click Trigger',
        tooltipCustomContent: 'JSX Content',
        tooltipDelay: 'Delay',
        tooltipControlled: 'Controlled Mode'
    },
    section: {
        tooltipBasic: 'Basic Usage',
        tooltipCSSVars: 'CSS Variables'
    },
    componentIntro: {
        TooltipIntro: 'Floating tooltip bubble that appears on hover/click/focus. Features auto-flip positioning, CSS triangle arrow, delay control, and Portal rendering to avoid z-index conflicts.'
    },
    nav: {
        tooltip: 'Tooltip'
    },
    cssVars: {
        Tooltip: {
            __sc_tooltip_bg: 'Bubble background color. Default: #1f2937.',
            __sc_tooltip_color: 'Bubble text color. Default: #fff.',
            __sc_tooltip_font_size: 'Bubble font size. Default: 0.8rem.',
            __sc_tooltip_padding: 'Bubble padding. Default: 6px 10px.',
            __sc_tooltip_radius: 'Bubble border radius. Default: 6px.',
            __sc_tooltip_max_width: 'Bubble max width. Default: 240px.',
            __sc_tooltip_arrow_size: 'Triangle arrow size. Default: 5px.',
            __sc_tooltip_z_index: 'Bubble z-index. Default: 1000.'
        }
    },
    demoDesc: {
        tooltip_basic: 'Default hover trigger. Hover the button to see the tooltip.',
        tooltip_placement: 'Supports top / bottom / left / right. Auto-flips when viewport space is insufficient.',
        tooltip_click: 'trigger="click" — click to toggle, click outside to dismiss.',
        tooltip_custom_content: 'content supports JSX with icons and rich formatting.',
        tooltip_delay: 'delay={{ show: 500, hide: 200 }} — slow to appear, fast to hide.',
        tooltip_controlled: 'trigger="manual" + open / onOpenChange — fully external control.'
    },
    componentProps: {
        tooltip: {
            content: 'Tooltip content. String or JSX.',
            placement: 'Bubble position: \'top\' | \'bottom\' | \'left\' | \'right\'. Auto-flips on overflow.',
            trigger: 'Trigger mode: \'hover\' (default) | \'click\' | \'focus\' | \'manual\'.',
            open: 'Controlled open state.',
            defaultOpen: 'Default open state (uncontrolled).',
            onOpenChange: 'Callback when open state changes.',
            showArrow: 'Whether to show the triangle arrow.',
            delay: 'Show/hide delay in ms. Number or { show, hide } object.',
            arrowSize: 'Arrow size in px. Defaults to 5.',
            offset: 'Distance from trigger element in px, excluding arrow.',
            maxWidth: 'Bubble max-width. Defaults to --sc-tooltip-max-width (240px). Increase for long text.',
            closeable: 'Show a close button (✕) in the bubble. Recommended for mobile click scenarios.',
            teleport: 'Portal mount target. Defaults to document.body.',
            zIndex: 'Bubble z-index.',
            class: 'Custom CSS class for the bubble.',
            style: 'Inline style for the bubble.'
        }
    }
};
