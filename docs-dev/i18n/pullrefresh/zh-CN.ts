export default {
    demo: {
        pullRefreshCount: 'Pull Refresh Count',
        pullRefreshLoadingText: 'Pull Refresh Loading Text',
        pullRefreshLoosingText: 'Pull Refresh Loosing Text',
        pullRefreshPull: 'Pull Refresh Pull',
        pullRefreshPullingText: 'Pull Refresh Pulling Text',
        pullRefreshSuccessText: 'Pull Refresh Success Text'
    },
    componentIntro: {
        PullRefreshIntro: '包裹内容区域，支持下拉手势触发刷新，带阻尼反馈、加载状态和成功提示。'
    },
    nav: {
        pullrefresh: 'PullRefresh 下拉刷新'
    },
    demoDesc: {
        pullrefresh_custom_text: '自定义各状态文案。',
        pullrefresh_with_list: 'List 内置 pullRefresh 属性，开启后自动集成下拉刷新。'
    },
    componentProps: {
        pullrefresh: {
            loading: '受控加载状态。',
            onRefresh: '刷新回调。返回 Promise 时自动等待完成后关闭。',
            pullDistance: '触发刷新的下拉距离 (px)。',
            headHeight: '顶部刷新提示区高度 (px)。',
            successDuration: '加载成功后展示成功状态时长 (ms)。',
            animationDuration: '回弹动画时长 (ms)。',
            disabled: '禁用下拉刷新。',
            pullingText: '下拉文案。',
            loosingText: '释放文案。',
            loadingText: '加载文案。',
            successText: '成功文案。'
        }
    }
};
