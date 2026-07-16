export default {
    componentIntro: {
        PickerIntro: 'Scroll-wheel selector. Tree cascade and flat multi-column.'
    },
    componentProps: {
        picker: {
            columns: 'Data source. Supports tree cascade and flat multi-column modes.',
            value: 'Currently selected values (one per column).',
            onChange: 'Fires on scroll stop.',
            onConfirm: 'Fires when confirm button is clicked.',
            onCancel: 'Fires when cancel button is clicked.',
            show: 'Controlled: show the panel. Auto-managed when not provided.',
            onUpdateShow: 'Panel visibility callback.',
            title: 'Panel title.',
            cancelText: 'Cancel button text. Defaults to locale.',
            confirmText: 'Confirm button text. Defaults to locale.',
            visibleItemCount: 'Visible row count (odd number), default 7.',
            optionHeight: 'Row height (px), default 50.',
            teleport: 'Portal mount target, default document.body.',
            zIndex: 'Stack level, default 2000.',
            placeholders: 'Placeholder text per column. String applies to all, string[] per column.',
            ratio: 'Touch sensitivity multiplier, default 1.5.',
            swipeDuration: 'Inertia scroll duration (seconds), default 1.'
        }
    }
};
