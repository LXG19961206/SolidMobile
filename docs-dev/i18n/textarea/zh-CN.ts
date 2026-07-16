export default {
    demo: {
        textareaAutoSize: 'AutoSize',
        textareaAutoSizeDesc: 'Auto size.',
        textareaForm: 'Form',
        textareaFormDesc: 'Textarea form.',
        textareaStates: 'States',
        textareaStatesDesc: 'States.',
        textareaAutoSizeMobileDesc: 'Textarea Auto Size  (Mobile) Description',
        textareaBasic: 'Textarea Basic',
        textareaBasicMobileDesc: 'Textarea Basic  (Mobile) Description',
        textareaCharCount: 'Textarea Char Count',
        textareaCharCountMobileDesc: 'Textarea Char Count  (Mobile) Description',
        textareaError: 'Textarea Error',
        textareaMobileTitle: 'Textarea  (Mobile) Title',
        textareaPlaceholderAuto: 'Textarea Placeholder Auto',
        textareaPlaceholderMax: 'Textarea Placeholder Max',
        textareaPlaceholderMore: 'Textarea Placeholder More',
        textareaPlaceholderMulti: 'Textarea Placeholder Multi',
        textareaReadonly: 'Textarea Readonly',
        textareaReadonlyContent: 'Textarea Readonly Content'
    },
    componentIntro: {
        TextareaIntro: '多行文本输入组件。支持自动撑高、字数统计、清除按钮，可通过 FormItem 接入表单。'
    },
    cssVars: {
        Textarea: {
            __sc_textarea_border_color: '边框颜色。',
            __sc_textarea_border_focus_color: '聚焦时边框颜色。',
            __sc_textarea_count_color: '计数颜色。',
            __sc_textarea_count_font_size: '计数字号。',
            __sc_textarea_disabled_opacity: '禁用态透明度。',
            __sc_textarea_error_color: '错误态波浪线颜色。',
            __sc_textarea_placeholder_color: '占位符颜色。',
            __sc_textarea_text_color: '文字颜色。'
        }
    },
    demoDesc: {
        textarea_autosize: '内容超出时自动扩展高度，可限制最小/最大行数。',
        textarea_form: 'contentFlex 让 Textarea 自动拉伸撑满剩余宽度。'
    },
    componentProps: {
        textarea: {
            value: '当前值（受控）。',
            onChange: '值变化回调。',
            defaultValue: '默认值（非受控）。',
            placeholder: '占位文本。',
            maxlength: '最大长度。',
            rows: '可视行数，默认 3。',
            autoSize: '自动撑高，内容超出时扩展。可传 { minRows, maxRows } 限制范围。',
            clearable: '显示清除按钮。',
            disabled: '禁用。',
            readonly: '只读。',
            showCount: '显示字数统计。',
            error: '错误状态，出现红色波浪线。',
            onBlur: '失焦回调。',
            onFocus: '聚焦回调。',
            onEnter: '回车回调（Shift+Enter 换行）。'
        }
    }
};
