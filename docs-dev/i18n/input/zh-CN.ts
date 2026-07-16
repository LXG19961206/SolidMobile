export default {
    demo: {
        inputAffix: 'Affix',
        inputAffixDesc: 'Prefix/suffix.',
        inputCountdown: 'Countdown',
        inputCountdownDesc: 'Countdown.',
        inputForm: 'Form',
        inputFormDesc: 'Input form.',
        inputSearch: 'Search',
        inputSearchDesc: 'Search.',
        inputShowCount: 'Count',
        inputShowCountDesc: 'Show count.',
        inputStates: 'States',
        inputStatesDesc: 'Input states.',
        inputTypes: 'Types',
        inputTypesDesc: 'Input types.',
        inputBasicMobile: 'Input Basic Mobile',
        inputBasicMobileDesc: 'Input Basic Mobile Desc',
        inputPlaceholderText: 'Input Placeholder Text',
        inputPlaceholderNumber: 'Input Placeholder Number',
        inputPlaceholderPassword: 'Input Placeholder Password',
        inputPlaceholderTel: 'Input Placeholder Tel',
        inputPlaceholderEmail: 'Input Placeholder Email',
        inputClearableMobile: 'Input Clearable Mobile',
        inputClearableMobileDesc: 'Input Clearable Mobile Desc',
        inputClearablePlaceholder: 'Input Clearable Placeholder',
        inputPasswordTogglePlaceholder: 'Input Password Toggle Placeholder',
        inputAffixMobile: 'Input Affix Mobile',
        inputAffixMobileDesc: 'Input Affix Mobile Desc',
        inputSearchPlaceholder: 'Input Search Placeholder',
        inputAlignRight: 'Input Align Right',
        inputAlignCenter: 'Input Align Center',
        inputShowCountMobile: 'Input Show Count Mobile',
        inputShowCountMobileDesc: 'Input Show Count Mobile Desc',
        inputMaxlengthPlaceholder: 'Input Maxlength Placeholder',
        inputStatesMobile: 'Input States Mobile',
        inputStatesMobileDesc: 'Input States Mobile Desc',
        inputReadonlyPlaceholder: 'Input Readonly Placeholder',
        inputReadonlyValue: 'Input Readonly Value',
        inputErrorPlaceholder: 'Input Error Placeholder',
        inputSizeMobile: 'Input Size Mobile',
        inputSizeMobileDesc: 'Input Size Mobile Desc',
        inputSizeSmall: 'Input Size Small',
        inputSizeMedium: 'Input Size Medium',
        inputSizeLarge: 'Input Size Large'
    },
    componentIntro: {
        InputIntro: '文本输入组件。支持多种类型、清除按钮、前后缀、字数统计，可通过 FormItem 接入表单。'
    },
    nav: {
        input: 'Input 输入框'
    },
    cssVars: {
        Input: {
            __sc_input_affix_color: '前后缀颜色。',
            __sc_input_affix_font_size: '前后缀字号。',
            __sc_input_clear_color: '清除按钮颜色。',
            __sc_input_clear_hover_color: '清除按钮悬停色。',
            __sc_input_count_color: '计数颜色。',
            __sc_input_count_font_size: '计数字号。',
            __sc_input_disabled_opacity: '禁用态透明度。',
            __sc_input_error_color: '错误态波浪线颜色。',
            __sc_input_gap: '内部元素间距。',
            __sc_input_placeholder_color: '占位符颜色。',
            __sc_input_text_color: '文字颜色。'
        }
    },
    demoDesc: {
        input_clearable: '输入内容后右侧显示 X 按钮，点击清空。',
        input_search: 'prefix + clearable 实现搜索输入框。',
        input_states: '三种状态对比。error 底部出现红色波浪线，适合独立使用时的校验反馈。',
        input_countdown: '手机号输入框右侧挂一个发送验证码按钮，点击后 60s 倒计时。',
        input_form: 'Input 通过 useFormField() 自动接入 FormItem Context，无需手动传 value/onChange。'
    },
    componentProps: {
        input: {
            type: '输入类型：text / number / password / tel / email / url。',
            value: '当前值（受控）。',
            onChange: '值变化回调。',
            defaultValue: '默认值（非受控）。',
            placeholder: '占位文本。',
            maxlength: '最大长度。',
            clearable: '显示清除按钮。',
            disabled: '禁用。',
            readonly: '只读。',
            showCount: '显示字数统计（需配合 maxlength）。',
            prefix: '左侧图标/文本。',
            suffix: '右侧图标/文本。',
            align: '文字对齐：left / center / right。',
            onBlur: '失焦回调。',
            onFocus: '聚焦回调。',
            onEnter: '回车回调。'
        }
    }
};
