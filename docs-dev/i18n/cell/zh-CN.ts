export default {
    demo: {
        cellBasic: 'Basic',
        cellBasicDesc: 'Basic cell.',
        cellClickable: 'Clickable',
        cellClickableDesc: 'Clickable.',
        cellIconRequired: 'Icon',
        cellIconRequiredDesc: 'Icon & required.',
        cellBasicTitle: 'Basic Cell',
        cellBasicMobileDesc: 'title label + value on right'
    },
    componentIntro: {
        CellIntro: '列表项的基础组件。Cell 展示单行信息，CellGroup 将多个 Cell 归为一组，支持标题、卡片模式。'
    },
    nav: {
        cell: 'Cell 单元格'
    },
    common: {
        cellProps: 'Cell 属性',
        cellGroupProps: 'CellGroup Props'
    },
    demoDesc: {
        cell_basic: 'Cell 由 title（左）、value（右）、description（下）三部分组成。',
        cell_clickable: '设置 clickable 后右侧显示箭头，整行可点击。配合 onClick 处理跳转。',
        cell_icon_required: 'icon / title / value 均支持字符串或 JSX。required 显示红色星号。',
        cell_sizes: '三种尺寸，默认 md（48px）。',
        cell_card: 'CellGroup 设置 card 获得圆角和独立背景，适合在灰色背景页面上使用。'
    },
    componentProps: {
        cell: {
            title: '左侧标题。',
            value: '右侧内容。',
            description: '标题下方描述。',
            children: '自定义内容，设置后 title/value/description 被忽略。',
            icon: '左侧图标，支持字符串或 JSX。',
            size: '尺寸：xs / sm / md / lg。',
            required: '是否显示必填红色星号。',
            center: '内容垂直居中。',
            clickable: '是否可点击，设为 true 时显示右侧箭头。',
            onClick: '点击回调（仅 clickable 时生效）。',
            class: '自定义 CSS class。',
            style: '内联样式。'
        }
    }
};
