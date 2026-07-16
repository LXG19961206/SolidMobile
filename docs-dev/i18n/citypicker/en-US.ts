export default {
    componentIntro: {
        CityPickerIntro: 'Cascading region picker based on Picker. Provide your own data.'
    },
    nav: {
        citypicker: 'CityPicker'
    },
    demoDesc: {
        citypicker_deep: 'Use Picker directly with 6-level tree data for auto-cascading.'
    },
    componentProps: {
        citypicker: {
            columns: 'Tree data for regions. You provide your own.',
            value: 'Currently selected values (one per level).',
            onChange: 'Value change callback.',
            onConfirm: 'Confirm button callback.',
            onCancel: 'Cancel button callback.',
            placeholder: 'Placeholder text.',
            separator: 'Display separator, default " / ".',
            title: 'Panel title.',
            teleport: 'Portal mount target.'
        }
    }
};
