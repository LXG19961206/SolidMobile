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
        inputAffixMobile: 'Input Affix Mobile',
        inputAffixMobileDesc: 'Input Affix Mobile Desc',
        inputAlignCenter: 'Input Align Center',
        inputAlignRight: 'Input Align Right',
        inputBasicMobile: 'Input Basic Mobile',
        inputBasicMobileDesc: 'Input Basic Mobile Desc',
        inputClearableMobile: 'Input Clearable Mobile',
        inputClearableMobileDesc: 'Input Clearable Mobile Desc',
        inputClearablePlaceholder: 'Input Clearable Placeholder',
        inputErrorPlaceholder: 'Input Error Placeholder',
        inputMaxlengthPlaceholder: 'Input Maxlength Placeholder',
        inputPasswordTogglePlaceholder: 'Input Password Toggle Placeholder',
        inputPlaceholderEmail: 'Input Placeholder Email',
        inputPlaceholderNumber: 'Input Placeholder Number',
        inputPlaceholderPassword: 'Input Placeholder Password',
        inputPlaceholderTel: 'Input Placeholder Tel',
        inputPlaceholderText: 'Input Placeholder Text',
        inputReadonlyPlaceholder: 'Input Readonly Placeholder',
        inputReadonlyValue: 'Input Readonly Value',
        inputSearchPlaceholder: 'Input Search Placeholder',
        inputShowCountMobile: 'Input Show Count Mobile',
        inputShowCountMobileDesc: 'Input Show Count Mobile Desc',
        inputSizeLarge: 'Input Size Large',
        inputSizeMedium: 'Input Size Medium',
        inputSizeMobile: 'Input Size Mobile',
        inputSizeMobileDesc: 'Input Size Mobile Desc',
        inputSizeSmall: 'Input Size Small',
        inputStatesMobile: 'Input States Mobile',
        inputStatesMobileDesc: 'Input States Mobile Desc'
    },
    componentIntro: {
        InputIntro: 'Text input with types, clear button, prefix/suffix, FormItem integration.'
    },
    nav: {
        input: 'Input'
    },
    cssVars: {
        Input: {
            __sc_input_affix_color: 'Input prefix/suffix color.',
            __sc_input_affix_font_size: 'Input prefix/suffix font size.',
            __sc_input_clear_color: 'Input clear button color.',
            __sc_input_clear_hover_color: 'Input clear button hover color.',
            __sc_input_count_color: 'Input character count color.',
            __sc_input_count_font_size: 'Input character count font size.',
            __sc_input_disabled_opacity: 'Input disabled state opacity.',
            __sc_input_error_color: 'Input error state underline color.',
            __sc_input_gap: 'Input internal element gap.',
            __sc_input_placeholder_color: 'Input placeholder text color.',
            __sc_input_text_color: 'Input text color.'
        }
    },
    demoDesc: {
        input_clearable: 'Clear button appears on right when typed; click to clear.',
        input_search: 'prefix + clearable for search input.',
        input_states: 'Three states compared. error shows red wavy underline for validation.',
        input_countdown: 'Phone input with SMS code button and 60s countdown.',
        input_form: 'Input auto-connects to FormItem context via useFormField(). No manual value/onChange needed.'
    },
    componentProps: {
        input: {
            type: 'Input type: text / number / password / tel / email / url.',
            value: 'Current value (controlled).',
            onChange: 'Value change callback.',
            defaultValue: 'Default value (uncontrolled).',
            placeholder: 'Placeholder text.',
            maxlength: 'Max length.',
            clearable: 'Show clear button.',
            disabled: 'Disabled.',
            readonly: 'Readonly.',
            showCount: 'Show character count (requires maxlength).',
            prefix: 'Left icon/text.',
            suffix: 'Right icon/text.',
            align: 'Text alignment: left / center / right.',
            onBlur: 'Blur callback.',
            onFocus: 'Focus callback.',
            onEnter: 'Enter key callback.'
        }
    }
};
