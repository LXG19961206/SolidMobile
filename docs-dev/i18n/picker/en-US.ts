export default {
    componentIntro: {
        PickerIntro: 'Scroll-wheel selector. Tree cascade and flat multi-column.'
    },
    nav: {
        picker: 'Picker'
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
    },
    component: {
        picker: {
            props: {
                columns: 'Data source. Supports tree cascade and flat multi-column modes.',
                value: 'Current selected values (one per column).',
                onChange: 'Value change callback.',
                onConfirm: 'Confirm button callback.',
                onCancel: 'Cancel button callback.',
                show: 'Whether to show the picker panel.',
                onUpdateShow: 'Panel visibility callback.',
                title: 'Panel title.',
                cancelText: 'Cancel button text.',
                confirmText: 'Confirm button text.',
                visibleItemCount: 'Visible item count (must be odd), default 7.',
                optionHeight: 'Item height, defaults to CSS variable.',
                teleport: 'Portal mount target.',
                zIndex: 'z-index.',
                placeholders: 'Placeholder option text.',
                ratio: 'Touch swipe sensitivity ratio.',
                swipeDuration: 'Inertia animation duration.'
            }
        }
    }
};
