export default {
    demo: {
        overlayCenter: 'Overlay absolute center',
        overlayActionSheet: 'ActionSheet',
        overlayActionSheetDesc: 'ActionSheet.',
        overlayClose: 'Close',
        overlayCloseDesc: 'Click to close.',
        overlayMode: 'Overlay',
        overlayModeDesc: 'Overlay.',
        overlayProp: 'Overlay',
        overlayPropDesc: 'Overlay.',
        overlayBasic: 'Basic Overlay',
        overlayBasicDesc: 'Semi-transparent overlay, click backdrop to close',
        overlayWithContent: 'Overlay + Content',
        overlayWithContentDesc: 'Place a Loading card on the overlay, common for async operations'
    },
    section: {
        overlay: 'Overlay'
    },
    componentIntro: {
        OverlayIntro: 'Full-screen semi-transparent overlay. Foundation for popups.'
    },
    demoDesc: {
        overlay_dialog: 'Centered dialog; click backdrop to close.',
        overlay_actionsheet: 'ActionSheet uses Overlay internally.'
    },
    componentProps: {
        overlay: {
            open: 'Control overlay visibility.',
            onClose: 'Fires on background click or Escape.',
            zIndex: 'Custom z-index.',
            lockScroll: 'Lock body scroll.',
            mount: 'Portal mount target.',
            duration: 'Transition animation duration (ms).'
        }
    }
};
