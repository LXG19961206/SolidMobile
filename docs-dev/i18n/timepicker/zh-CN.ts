export default {
    componentIntro: {
        TimePickerIntro: 'HH:mm:ss 三列时间选择器，基于 Picker 封装。自动适配 Form。'
    },
    nav: {
        timepicker: 'TimePicker 时间选择'
    },
    componentProps: {
        timepicker: {
            value: '当前选中时间，格式 HH:mm:ss。',
            onChange: '滚动停止后回调。',
            onConfirm: '确认回调。',
            onCancel: '取消回调。',
            show: '受控：是否显示面板。不传则自带 Cell 触发器。',
            onUpdateShow: '面板开关回调。',
            placeholder: '未选值时显示的占位文本。',
            title: '面板标题。',
            visibleItemCount: '可见行数（奇数）。',
            optionHeight: '每行高度 (px)。',
            cancelText: '取消按钮文字。',
            confirmText: '确认按钮文字。',
            teleport: 'Portal 挂载目标。'
        }
    }
};
