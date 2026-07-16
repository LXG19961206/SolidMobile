export default {
    demo: {
        overlayCenter: 'Overlay absolute center',
        overlayActionSheet: '动作面板',
        overlayActionSheetDesc: 'ActionSheet.',
        overlayClose: 'Close',
        overlayCloseDesc: 'Click to close.',
        overlayMode: '遮罩',
        overlayModeDesc: 'Overlay.',
        overlayProp: '遮罩',
        overlayPropDesc: 'Overlay.',
        overlayBasic: 'Basic Overlay',
        overlayBasicDesc: 'Semi-transparent overlay, click backdrop to close',
        overlayWithContent: 'Overlay + Content',
        overlayWithContentDesc: 'Place a Loading card on the overlay, common for async operations'
    },
    section: {
        overlay: '遮罩'
    },
    componentIntro: {
        OverlayIntro: '全屏半透明遮罩，所有弹出层组件的基础设施。'
    },
    demoDesc: {
        overlay_dialog: '居中对话框，点击背景关闭。',
        overlay_actionsheet: 'ActionSheet 内部使用 Overlay。'
    },
    componentProps: {
        overlay: {
            open: '控制遮罩显示/隐藏。',
            onClose: '点击背景或按 Escape 时的回调。',
            zIndex: '自定义层级。',
            lockScroll: '是否锁定 body 滚动。',
            mount: 'Portal 挂载目标。',
            duration: '进出动画时长（ms）。'
        }
    }
};
