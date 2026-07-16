export default {
    demo: {
        radioCustomIcon: 'Custom Icon',
        radioCustomIconDesc: 'Custom icon.',
        radioDisabledShape: 'Radio Disabled Shape',
        radioDisabledShapeDesc: 'Radio Disabled Shape Description',
        radioHorizontalColor: 'Radio Horizontal Color',
        radioHorizontalColorDesc: 'Radio Horizontal Color Description',
        radioStandaloneForm: 'Radio Standalone Form',
        radioStandaloneFormDesc: 'Radio Standalone Form Description'
    },
    componentIntro: {
        RadioIntro: 'Single-select with RadioGroup. Shapes, custom icons, colors.'
    },
    cssVars: {
        Radio: {
            __sc_radio_border_color: 'Radio border color.',
            __sc_radio_checked_bg: 'Radio checked background color.',
            __sc_radio_checked_border_color: 'Radio checked border color.',
            __sc_radio_disabled_opacity: 'Radio disabled opacity.',
            __sc_radio_disabled_text_color: 'Radio disabled text color.',
            __sc_radio_font_size: 'Radio font size.',
            __sc_radio_gap: 'Radio icon-to-label gap.',
            __sc_radio_icon_size: 'Radio icon size.',
            __sc_radio_text_color: 'Radio label text color.'
        }
    },
    demoDesc: {
        radio_standalone: 'Standalone radio outside RadioGroup with self-managed state.'
    },
    componentProps: {
        radio: {
            value: 'Identifier, corresponds to RadioGroup value when selected (required).',
            label: 'Label text.',
            checked: 'Whether checked when used standalone (controlled).',
            onChange: 'Change callback when used standalone.',
            disabled: 'Disabled.',
            labelDisabled: 'Disable label click.',
            labelPosition: 'Label position: left / right.',
            iconSize: 'Icon size.',
            checkedColor: 'Checked color, default #1989fa.',
            shape: 'Shape: round / square / dot.',
            checkedIcon: 'Custom checked icon.',
            uncheckedIcon: 'Custom unchecked icon.'
        }
    }
};
