import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useStepperTableData() {
  const t = useT();
  const propsTables: TableSection[] = [{
    rows: [
      { name: 'value', type: 'number', def: '—', desc: 'stepper.props.value' },
      { name: 'onChange', type: '(value: number) => void', def: '—', desc: 'stepper.props.onChange' },
      { name: 'defaultValue', type: 'number', def: '0', desc: 'stepper.props.defaultValue' },
      { name: 'min', type: 'number', def: '0', desc: 'stepper.props.min' },
      { name: 'max', type: 'number', def: 'Infinity', desc: 'stepper.props.max' },
      { name: 'step', type: 'number', def: '1', desc: 'stepper.props.step' },
      { name: 'decimalLength', type: 'number', def: '0', desc: 'stepper.props.decimalLength' },
      { name: 'integer', type: 'boolean', def: 'false', desc: 'stepper.props.integer' },
      { name: 'allowEmpty', type: 'boolean', def: 'false', desc: 'stepper.props.allowEmpty' },
      { name: 'inputDisabled', type: 'boolean', def: 'false', desc: 'stepper.props.inputDisabled' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'stepper.props.disabled' },
      { name: 'readonly', type: 'boolean', def: 'false', desc: 'stepper.props.readonly' },
      { name: 'size', type: 'number | string', def: '—', desc: 'stepper.props.size' },
      { name: 'buttonSize', type: 'number | string', def: '32', desc: 'stepper.props.buttonSize' },
      { name: 'inputWidth', type: 'number | string', def: '50', desc: 'stepper.props.inputWidth' },
      { name: 'placeholder', type: 'string', def: '—', desc: 'stepper.props.placeholder' },
      { name: 'minusIcon', type: 'JSX.Element', def: '—', desc: 'stepper.props.minusIcon' },
      { name: 'plusIcon', type: 'JSX.Element', def: '—', desc: 'stepper.props.plusIcon' },
      { name: 'class', type: 'string', def: '—', desc: 'stepper.props.class' },
      { name: 'style', type: 'Record<string, string>', def: '—', desc: 'stepper.props.style' },
    ],
  }];
  const cssVarsTables: TableSection[] = [{
    title: 'Stepper',
    rows: [
      { name: '--sc-stepper-button-size', type: 'length', def: '32px', desc: 'stepper.cssVars.--sc-stepper-button-size' },
      { name: '--sc-stepper-input-width', type: 'length', def: '50px', desc: 'stepper.cssVars.--sc-stepper-input-width' },
      { name: '--sc-stepper-input-height', type: 'length', def: '32px', desc: 'stepper.cssVars.--sc-stepper-input-height' },
      { name: '--sc-stepper-radius', type: 'length', def: '4px', desc: 'stepper.cssVars.--sc-stepper-radius' },
      { name: '--sc-stepper-button-bg', type: 'color', def: '#f7f8fa', desc: 'stepper.cssVars.--sc-stepper-button-bg' },
      { name: '--sc-stepper-button-color', type: 'color', def: '#323233', desc: 'stepper.cssVars.--sc-stepper-button-color' },
      { name: '--sc-stepper-button-border', type: 'color', def: '#ebedf0', desc: 'stepper.cssVars.--sc-stepper-button-border' },
      { name: '--sc-stepper-disabled-opacity', type: 'number', def: '0.5', desc: 'stepper.cssVars.--sc-stepper-disabled-opacity' },
    ],
  }];
  return { propsTables, cssVarsTables };
}
