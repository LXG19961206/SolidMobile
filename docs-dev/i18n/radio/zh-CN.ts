export default {
    demo: {
        radioCustomIcon: '自定义图标',
        radioCustomIconDesc: 'Custom icon.',
        radioDisabledShape: 'Radio Disabled Shape',
        radioDisabledShapeDesc: 'Radio Disabled Shape Description',
        radioHorizontalColor: 'Radio Horizontal Color',
        radioHorizontalColorDesc: 'Radio Horizontal Color Description',
        radioStandaloneForm: 'Radio Standalone Form',
        radioStandaloneFormDesc: 'Radio Standalone Form Description'
    },
    componentIntro: {
        RadioIntro: '单选组件，配合 RadioGroup 使用。支持多种形状、自定义图标和颜色。'
    },
    cssVars: {
        Radio: {
            __sc_radio_border_color: '边框颜色。',
            __sc_radio_checked_bg: '选中态背景色。',
            __sc_radio_checked_border_color: '选中态边框颜色。',
            __sc_radio_disabled_opacity: '禁用态透明度。',
            __sc_radio_disabled_text_color: '禁用态文字颜色。',
            __sc_radio_font_size: '字号。',
            __sc_radio_gap: '图标与标签间距。',
            __sc_radio_icon_size: '图标大小。',
            __sc_radio_text_color: '文字颜色。'
        }
    },
    demoDesc: {
        radio_standalone: 'Radio 脱离 RadioGroup 单独使用，自行管理选中态。'
    },
    componentProps: {
        radio: {
            value: '标识符，选中时对应 RadioGroup 的 value（必填）。',
            label: '标签文字。',
            checked: '独立使用是否选中（受控）。',
            onChange: '独立使用选中变化回调。',
            disabled: '禁用。',
            labelDisabled: '禁用标签点击。',
            labelPosition: '标签位置：left / right。',
            iconSize: '图标大小。',
            checkedColor: '选中态颜色，默认 #1989fa。',
            shape: '形状：round / square / dot。',
            checkedIcon: '自定义选中图标。',
            uncheckedIcon: '自定义未选中图标。'
        }
    }
};
