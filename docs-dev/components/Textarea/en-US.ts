export default {
  textarea: { props: {
    value: 'Current value (controlled).', onChange: '(value: string) => void.', defaultValue: 'Default (uncontrolled).', placeholder: 'Placeholder.', maxlength: 'Max length.', rows: 'Visible rows, default 3.', autoSize: 'Auto-expand: boolean | { minRows, maxRows }.', clearable: 'Show clear × button.', disabled: 'Disabled.', readonly: 'Readonly.', showCount: 'Show char count (+ maxlength).', error: 'Error state.', height: 'Fixed height, e.g. "120px".', onBlur: 'Blur callback.', onFocus: 'Focus callback.', onEnter: 'Enter key callback.', onClear: 'Clear callback.', autofocus: 'Auto-focus.', class: 'Custom CSS class.', style: 'Inline styles.', id: 'DOM id.', name: 'Native name.',
  },
  cssVars: { '--sc-textarea-text-color': 'Text color.', '--sc-textarea-placeholder-color': 'Placeholder color.', '--sc-textarea-border-color': 'Border color.', '--sc-textarea-border-focus-color': 'Focus border color.', '--sc-textarea-disabled-opacity': 'Disabled opacity.', '--sc-textarea-count-font-size': 'Count font size.', '--sc-textarea-count-color': 'Count color.', '--sc-textarea-error-color': 'Error color.' },
  demo: { basic: 'Basic', autoSize: 'Auto Size', states: 'States', count: 'Char Count', form: 'Form' },
  demoDesc: { basic: 'rows={5} for height, placeholder text.', autoSize: 'autoSize expands with content. { minRows, maxRows } for limits.', states: 'disabled, readonly, error, clearable.', count: 'maxlength + showCount displays counter.', form: 'Inside FormItem via useFormField().' },
  intro: 'Multi-line text input with auto-expand, char count, clear button, state control, and Form integration.',
  },
};
