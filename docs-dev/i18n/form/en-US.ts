export default {
    demo: {
        form: 'Form Usage',
        formActions: 'Actions',
        formActionsDesc: 'Form actions.',
        formBasic: 'Basic',
        formBasicDesc: 'Basic form.',
        formDesc: 'FormItem integration.',
        formLayout: 'Layout Strategy',
        formLayoutDesc: 'Form uses Flexbox layout. Mobile screens are narrow (viewport typically 375–430px). The layout follows these principles:',
        formLayoutItem1: 'The control area always takes the remaining space (flex: 1). The label only occupies its content width or the fixed width specified by labelWidth, so controls automatically fill the space beside the label.',
        formLayoutItem2: 'controlAlign sets alignment within the control area: default "left" (children start from the left), set to "right" to push them to the end. "center" is intentionally omitted — on narrow mobile screens labels already take significant space, making center unnatural and wasteful.',
        formLayoutItem3: 'labelAlign supports "top" / "left" / "right". Use "top" for horizontal multi-choice controls like Radio and Checkbox to give them more room.',
        formLayoutItem4: 'RadioGroup / CheckboxGroup auto-detect controlAlign via FormFieldContext — items align left or right based on the Form\'s setting.',
        formLayoutItem5: 'Customize spacing via CSS variables: --sc-form-control-height, --sc-form-item-padding-y, --sc-form-item-label-gap (top mode), --sc-form-item-label-margin (label right margin).',
        formName: 'Form',
        formBasicMobileDesc: 'Form Basic  (Mobile) Description',
        formRange: 'Form Range',
        formSubmitValue: 'Form Submit Value'
    },
    componentIntro: {
        FormIntro: 'Form container with FormItem for value management and validation.'
    },
    componentProps: {
        form: {
            value: 'Controlled form value.',
            onChange: 'Value change callback.',
            defaultValue: 'Uncontrolled default value.',
            onSubmit: 'Submit callback.',
            validateOnChange: 'Validate on field change.',
            validateOnBlur: 'Validate on field blur.',
            disabled: 'Disable all fields.',
            readonly: 'Readonly for all fields.',
            labelAlign: 'Label alignment: top / left / right.',
            labelWidth: 'Fixed label width, e.g. "6em".',
            controlAlign: 'Control alignment, default "left". Set to "right" to push controls to the end.',
            colon: 'Append colon after label.',
            ref: 'Mount callback, receives { setFormValue, resetFormValue, submit, validateAll }.'
        }
    }
};
