export default {
    demo: {
        form: 'Form Usage',
        formDesc: 'FormItem integration.',
        formActions: 'Actions',
        formActionsDesc: 'Form actions.',
        formBasic: 'Basic',
        formBasicDesc: 'Basic form.',
        formLayout: 'Layout Strategy',
        formLayoutDesc: 'Form uses Flexbox layout. Mobile screens are narrow (viewport typically 375–430px). The layout follows these principles:',
        formLayoutItem1: 'The control area always takes the remaining space (flex: 1). The label only occupies its content width or the fixed width specified by labelWidth, so controls automatically fill the space beside the label.',
        formLayoutItem2: 'controlAlign sets alignment within the control area: default "left" (children start from the left), set to "right" to push them to the end. "center" is intentionally omitted — on narrow mobile screens labels already take significant space, making center unnatural and wasteful.',
        formLayoutItem3: 'labelAlign supports "top" / "left" / "right". Use "top" for horizontal multi-choice controls like Radio and Checkbox to give them more room.',
        formLayoutItem4: 'RadioGroup / CheckboxGroup auto-detect controlAlign via FormFieldContext — items align left or right based on the Form\'s setting.',
        formLayoutItem5: 'Customize spacing via CSS variables: --sc-form-control-height, --sc-form-item-padding-y, --sc-form-item-label-gap (top mode), --sc-form-item-label-margin (label right margin).',
        formSubmitValue: 'Form Submit Value',
        formName: 'Form',
        formBasicMobileDesc: 'Form Basic  (Mobile) Description',
        formRange: 'Form Range'
    },
    componentIntro: {
        FormIntro: '表单容器，通过 FormItem 统一管理字段值、校验和提交。'
    },
    componentProps: {
        form: {
            value: '受控值。',
            onChange: '值变化回调。',
            defaultValue: '非受控默认值。',
            onSubmit: '提交回调。',
            validateOnChange: '字段变化时校验。',
            validateOnBlur: '字段失焦时校验。',
            disabled: '全局禁用。',
            readonly: '全局只读。',
            labelAlign: '标签对齐方式：top / left / right。',
            labelWidth: '标签固定宽度，如 "6em"。',
            controlAlign: '控件区对齐方向，默认 left。设为 right 时控件靠右。',
            colon: '标签后加冒号。',
            ref: '组件挂载回调，接收 { setFormValue, resetFormValue, submit, validateAll }。'
        }
    }
};
