import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useFormTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    title: 'Form',
    rows: [
      { name: 'value', type: 'T', def: '—', desc: 'form.props.value' },
      { name: 'onChange', type: '(value: T) => void', def: '—', desc: 'form.props.onChange' },
      { name: 'defaultValue', type: 'T', def: '{}', desc: 'form.props.defaultValue' },
      { name: 'onSubmit', type: '(value: T) => void', def: '—', desc: 'form.props.onSubmit' },
      { name: 'validateOnChange', type: 'boolean', def: 'false', desc: 'form.props.validateOnChange' },
      { name: 'validateOnBlur', type: 'boolean', def: 'false', desc: 'form.props.validateOnBlur' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'form.props.disabled' },
      { name: 'readonly', type: 'boolean', def: 'false', desc: 'form.props.readonly' },
      { name: 'labelAlign', type: "'top' | 'left' | 'right'", def: '—', desc: 'form.props.labelAlign' },
      { name: 'labelWidth', type: 'string', def: '—', desc: 'form.props.labelWidth' },
      { name: 'controlAlign', type: "'left' | 'right'", def: "'left'", desc: 'form.props.controlAlign' },
      { name: 'colon', type: 'boolean', def: 'false', desc: 'form.props.colon' },
      { name: 'scrollToError', type: 'boolean', def: 'false', desc: 'form.props.scrollToError' },
      { name: 'ref', type: '(api: FormRef) => void', def: '—', desc: 'form.props.ref' },
      { name: 'class', type: 'string', def: '—', desc: 'form.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'form.props.style' },
    ],
  }, {
    title: 'FormItem',
    rows: [
      { name: 'name', type: 'string', def: '—', desc: 'form.itemProps.name' },
      { name: 'label', type: 'string | JSX.Element', def: '—', desc: 'form.itemProps.label' },
      { name: 'required', type: 'boolean', def: 'false', desc: 'form.itemProps.required' },
      { name: 'rules', type: 'FormRule[]', def: '—', desc: 'form.itemProps.rules' },
      { name: 'help', type: 'string', def: '—', desc: 'form.itemProps.help' },
      { name: 'labelAlign', type: "'top' | 'left' | 'right'", def: 'Inherits Form', desc: 'form.itemProps.labelAlign' },
      { name: 'labelWidth', type: 'string', def: 'Inherits Form', desc: 'form.itemProps.labelWidth' },
      { name: 'controlAlign', type: "'left' | 'right'", def: 'Inherits Form', desc: 'form.itemProps.controlAlign' },
      { name: 'class', type: 'string', def: '—', desc: 'form.itemProps.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'form.itemProps.style' },
    ],
  }, {
    title: 'FormRule',
    rows: [
      { name: 'validator', type: '(value, formValue) => boolean | Promise<boolean>', def: '—', desc: 'form.ruleProps.validator' },
      { name: 'message', type: 'string | ((value) => string)', def: '—', desc: 'form.ruleProps.message' },
      { name: 'trigger', type: "'onChange' | 'onBlur' | 'onSubmit'", def: "'onChange'", desc: 'form.ruleProps.trigger' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Form',
    rows: [
      { name: '--sc-form-control-height', type: 'length', def: '40px', desc: 'form.cssVars.--sc-form-control-height' },
      { name: '--sc-form-item-padding-y', type: 'length', def: '8px', desc: 'form.cssVars.--sc-form-item-padding-y' },
      { name: '--sc-form-item-label-top-padding-y', type: 'length', def: '12px', desc: 'form.cssVars.--sc-form-item-label-top-padding-y' },
      { name: '--sc-form-item-label-gap', type: 'length', def: '6px', desc: 'form.cssVars.--sc-form-item-label-gap' },
      { name: '--sc-form-item-label-margin', type: 'length', def: '12px', desc: 'form.cssVars.--sc-form-item-label-margin' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
