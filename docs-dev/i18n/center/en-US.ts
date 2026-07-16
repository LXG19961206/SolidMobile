export default {
    demo: {
        centerDefault: 'Default',
        centerDefaultDesc: 'Default center.',
        centerFlexX: 'Flex X',
        centerFlexXDesc: 'Flex X.',
        centerFlexY: 'Flex Y',
        centerFlexYDesc: 'Flex Y.',
        centerInline: 'Inline',
        centerInlineDesc: 'Inline.',
        centerPosition: 'Position',
        centerPositionDesc: 'Position.',
        centerText: 'Text',
        centerTextDesc: 'Text center.',
        centerVertical: 'Vertical',
        centerVerticalDesc: 'Vertical.',
        centerDefaultMobile: 'Default (no props)',
        centerDefaultMobileDesc: 'With no props, flexX + flexY are both enabled by default — full horizontal and vertical centering. Note: flexY requires the parent to have an explicit height.',
        centerDefaultChip: 'Default full center',
        centerFlexXMobile: 'flexX horizontal only',
        centerFlexXMobileDesc: 'display:flex + justify-content:center. No parent height needed; container height follows content. Useful for nav titles, button groups, etc.',
        centerFlexXChip: 'Horizontal only, auto height',
        centerFlexYMobile: 'flexY vertical only',
        centerFlexYMobileDesc: 'display:flex + align-items:center + height:100%. Must be inside a parent with explicit height. Useful for vertical alignment in list items.',
        centerFlexYChip: 'Vertical center (parent 80px)',
        centerBothMobile: 'flexX + flexY full center',
        centerBothMobileDesc: 'Equivalent to the default behavior. Common in modals, empty states, loading screens.',
        centerTextMobile: 'text text-align center',
        centerTextMobileDesc: 'text-align: center. Pure CSS, no flex container created. Suitable for multi-paragraph text.',
        centeredTitle: 'Centered Title',
        centeredTitleDesc: 'Use the text prop to center this content. The inner elements remain block-level; they won\'t become flex items.',
        centerVerticalMobile: 'vertical inline align',
        centerVerticalMobileDesc: 'inline-block + vertical-align: middle. Aligns icons and text vertically within a line. Often used together with inline.',
        centerPositionMobile: 'position absolute center',
        centerPositionMobileDesc: 'Center acts as positioning container (relative + 100% width/height); inner wrapper uses absolute + transform to center. Useful for overlays, watermarks, badges that need to escape normal flow.',
        center: 'Center'
    },
    componentIntro: {
        CenterIntro: 'Simple centering utility. Flex both-axis by default.'
    },
    demoDesc: {
        center_default: 'Default both-axis flex centering. The most common use case.',
        center_horizontal: 'Center horizontally only.',
        center_vertical: 'Center vertically only (parent needs height).',
        center_inline: 'Add inline for inline-flex without wrapping.',
        center_text: 'text-align: center for inline/inline-block content.',
        center_vertical_align: 'vertical-align: middle for inline element alignment.'
    },
    componentProps: {
        center: {
            flexX: 'Flexbox horizontal center (justify-content: center).',
            flexY: 'Flexbox vertical center (align-items: center). Parent needs height.',
            text: 'text-align: center. For inline/inline-block.',
            vertical: 'vertical-align: middle. For inline elements.',
            position: 'absolute + transform center. Parent needs position: relative.',
            inline: 'Inline mode (flex -> inline-flex).',
            as: 'Rendered HTML tag, default div.',
            class: 'Custom CSS class.',
            style: 'Inline styles.'
        }
    }
};
