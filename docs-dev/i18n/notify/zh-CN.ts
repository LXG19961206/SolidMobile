export default {
    demo: {
        notifyTypes: 'Notification Types',
        notifyTypesDesc: 'primary / success / warning / danger (slide from top)',
        notifyCustomDesc: 'color / background custom appearance'
    },
    demoDesc: {
        notify_primary: '主要通知。',
        notify_success: '成功通知。',
        notify_warning: '警告通知。',
        notify_danger: '危险通知。',
        notify_manual: 'duration: 0 手动关闭。'
    },
    componentProps: {
        notify: {
            type: '类型：primary / success / warning / danger。',
            message: '展示文案，支持换行。',
            duration: '展示时长 (ms)，0 不消失。',
            position: '弹出位置：top / bottom。',
            color: '字体颜色。',
            background: '背景颜色。',
            lockScroll: '锁定背景滚动。',
            onClick: '点击回调。',
            onClose: '关闭回调。'
        }
    }
};
