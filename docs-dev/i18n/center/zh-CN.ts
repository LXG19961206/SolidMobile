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
        CenterIntro: '解决初级开发者最常见的居中难题。默认无参数时采用 flex 两轴居中，也可以通过布尔参数自由组合五种居中策略。'
    },
    nav: {
        center: 'Center 居中'
    },
    demoDesc: {
        center_default: '不传任何参数时，默认 flex 水平 + 垂直居中。这是最常用的场景。',
        center_horizontal: '只居中水平方向。',
        center_vertical: '只居中垂直方向（父级需有高度）。',
        center_inline: '加 inline 变为 inline-flex，不换行。',
        center_text: 'text-align: center，适合行内或行内块内容。',
        center_vertical_align: 'vertical-align: middle，适合行内元素对齐。'
    },
    componentProps: {
        center: {
            flexX: 'Flexbox 水平居中 (justify-content: center)。',
            flexY: 'Flexbox 垂直居中 (align-items: center)。父级需有高度。',
            text: 'text-align: center。适合行内/行内块内容。',
            vertical: 'vertical-align: middle。适合行内元素。',
            position: 'absolute + transform 居中。父级需 position: relative。',
            inline: '行内模式（flex -> inline-flex）。',
            as: '渲染的 HTML 标签，默认 div。',
            class: '自定义 CSS class。',
            style: '内联样式。'
        }
    }
};
