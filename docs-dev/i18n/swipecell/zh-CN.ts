export default {
    demo: {
        swipeCellWrap: 'Wrap',
        swipeCellWrapDesc: 'Wrap Cell.',
        swipeCellRight: 'Swipe Cell Right',
        swipeCellRightDesc: 'Swipe Cell Right Desc',
        swipeCellLeft: 'Swipe Cell Left',
        swipeCellLeftDesc: 'Swipe Cell Left Desc',
        swipeCellMulti: 'Swipe Cell Multi',
        swipeCellMultiDesc: 'Swipe Cell Multi Desc',
        swipeCellDisabled: 'Swipe Cell Disabled',
        swipeCellDisabledDesc: 'Swipe Cell Disabled Desc'
    },
    componentProps: {
        swipecell: {
            rightActions: '右侧滑出按钮。',
            leftActions: '左侧滑出按钮。',
            threshold: '触发打开的滑动阈值 (px)。',
            actionsWidth: '按钮区域宽度 (px)。',
            disabled: '是否禁用。',
            onOpen: '打开时回调。',
            onClose: '关闭时回调。',
            children: '内容层，最常用 Cell。',
            class: '自定义类名。',
            style: '内联样式。'
        }
    }
};
