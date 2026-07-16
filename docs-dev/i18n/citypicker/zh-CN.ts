export default {
    nav: {
        citypicker: 'CityPicker 城市选择'
    },
    demoDesc: {
        citypicker_deep: '直接使用 Picker 组件，传入 6 层深度的树形数据即可自动级联。'
    },
    componentProps: {
        citypicker: {
            columns: '省市区树形数据，用户自行提供。',
            value: '当前选中值（每级一个）。',
            onChange: '值变化回调。',
            onConfirm: '确认按钮回调。',
            onCancel: '取消按钮回调。',
            placeholder: '占位文字。',
            separator: '显示文字分隔符，默认 " / "。',
            title: '面板标题。',
            teleport: 'Portal 挂载目标。'
        }
    }
};
