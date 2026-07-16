export default {
    demo: {
        notifyTypes: 'Notification Types',
        notifyTypesDesc: 'primary / success / warning / danger (slide from top)',
        notifyCustomDesc: 'color / background custom appearance'
    },
    nav: {
        notify: 'Notify'
    },
    demoDesc: {
        notify_primary: 'Primary notification.',
        notify_success: 'Success notification.',
        notify_warning: 'Warning notification.',
        notify_danger: 'Danger notification.',
        notify_manual: 'Manual close with duration: 0.'
    },
    componentProps: {
        notify: {
            type: 'Type: primary / success / warning / danger.',
            message: 'Display text. Supports line breaks.',
            duration: 'Display duration (ms). 0 = no auto-dismiss.',
            position: 'Position: top / bottom.',
            color: 'Text color.',
            background: 'Background color.',
            lockScroll: 'Lock background scroll.',
            onClick: 'Click callback.',
            onClose: 'Close callback.'
        }
    }
};
