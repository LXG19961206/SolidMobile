import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useCheckboxTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    title: 'Checkbox',
    rows: [
      { name: 'value', type: 'unknown', def: '—', desc: 'checkbox.props.value' },
      { name: 'label', type: 'string | JSX.Element', def: '—', desc: 'checkbox.props.label' },
      { name: 'checked', type: 'boolean', def: '—', desc: 'checkbox.props.checked' },
      { name: 'defaultChecked', type: 'boolean', def: 'false', desc: 'checkbox.props.defaultChecked' },
      { name: 'indeterminate', type: 'boolean', def: 'false', desc: 'checkbox.props.indeterminate' },
      { name: 'onChange', type: '(checked: boolean) => void', def: '—', desc: 'checkbox.props.onChange' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'checkbox.props.disabled' },
      { name: 'labelDisabled', type: 'boolean', def: 'false', desc: 'checkbox.props.labelDisabled' },
      { name: 'labelPosition', type: "'left' | 'right'", def: "'right'", desc: 'checkbox.props.labelPosition' },
      { name: 'iconSize', type: 'number | string', def: "'20px'", desc: 'checkbox.props.iconSize' },
      { name: 'checkedColor', type: 'string', def: "'#1989fa'", desc: 'checkbox.props.checkedColor' },
      { name: 'shape', type: "'square' | 'round'", def: "'square'", desc: 'checkbox.props.shape' },
      { name: 'checkedIcon', type: 'JSX.Element', def: '—', desc: 'checkbox.props.checkedIcon' },
      { name: 'uncheckedIcon', type: 'JSX.Element', def: '—', desc: 'checkbox.props.uncheckedIcon' },
      { name: 'indeterminateIcon', type: 'JSX.Element', def: '—', desc: 'checkbox.props.indeterminateIcon' },
      { name: 'class', type: 'string', def: '—', desc: 'checkbox.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'checkbox.props.style' },
      { name: 'name', type: 'string', def: '—', desc: 'checkbox.props.name' },
    ],
  }, {
    title: 'CheckboxGroup',
    rows: [
      { name: 'value', type: 'unknown[]', def: '—', desc: 'checkbox.groupProps.value' },
      { name: 'defaultValue', type: 'unknown[]', def: '[]', desc: 'checkbox.groupProps.defaultValue' },
      { name: 'onChange', type: '(value: unknown[]) => void', def: '—', desc: 'checkbox.groupProps.onChange' },
      { name: 'direction', type: "'vertical' | 'horizontal'", def: "'vertical'", desc: 'checkbox.groupProps.direction' },
      { name: 'gap', type: 'string | number', def: "'4px 12px' / '0'", desc: 'checkbox.groupProps.gap' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'checkbox.groupProps.disabled' },
      { name: 'max', type: 'number', def: '—', desc: 'checkbox.groupProps.max' },
      { name: 'min', type: 'number', def: '—', desc: 'checkbox.groupProps.min' },
      { name: 'iconSize', type: 'number | string', def: "'20px'", desc: 'checkbox.groupProps.iconSize' },
      { name: 'checkedColor', type: 'string', def: "'#1989fa'", desc: 'checkbox.groupProps.checkedColor' },
      { name: 'shape', type: "'square' | 'round'", def: "'square'", desc: 'checkbox.groupProps.shape' },
      { name: 'checkedIcon', type: 'JSX.Element', def: '—', desc: 'checkbox.groupProps.checkedIcon' },
      { name: 'uncheckedIcon', type: 'JSX.Element', def: '—', desc: 'checkbox.groupProps.uncheckedIcon' },
      { name: 'class', type: 'string', def: '—', desc: 'checkbox.groupProps.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'checkbox.groupProps.style' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Checkbox',
    rows: [
      { name: '--sc-checkbox-text-color', type: 'color', def: 'var(--sc-color-text)', desc: 'checkbox.cssVars.--sc-checkbox-text-color' },
      { name: '--sc-checkbox-disabled-text-color', type: 'color', def: 'var(--sc-color-text-tertiary)', desc: 'checkbox.cssVars.--sc-checkbox-disabled-text-color' },
      { name: '--sc-checkbox-icon-size', type: 'length', def: '20px', desc: 'checkbox.cssVars.--sc-checkbox-icon-size' },
      { name: '--sc-checkbox-border-color', type: 'color', def: '#c8c9cc', desc: 'checkbox.cssVars.--sc-checkbox-border-color' },
      { name: '--sc-checkbox-checked-border-color', type: 'color', def: '#1989fa', desc: 'checkbox.cssVars.--sc-checkbox-checked-border-color' },
      { name: '--sc-checkbox-checked-bg', type: 'color', def: '#1989fa', desc: 'checkbox.cssVars.--sc-checkbox-checked-bg' },
      { name: '--sc-checkbox-disabled-opacity', type: 'number', def: '0.5', desc: 'checkbox.cssVars.--sc-checkbox-disabled-opacity' },
      { name: '--sc-checkbox-gap', type: 'length', def: '8px', desc: 'checkbox.cssVars.--sc-checkbox-gap' },
      { name: '--sc-checkbox-font-size', type: 'length', def: '0.9375rem', desc: 'checkbox.cssVars.--sc-checkbox-font-size' },
      { name: '--sc-checkbox-border-radius', type: 'length', def: '4px', desc: 'checkbox.cssVars.--sc-checkbox-border-radius' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
