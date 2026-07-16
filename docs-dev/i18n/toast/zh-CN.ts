export default {
    demo: {
        toastDanger: '危险',
        toastError: '错误',
        toastInfo: '信息',
        toastLoading: '加载中',
        toastPrimary: '主要',
        toastShorthand: 'Shorthand',
        toastShorthandDesc: 'Shorthand.',
        toastSuccess: '成功',
        toastWarning: '警告',
        toastBottom: 'Toast Bottom',
        toastBottomMsg: 'Toast Bottom Msg',
        toastDismissAll: 'Toast Dismiss All',
        toastDismissAllBtn: 'Toast Dismiss All Btn',
        toastDismissAllMobileDesc: 'Toast Dismiss All  (Mobile) Description',
        toastErrorBtn: 'Toast Error Btn',
        toastErrorMsg: 'Toast Error Msg',
        toastFiveTypes: 'Toast Five Types',
        toastFiveTypesMobileDesc: 'Toast Five Types  (Mobile) Description',
        toastInfoBtn: 'Toast Info Btn',
        toastInfoMsg: 'Toast Info Msg',
        toastLoadingBtn: 'Toast Loading Btn',
        toastLoadingMsg: 'Toast Loading Msg',
        toastMiddle: 'Toast Middle',
        toastMiddleMsg: 'Toast Middle Msg',
        toastMobileTitle: 'Toast  (Mobile) Title',
        toastMsg1: 'Toast Msg1',
        toastMsg2: 'Toast Msg2',
        toastMultiline: 'Toast Multiline',
        toastMultilineMsg: 'Toast Multiline Msg',
        toastOverlayMode: 'Toast Overlay Mode',
        toastOverlayMultiline: 'Toast Overlay Multiline',
        toastOverlayMultilineMobileDesc: 'Toast Overlay Multiline  (Mobile) Description',
        toastPopMultiple: 'Toast Pop Multiple',
        toastPosition: 'Toast Position',
        toastPositionMobileDesc: 'Toast Position  (Mobile) Description',
        toastProcessingMsg: 'Toast Processing Msg',
        toastSuccessBtn: 'Toast Success Btn',
        toastSuccessMsg: 'Toast Success Msg',
        toastTop: 'Toast Top',
        toastTopMsg: 'Toast Top Msg',
        toastWarningBtn: 'Toast Warning Btn',
        toastWarningMsg: 'Toast Warning Msg'
    },
    componentIntro: {
        ToastIntro: '全局的轻量级反馈提示，命令式 API 调用。'
    },
    demoDesc: {
        toast_shorthand: '点击 Cell 弹出对应类型。',
        toast_overlay: 'Error / Loading 默认开启 overlay 防止误触。',
        toast_loading: '加载中带遮罩，阻止背景操作。'
    },
    componentProps: {
        toast: {
            message: '提示消息内容。',
            type: '类型，决定图标和默认样式：success / error / warning / loading / info。',
            position: '显示位置：top / middle / bottom。',
            duration: '自动关闭的毫秒数，0 表示不自动关闭。',
            overlay: '是否显示半透明遮罩，默认 false。',
            closeOnClick: '点击 toast 自身是否关闭。',
            onClose: '关闭时的回调。'
        }
    }
};
