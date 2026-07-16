export default {
    nav: {
        datepicker: 'DatePicker 日期选择'
    },
    componentProps: {
        datepicker: {
            value: '当前值，格式 YYYY-MM-DD 或 YYYY-MM-DD HH:mm:ss（datetime 模式）。',
            onChange: '值变化回调。',
            onConfirm: '确认按钮回调。',
            onCancel: '取消按钮回调。',
            startDate: '可选范围起点，默认 2014-01-01。',
            endDate: '可选范围终点，默认 2034-12-31。',
            type: '选择类型。date 年月日，year-month 年月，datetime 日期+时间。',
            placeholder: '占位文字。',
            title: '面板标题。',
            cancelText: '取消按钮文字。',
            confirmText: '确认按钮文字。',
            disabledDate: '禁用特定日期。传入 (year, month, day)，返回 true 则该日不可选。',
            visibleItemCount: '可见行数。',
            teleport: 'Picker 的 Portal 挂载目标，默认 document.body。',
            show: '受控模式：是否显示面板。不传时 DatePicker 自动管理。',
            onUpdateShow: '受控模式：面板开关回调。'
        }
    },
    component: {
        datePicker: {
            title: '选择日期'
        }
    }
};
