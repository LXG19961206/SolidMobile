export default {
    demo: {
        checkboxBasicDisabled: 'Checkbox Basic Disabled',
        checkboxBasicDisabledDesc: 'Checkbox Basic Disabled Description',
        checkboxIndeterminate: 'Checkbox Indeterminate',
        checkboxIndeterminateDesc: 'Checkbox Indeterminate Description',
        checkboxMaxCustomIcon: 'Checkbox Max Custom Icon',
        checkboxMaxCustomIconDesc: 'Checkbox Max Custom Icon Description',
        checkboxShapeColor: 'Checkbox Shape Color',
        checkboxShapeColorDesc: 'Checkbox Shape Color Description',
        checkboxStandaloneForm: 'Checkbox Standalone Form',
        checkboxStandaloneFormDesc: "复选框 独立 Form 描述"
    },
    componentIntro: {
        CheckboxIntro: '多选组件，配合 CheckboxGroup 使用。支持多种形状、半选状态和自定义图标。'
    },
    cssVars: {
        Checkbox: {
            __sc_checkbox_border_color: '边框颜色。',
            __sc_checkbox_border_radius: 'square 形状圆角。',
            __sc_checkbox_checked_bg: '选中态背景色。',
            __sc_checkbox_checked_border_color: '选中态边框颜色。',
            __sc_checkbox_disabled_opacity: '禁用态透明度。',
            __sc_checkbox_disabled_text_color: '禁用态文字颜色。',
            __sc_checkbox_font_size: '字号。',
            __sc_checkbox_gap: '图标与标签间距。',
            __sc_checkbox_icon_size: '图标大小。',
            __sc_checkbox_text_color: '文字颜色。'
        }
    },
    demoDesc: {
        checkbox_minmax: 'max 限制最多可选数，min 限制最少可选数。',
        checkbox_standalone: 'Checkbox 脱离 CheckboxGroup 单独使用，支持受控和非受控。'
    },
    componentProps: {
        checkbox: {
            value: '标识符，选中时对应 CheckboxGroup 的 value（必填）。',
            label: '标签文字。',
            checked: '独立使用是否选中（受控）。',
            defaultChecked: '默认选中（非受控）。',
            indeterminate: '半选状态，选中态图标不覆盖。',
            onChange: '独立使用选中变化回调。',
            disabled: '禁用。',
            labelDisabled: '禁用标签点击。',
            labelPosition: '标签位置：left / right。',
            iconSize: '图标大小。',
            checkedColor: '选中态颜色，默认 #1989fa。',
            shape: '形状：square / round。',
            checkedIcon: '自定义选中图标。',
            uncheckedIcon: '自定义未选中图标。',
            indeterminateIcon: '自定义半选图标。'
        }
    }
};
