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
        selectDatePlaceholder: 'Select Date Placeholder',
        selectDateTitle: 'Select Date Title',
        selectYearMonth: 'Select Year Month',
        selectYearMonthTitle: 'Select Year Month Title',
        selectDateTime: 'Select Date Time',
        selectDateTimeTitle: 'Select Date Time Title',
        selectTime: 'Select Time',
        selectStartTime: 'Select Start Time',
        selectEndTime: 'Select End Time',
        selectRegion: 'Select Region',
        selectProvince: 'Select Province',
        selectDate: 'Select Date',
        selectAll: 'Select All',
        selectTag: 'Select Tag',
        selectedLabel: 'Selected Label',
        selectedOption: '已选'
    },
    componentIntro: {
        SelectIntro: '选项选择器，基于 Picker 组件封装。点击触发区域弹出滚轮选择。'
    },
    demoDesc: {
        select_basic: '不传 show 时，Select 自行管理面板开关，点击即可选择。',
        select_form: '放在 FormItem 中自动集成表单的值管理。',
        select_custom_text: 'title / cancelText / confirmText 自定义面板标题和按钮文案。',
        select_controlled: '通过 show / onUpdateShow 受控管理面板显隐，适合需要外部触发器或条件判断的场景。',
        select_many_options: '更多选项时自动出现滚轮滚动，列表高度由 visibleItemCount 控制。',
        select_callback: 'onChange 实时获取选中值，onConfirm 确认后关闭面板。演示带回调反馈的用法。',
        select_custom_render: '选项的 render 字段支持传入 JSX，可实现颜色标记、图标、复杂排版等自定义内容。'
    },
    componentProps: {
        select: {
            options: '选项列表。',
            value: '当前选中值。',
            onChange: '值变化回调。',
            onConfirm: '确认按钮点击回调。',
            placeholder: '无选中时显示的文字。',
            title: '面板标题。',
            cancelText: '取消按钮文字。',
            confirmText: '确认按钮文字。',
            visibleItemCount: '可见行数，默认 7。',
            teleport: 'Portal 挂载目标。',
            show: '是否显示选择器面板。不传时 Select 自动管理。',
            onUpdateShow: '面板开关回调。'
        }
    }
};
