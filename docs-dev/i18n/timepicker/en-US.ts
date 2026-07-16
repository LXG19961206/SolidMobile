export default {
    componentIntro: {
        TimePickerIntro: 'HH:mm:ss time picker based on Picker. Form integration.'
    },
    componentProps: {
        timepicker: {
            value: 'Current time, format HH:mm:ss.',
            onChange: 'Fires when scroll stops.',
            onConfirm: 'Confirm callback.',
            onCancel: 'Cancel callback.',
            show: 'Controlled: show the panel. Built-in Cell trigger when not provided.',
            onUpdateShow: 'Panel visibility callback.',
            placeholder: 'Placeholder when no value selected.',
            title: 'Panel title.',
            visibleItemCount: 'Visible row count (odd number).',
            optionHeight: 'Row height (px).',
            cancelText: 'Cancel button text.',
            confirmText: 'Confirm button text.',
            teleport: 'Portal mount target.'
        }
    }
};
