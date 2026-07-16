export default {
    demo: {
        layoutBasic: 'Grid',
        layoutBasicDesc: 'Grid.',
        layoutGapAlign: 'Gap',
        layoutGapAlignDesc: 'Gap & align.',
        layoutGrid: 'Grid',
        layoutGridDesc: 'Grid layout.',
        layoutOffset: 'Offset',
        layoutOffsetDesc: 'Offset.',
        layoutGridMobile: 'Basic Grid Col.span',
        layoutGridMobileDesc: '24-column grid system; span occupies 1-24',
        layoutOffsetMobile: 'Offset',
        layoutOffsetMobileDesc: 'Col.offset shifts right by grid columns',
        layoutAlignMobile: 'Alignment',
        layoutAlignMobileDesc: 'justify horizontal distribution / align vertical alignment'
    },
    componentIntro: {
        LayoutIntro: '基于 flex 的 24 栏栅格系统。Row 为 flex 容器，Col 为 flex 子项，通过 span 控制占宽、offset 控制偏移。'
    },
    demoDesc: {
        layout_grid: 'Col 的 span 取值 1-24，总和超出自动换行。',
        layout_offset: 'offset 设置左偏移，同样基于 24 栅格。',
        layout_gap_align: 'Row 的 gap 控制列间距，align 控制垂直对齐。'
    }
};
