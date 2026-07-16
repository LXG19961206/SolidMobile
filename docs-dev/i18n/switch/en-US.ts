export default {
    demo: {
        switchInput: 'Switch + Input',
        switchInputDesc: 'Switch + Input.',
        switchBasic: 'Basic Switch',
        switchBasicDesc: 'Controlled / Uncontrolled / Default',
        switchColorText: 'Switch Color Text',
        switchColorTextDesc: 'Switch Color Text Desc',
        switchSizeDisabled: 'Switch Size Disabled',
        switchSizeDisabledDesc: 'Switch Size Disabled Desc'
    },
    componentIntro: {
        SwitchIntro: 'Toggle control. Controlled/uncontrolled, custom size/color.'
    },
    demoDesc: {
        switch_text_label: 'Text displays right of slider. For left-label layout, wrap Switch in a flex container.',
        switch_uncontrolled: 'Self-managed when checked is not passed.',
        switch_size: 'Supports numbers (px) or CSS strings. Default 28.',
        switch_disabled: 'Non-interactive when disabled; reduced opacity.'
    },
    componentProps: {
        switch: {
            checked: 'Whether switch is on (controlled mode).',
            value: 'Alias for checked.',
            defaultChecked: 'Default state (uncontrolled mode).',
            onChange: 'State change callback.',
            disabled: 'Whether disabled.',
            size: 'Size, numbers auto-suffixed with px, default 28.',
            activeColor: 'Background color when on.',
            inactiveColor: 'Background color when off.',
            activeText: 'Text shown when on, right of thumb.',
            inactiveText: 'Text shown when off, right of thumb.',
            class: 'Custom CSS class.',
            style: 'Inline styles.'
        }
    }
};
