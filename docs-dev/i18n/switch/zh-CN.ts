export default {
    demo: {
        switchInput: 'Switch + Input',
        switchInputDesc: 'Switch + Input.',
        switchBasic: 'Basic Switch',
        switchBasicDesc: 'Controlled / Uncontrolled / Default',
        switchColorText: 'Switch Color Text',
        switchColorTextDesc: 'Switch Color Text Desc',
        switchSizeDisabled: 'Switch Size Disabled',
        switchSizeDisabledDesc: "开关 尺寸 禁用 描述"
    },
    componentIntro: {
        SwitchIntro: '在两种状态间切换的交互控件。支持受控 / 非受控模式，自定义尺寸、颜色及禁用状态。'
    },
    demoDesc: {
        switch_text_label: '文案显示在滑块右侧。如需"左 label + 滑块"布局，Switch 本身是行内元素，在外部包一个 flex 容器即可轻松实现。',
        switch_uncontrolled: '不传 checked，组件自行管理开关状态。',
        switch_size: '支持数字（px）或 CSS 字符串，默认 28。',
        switch_disabled: '禁用后不可点击，整体降低透明度。'
    },
    componentProps: {
        switch: {
            checked: '是否打开（受控模式）。',
            value: 'checked 的别名。',
            defaultChecked: '默认状态（非受控模式）。',
            onChange: '状态变化回调。',
            disabled: '是否禁用。',
            size: '尺寸，数字自动补 px，默认 28。',
            activeColor: '打开时的背景色。',
            inactiveColor: '关闭时的背景色。',
            activeText: '打开时显示的文案，在滑块右侧。',
            inactiveText: '关闭时显示的文案，在滑块右侧。',
            class: '自定义 CSS class。',
            style: '内联样式。'
        }
    }
};
