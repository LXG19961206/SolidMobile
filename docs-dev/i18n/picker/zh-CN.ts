export default {
    componentIntro: {
        PickerIntro: '滚轮选择器，支持 Tree 级联和 Flat 多列。点击 Cell 弹出。'
    },
    nav: {
        picker: 'Picker 滚轮选择'
    },
    componentProps: {
        picker: {
            columns: '数据源。支持 tree 级联和 flat 多列两种模式。',
            value: '当前选中值（每列一个，按列顺序排列）。',
            onChange: '滚动停止后回调。',
            onConfirm: '确认按钮点击回调。',
            onCancel: '取消按钮点击回调。',
            show: '受控模式：是否显示面板。不传时 Picker 自动管理。',
            onUpdateShow: '面板开关回调。',
            title: '面板标题。',
            cancelText: '取消按钮文字。默认跟随 locale。',
            confirmText: '确认按钮文字。默认跟随 locale。',
            visibleItemCount: '可见行数（奇数），默认 7。',
            optionHeight: '每行高度 (px)，默认 50。',
            teleport: 'Portal 挂载目标，默认 document.body。',
            zIndex: '层级，默认 2000。',
            placeholders: '每列顶部占位提示文字，string 应用于所有列，string[] 按列指定。',
            ratio: '触摸灵敏度倍率，默认 1.5。',
            swipeDuration: '惯性滚动持续时长（秒），默认 1。'
        }
    },
    component: {
        picker: {
            props: {
                columns: '数据源。支持 tree 级联和 flat 多列两种模式。',
                value: '当前选中值（每列一个，按列顺序排列）。',
                onChange: '值变化回调（每次滚动停止后触发）。',
                onConfirm: '确认按钮点击回调。',
                onCancel: '取消按钮点击回调。',
                show: '是否显示选择器面板。',
                onUpdateShow: '面板关闭回调。',
                title: '标题。',
                cancelText: '取消按钮文字。',
                confirmText: '确认按钮文字。',
                visibleItemCount: '可见行数（必须为奇数），默认 7。',
                optionHeight: '每行高度，默认从 CSS 变量读取。',
                teleport: 'Portal 挂载目标。',
                zIndex: 'z-index。',
                placeholders: '占位选项文本。',
                ratio: '触摸滑动灵敏度倍率。',
                swipeDuration: '惯性动画时长。'
            }
        }
    }
};
