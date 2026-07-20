import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useRadioTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    title: 'Radio',
    rows: [
      { name: 'value', type: 'unknown', def: '—', desc: 'radio.props.value' },
      { name: 'label', type: 'string | JSX.Element', def: '—', desc: 'radio.props.label' },
      { name: 'checked', type: 'boolean', def: '—', desc: 'radio.props.checked' },
      { name: 'onChange', type: '(checked: boolean) => void', def: '—', desc: 'radio.props.onChange' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'radio.props.disabled' },
      { name: 'labelDisabled', type: 'boolean', def: 'false', desc: 'radio.props.labelDisabled' },
      { name: 'labelPosition', type: "'left' | 'right'", def: "'right'", desc: 'radio.props.labelPosition' },
      { name: 'iconSize', type: 'number | string', def: "'20px'", desc: 'radio.props.iconSize' },
      { name: 'checkedColor', type: 'string', def: "'#1989fa'", desc: 'radio.props.checkedColor' },
      { name: 'shape', type: "'round' | 'square' | 'dot'", def: "'round'", desc: 'radio.props.shape' },
      { name: 'checkedIcon', type: 'JSX.Element', def: '—', desc: 'radio.props.checkedIcon' },
      { name: 'uncheckedIcon', type: 'JSX.Element', def: '—', desc: 'radio.props.uncheckedIcon' },
      { name: 'class', type: 'string', def: '—', desc: 'radio.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'radio.props.style' },
      { name: 'name', type: 'string', def: '—', desc: 'radio.props.name' },
    ],
  }, {
    title: 'RadioGroup',
    rows: [
      { name: 'value', type: 'unknown', def: '—', desc: 'radio.groupProps.value' },
      { name: 'defaultValue', type: 'unknown', def: '—', desc: 'radio.groupProps.defaultValue' },
      { name: 'onChange', type: '(value: unknown) => void', def: '—', desc: 'radio.groupProps.onChange' },
      { name: 'direction', type: "'vertical' | 'horizontal'", def: "'vertical'", desc: 'radio.groupProps.direction' },
      { name: 'gap', type: 'string | number', def: "'4px 12px' / '0'", desc: 'radio.groupProps.gap' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'radio.groupProps.disabled' },
      { name: 'iconSize', type: 'number | string', def: "'20px'", desc: 'radio.groupProps.iconSize' },
      { name: 'checkedColor', type: 'string', def: "'#1989fa'", desc: 'radio.groupProps.checkedColor' },
      { name: 'shape', type: "'round' | 'square' | 'dot'", def: "'round'", desc: 'radio.groupProps.shape' },
      { name: 'checkedIcon', type: 'JSX.Element', def: '—', desc: 'radio.groupProps.checkedIcon' },
      { name: 'uncheckedIcon', type: 'JSX.Element', def: '—', desc: 'radio.groupProps.uncheckedIcon' },
      { name: 'class', type: 'string', def: '—', desc: 'radio.groupProps.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'radio.groupProps.style' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Radio',
    rows: [
      { name: '--sc-radio-text-color', type: 'color', def: 'var(--sc-color-text)', desc: 'radio.cssVars.--sc-radio-text-color' },
      { name: '--sc-radio-disabled-text-color', type: 'color', def: 'var(--sc-color-text-tertiary)', desc: 'radio.cssVars.--sc-radio-disabled-text-color' },
      { name: '--sc-radio-icon-size', type: 'length', def: '20px', desc: 'radio.cssVars.--sc-radio-icon-size' },
      { name: '--sc-radio-border-color', type: 'color', def: '#c8c9cc', desc: 'radio.cssVars.--sc-radio-border-color' },
      { name: '--sc-radio-checked-border-color', type: 'color', def: '#1989fa', desc: 'radio.cssVars.--sc-radio-checked-border-color' },
      { name: '--sc-radio-checked-bg', type: 'color', def: '#1989fa', desc: 'radio.cssVars.--sc-radio-checked-bg' },
      { name: '--sc-radio-disabled-opacity', type: 'number', def: '0.5', desc: 'radio.cssVars.--sc-radio-disabled-opacity' },
      { name: '--sc-radio-gap', type: 'length', def: '8px', desc: 'radio.cssVars.--sc-radio-gap' },
      { name: '--sc-radio-font-size', type: 'length', def: '0.9375rem', desc: 'radio.cssVars.--sc-radio-font-size' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
