export default {
    nav: {
        datepicker: 'DatePicker'
    },
    componentProps: {
        datepicker: {
            value: 'Current value, format YYYY-MM-DD or YYYY-MM-DD HH:mm:ss (datetime).',
            onChange: 'Value change callback.',
            onConfirm: 'Confirm button callback.',
            onCancel: 'Cancel button callback.',
            startDate: 'Start of selectable range, default 2014-01-01.',
            endDate: 'End of selectable range, default 2034-12-31.',
            type: 'Selection type. date, year-month, or datetime.',
            placeholder: 'Placeholder text.',
            title: 'Panel title.',
            cancelText: 'Cancel button text.',
            confirmText: 'Confirm button text.',
            disabledDate: 'Disable specific dates. Function (year, month, day) => boolean.',
            visibleItemCount: 'Visible row count.',
            teleport: 'Picker portal mount target, default document.body.',
            show: 'Controlled: show the panel. Auto-managed when not provided.',
            onUpdateShow: 'Panel visibility callback for controlled mode.'
        }
    },
    component: {
        datePicker: {
            title: 'Select Date'
        }
    }
};
