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
        checkboxStandaloneFormDesc: 'Checkbox Standalone Form Description'
    },
    componentIntro: {
        CheckboxIntro: 'Multi-select with CheckboxGroup. Shapes, half-check, custom icons.'
    },
    nav: {
        checkbox: 'Checkbox'
    },
    cssVars: {
        Checkbox: {
            __sc_checkbox_border_color: 'Checkbox border color.',
            __sc_checkbox_border_radius: 'Checkbox square shape border radius.',
            __sc_checkbox_checked_bg: 'Checkbox checked background color.',
            __sc_checkbox_checked_border_color: 'Checkbox checked border color.',
            __sc_checkbox_disabled_opacity: 'Checkbox disabled opacity.',
            __sc_checkbox_disabled_text_color: 'Checkbox disabled text color.',
            __sc_checkbox_font_size: 'Checkbox font size.',
            __sc_checkbox_gap: 'Checkbox icon-to-label gap.',
            __sc_checkbox_icon_size: 'Checkbox icon size.',
            __sc_checkbox_text_color: 'Checkbox label text color.'
        }
    },
    demoDesc: {
        checkbox_minmax: 'max limits max selections, min sets minimum.',
        checkbox_standalone: 'Standalone checkbox outside CheckboxGroup. Controlled and uncontrolled modes.'
    },
    componentProps: {
        checkbox: {
            value: 'Identifier, corresponds to CheckboxGroup value when selected (required).',
            label: 'Label text.',
            checked: 'Whether checked when used standalone (controlled).',
            defaultChecked: 'Default checked (uncontrolled).',
            indeterminate: 'Indeterminate state, check icon not shown.',
            onChange: 'Change callback when used standalone.',
            disabled: 'Disabled.',
            labelDisabled: 'Disable label click.',
            labelPosition: 'Label position: left / right.',
            iconSize: 'Icon size.',
            checkedColor: 'Checked color, default #1989fa.',
            shape: 'Shape: square / round.',
            checkedIcon: 'Custom checked icon.',
            uncheckedIcon: 'Custom unchecked icon.',
            indeterminateIcon: 'Custom indeterminate icon.'
        }
    }
};
