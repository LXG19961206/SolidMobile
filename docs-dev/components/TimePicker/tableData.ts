import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useTimePickerTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'value', type: 'string', def: '—', desc: 'timepicker.props.value' },
      { name: 'onChange', type: '(value: string) => void', def: '—', desc: 'timepicker.props.onChange' },
      { name: 'onConfirm', type: '(value: string) => void', def: '—', desc: 'timepicker.props.onConfirm' },
      { name: 'onCancel', type: '() => void', def: '—', desc: 'timepicker.props.onCancel' },
      { name: 'show', type: 'boolean', def: '—', desc: 'timepicker.props.show' },
      { name: 'onUpdateShow', type: '(show: boolean) => void', def: '—', desc: 'timepicker.props.onUpdateShow' },
      { name: 'placeholder', type: 'string', def: '—', desc: 'timepicker.props.placeholder' },
      { name: 'title', type: 'string', def: '—', desc: 'timepicker.props.title' },
      { name: 'cancelText', type: 'string', def: '—', desc: 'timepicker.props.cancelText' },
      { name: 'confirmText', type: 'string', def: '—', desc: 'timepicker.props.confirmText' },
      { name: 'showUnit', type: 'boolean', def: 'false', desc: 'timepicker.props.showUnit' },
      { name: 'units', type: '{ hour?: string; minute?: string; second?: string }', def: '—', desc: 'timepicker.props.units' },
      { name: 'visibleItemCount', type: 'number', def: '7', desc: 'timepicker.props.visibleItemCount' },
      { name: 'optionHeight', type: 'number', def: '50', desc: 'timepicker.props.optionHeight' },
      { name: 'teleport', type: 'string | Element', def: 'document.body', desc: 'timepicker.props.teleport' },
      { name: 'zIndex', type: 'number | string', def: '—', desc: 'timepicker.props.zIndex' },
      { name: 'class', type: 'string', def: '—', desc: 'timepicker.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'timepicker.props.style' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'TimePicker (inherits Picker vars)',
    rows: [
      { name: '--sc-picker-bg', type: 'color', def: '#fff', desc: 'timepicker.cssVars.--sc-picker-bg' },
      { name: '--sc-picker-header-height', type: 'length', def: '50px', desc: 'timepicker.cssVars.--sc-picker-header-height' },
      { name: '--sc-picker-item-height', type: 'length', def: '50px', desc: 'timepicker.cssVars.--sc-picker-item-height' },
      { name: '--sc-picker-visible-height', type: 'length', def: 'calc(7 * 50px)', desc: 'timepicker.cssVars.--sc-picker-visible-height' },
      { name: '--sc-picker-radius', type: 'length', def: '12px', desc: 'timepicker.cssVars.--sc-picker-radius' },
      { name: '--sc-picker-border-color', type: 'color', def: '#e5e7eb', desc: 'timepicker.cssVars.--sc-picker-border-color' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
