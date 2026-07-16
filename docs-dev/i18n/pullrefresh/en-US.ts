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
        PullRefreshIntro: 'Pull-down-to-refresh wrapper with damping and states.'
    },
    demoDesc: {
        pullrefresh_custom_text: 'Customize status text for each state.',
        pullrefresh_with_list: 'List has built-in pullRefresh prop for integration.'
    },
    componentProps: {
        pullrefresh: {
            loading: 'Controlled loading state.',
            onRefresh: 'Refresh callback. Promise auto-closes on completion.',
            pullDistance: 'Pull distance to trigger refresh (px).',
            headHeight: 'Refresh indicator area height (px).',
            successDuration: 'Success state display duration (ms).',
            animationDuration: 'Bounce-back animation duration (ms).',
            disabled: 'Disable pull-to-refresh.',
            pullingText: 'Pulling text.',
            loosingText: 'Release text.',
            loadingText: 'Loading text.',
            successText: 'Success text.'
        }
    }
};
