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
        TextareaIntro: 'Multi-line text input. Auto-resize, clear, FormItem.'
    },
    cssVars: {
        Textarea: {
            __sc_textarea_border_color: 'Textarea border color.',
            __sc_textarea_border_focus_color: 'Textarea focus border color.',
            __sc_textarea_count_color: 'Textarea character count color.',
            __sc_textarea_count_font_size: 'Textarea character count font size.',
            __sc_textarea_disabled_opacity: 'Textarea disabled state opacity.',
            __sc_textarea_error_color: 'Textarea error state underline color.',
            __sc_textarea_placeholder_color: 'Textarea placeholder text color.',
            __sc_textarea_text_color: 'Textarea text color.'
        }
    },
    demoDesc: {
        textarea_autosize: 'Auto-expands on overflow with min/max row limits.',
        textarea_form: 'contentFlex makes Textarea fill remaining width.'
    },
    componentProps: {
        textarea: {
            value: 'Current value (controlled).',
            onChange: 'Value change callback.',
            defaultValue: 'Default value (uncontrolled).',
            placeholder: 'Placeholder text.',
            maxlength: 'Max length.',
            rows: 'Visible rows, default 3.',
            autoSize: 'Auto-resize as content grows. Can pass { minRows, maxRows }.',
            clearable: 'Show clear button.',
            disabled: 'Disabled.',
            readonly: 'Readonly.',
            showCount: 'Show character count.',
            error: 'Error state, shows red wavy underline.',
            onBlur: 'Blur callback.',
            onFocus: 'Focus callback.',
            onEnter: 'Enter key callback (Shift+Enter for newline).'
        }
    }
};
