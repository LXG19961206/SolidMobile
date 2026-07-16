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
        CascaderIntro: '多层级联选择，通过树形数据源逐级展开，支持无限层级。顶部 Tab 显示选中路径，可点击回退。'
    },
    demoDesc: {
        cascader_basic: '三级联动选择，选中叶子节点自动关闭。点击顶部 Tab 可回退到已选层级。',
        cascader_disabled: '设置 disabled: true 可禁用特定选项，点击无反应。',
        cascader_async: 'options 初始为空，每级由 onLoadChildren 按需拉取。模拟 2s 网络延迟。'
    },
    componentProps: {
        cascader: {
            options: '级联数据源，见 CascaderOption。',
            value: '当前选中值。',
            onChange: '值变化回调。',
            title: '标题。',
            placeholder: '未选中的占位文字。',
            closeable: '是否显示关闭按钮。',
            show: '受控显示。',
            onUpdateShow: '关闭回调。',
            onClose: '关闭回调。',
            maxHeight: '弹窗固定高度。',
            showCheckmark: '是否在选中项右侧显示对勾，默认 true。',
            checkmark: '自定义选中图标。',
            teleport: '挂载目标。',
            zIndex: 'z-index。'
        }
    }
};
