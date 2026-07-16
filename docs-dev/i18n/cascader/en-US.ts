export default {
    demo: {
        cascaderAsync: 'Async',
        cascaderAsyncDesc: 'Async load.',
        cascaderDisabled: 'Disabled',
        cascaderDisabledDesc: 'Disabled options.',
        cascaderRegion: 'Region',
        cascaderRegionDesc: 'Region select.',
        cascaderRegionMobileDesc: 'Three-level cascade: province → district → street. Click top tabs to go back.',
        cascaderDisabledMobileDesc: 'Options with disabled: true cannot be clicked.',
        cascaderAsyncMobileDesc: 'Options start empty, each level loaded on demand via onLoadChildren.'
    },
    componentIntro: {
        CascaderIntro: 'Multi-level cascade selector with tree data. Unlimited depth supported.'
    },
    nav: {
        cascader: 'Cascader'
    },
    demoDesc: {
        cascader_basic: 'Three-level cascade. Auto-closes on leaf. Click tabs to go back.',
        cascader_disabled: 'Set disabled: true to disable options.',
        cascader_async: 'Empty options initially; each level loaded via onLoadChildren. Simulates 2s latency.'
    },
    componentProps: {
        cascader: {
            options: 'Cascade data source, see CascaderOption.',
            value: 'Currently selected value.',
            onChange: 'Value change callback.',
            title: 'Title.',
            placeholder: 'Placeholder when no selection.',
            closeable: 'Show close button.',
            show: 'Controlled visibility.',
            onUpdateShow: 'Close callback.',
            onClose: 'Close callback.',
            maxHeight: 'Fixed popup height.',
            showCheckmark: 'Show checkmark on selected, default true.',
            checkmark: 'Custom check icon.',
            teleport: 'Mount target.',
            zIndex: 'z-index.'
        }
    }
};
