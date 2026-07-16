export default {
    demo: {
        listExample: 'Example',
        listExampleDesc: 'Example.',
        listLazy: 'List Lazy Load',
        listLazyDesc: 'Lazy load.',
        listEmptyMobile: 'List Empty Mobile',
        listEmptyMobileDesc: 'List Empty Mobile Desc',
        listLazyLoadDesc: 'List Lazy Load Desc',
        listOnLoadMobile: 'List On Load Mobile',
        listOnLoadMobileDesc: 'List On Load Mobile Desc',
        listStaticMobile: 'List Static Mobile',
        listStaticMobileDesc: 'List Static Mobile Desc',
        listVirtualMobile: 'List Virtual Mobile',
        listVirtualMobileDesc: 'List Virtual Mobile Desc'
    },
    section: {
        listLazy: 'List Lazy Load'
    },
    componentIntro: {
        ListIntro: 'Scroll-loading list. Controlled/uncontrolled, virtual, pull-to-refresh.'
    },
    nav: {
        list: 'List'
    },
    demoDesc: {
        list_example: 'Switch tabs for different modes. Each tab manages its own data.'
    },
    componentProps: {
        list: {
            data: 'Controlled mode: externally managed data source.',
            onLoad: 'Uncontrolled mode: called on scroll-end. Return value appends.',
            finished: 'Whether all data loaded.',
            children: 'Render function for each item.',
            empty: 'Empty state placeholder.',
            loadMoreText: 'Bottom loading prompt.',
            finishedText: 'Bottom finished prompt.',
            offset: 'Distance from bottom (px) to trigger onLoad.',
            virtual: 'Enable virtual list.',
            itemHeight: 'Fixed item height (px) for virtual list.',
            pullRefresh: 'Enable pull-to-refresh, use with onRefresh.',
            onRefresh: 'Pull-to-refresh callback.'
        }
    }
};
