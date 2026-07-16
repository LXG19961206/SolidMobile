export default {
    demo: {
        examples: '示例',
        listExample: 'Example',
        listExampleDesc: 'Example.',
        listLazy: 'List Lazy Load',
        listLazyDesc: 'Lazy load.',
        listLazyLoadDesc: 'List Lazy Load Desc',
        listStaticMobile: 'List Static Mobile',
        listStaticMobileDesc: 'List Static Mobile Desc',
        listOnLoadMobile: 'List On Load Mobile',
        listOnLoadMobileDesc: 'List On Load Mobile Desc',
        listVirtualMobile: 'List Virtual Mobile',
        listVirtualMobileDesc: 'List Virtual Mobile Desc',
        listEmptyMobile: 'List Empty Mobile',
        listEmptyMobileDesc: 'List Empty Mobile Desc'
    },
    section: {
        listLazy: 'List Lazy Load'
    },
    demoDesc: {
        list_example: '切换 Tab 查看不同模式。每个 Tab 独立管理数据源，互不干扰。'
    },
    componentProps: {
        list: {
            data: '受控模式：外部管理的数据源。',
            onLoad: '非受控模式：触底时调用，返回值追加到列表。',
            finished: '是否已加载完成。',
            children: '渲染每一项的模板函数。',
            empty: '空数据占位。',
            loadMoreText: '加载中底部提示。',
            finishedText: '全部加载完成底部提示。',
            offset: '距底部多少 px 触发 onLoad。',
            virtual: '开启虚拟列表。',
            itemHeight: '虚拟列表模式下每项的固定高度 (px)。',
            pullRefresh: '开启下拉刷新，配合 onRefresh。',
            onRefresh: '下拉刷新回调。'
        }
    }
};
