export default {
    componentProps: {
        formItem: {
            name: '字段名，对应 formValue 的 key（必填）。',
            label: '标签文本。',
            required: '必填标记（红色星号）。',
            rules: '校验规则数组。',
            help: '帮助文本（无错误时展示）。',
            labelAlign: '标签对齐方式，继承 Form。',
            labelWidth: '标签固定宽度，继承 Form。',
            controlAlign: '控件区对齐方向，继承 Form。'
        }
    }
};
