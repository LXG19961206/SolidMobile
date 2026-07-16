export default {
    demo: {
        selectBasic: 'Basic Select',
        selectBasicDesc: 'Tap to trigger, Picker wheel selection',
        selectGender: 'Please select gender',
        selectGenderTitle: 'Choose Gender',
        selectSize: 'Please select size',
        selected: 'Selected',
        selectCustomText: 'Custom Title & Buttons',
        selectControlled: 'Controlled Mode',
        selectManyOptions: 'More Options',
        selectCallback: 'Callback Feedback',
        selectCustomRender: 'Custom Render',
        selectRegion: 'Select Region',
        selectProvince: 'Select Province',
        selectDate: 'Select Date',
        selectAll: 'Select All',
        selectTag: 'Select Tag',
        selectedLabel: 'Selected Label',
        selectDatePlaceholder: 'Select Date Placeholder',
        selectDateTime: 'Select Date Time',
        selectDateTimeTitle: 'Select Date Time Title',
        selectDateTitle: 'Select Date Title',
        selectEndTime: 'Select End Time',
        selectStartTime: 'Select Start Time',
        selectTime: 'Select Time',
        selectYearMonth: 'Select Year Month',
        selectYearMonthTitle: 'Select Year Month Title'
    },
    componentIntro: {
        SelectIntro: 'Option selector based on Picker. Tap to open.'
    },
    nav: {
        select: 'Select'
    },
    demoDesc: {
        select_basic: 'When show is omitted, Select manages its own state.',
        select_form: 'Inside FormItem for automatic form value management.',
        select_custom_text: 'Customize panel title and button text via title / cancelText / confirmText.',
        select_controlled: 'Use show / onUpdateShow for controlled visibility. Useful with external triggers or conditional logic.',
        select_many_options: 'More options trigger scroll wheel; list height controlled by visibleItemCount.',
        select_callback: 'onChange for live value; onConfirm confirms and closes the panel. Demonstrates callback feedback.',
        select_custom_render: 'The render field on each option accepts JSX — use color dots, icons, badges, or any inline layout.'
    },
    componentProps: {
        select: {
            options: 'Options list.',
            value: 'Currently selected value.',
            onChange: 'Value change callback.',
            onConfirm: 'Confirm button callback.',
            placeholder: 'Text when no selection.',
            title: 'Panel title.',
            cancelText: 'Cancel button text.',
            confirmText: 'Confirm button text.',
            visibleItemCount: 'Visible row count, default 7.',
            teleport: 'Portal mount target.',
            show: 'Controlled: show the selector. Auto-managed when not provided.',
            onUpdateShow: 'Panel visibility callback.'
        }
    },
    component: {
        select: {
            props: {
                options: 'Options list.',
                value: 'Current selected value.',
                onChange: 'Value change callback.',
                onConfirm: 'Confirm callback.',
                placeholder: 'Placeholder text when no value selected.',
                title: 'Panel title.',
                cancelText: 'Cancel button text.',
                confirmText: 'Confirm button text.',
                visibleItemCount: 'Visible item count.',
                teleport: 'Portal mount target.',
                show: 'Whether to show the panel. Auto-managed when not set.',
                onUpdateShow: 'Panel visibility callback.'
            }
        }
    }
};
