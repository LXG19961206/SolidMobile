import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useCityPickerTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'columns', type: 'PickerOption[]', def: '—', desc: 'citypicker.props.columns' },
      { name: 'value', type: '(string | number)[]', def: '—', desc: 'citypicker.props.value' },
      { name: 'onChange', type: '(value: (string | number)[]) => void', def: '—', desc: 'citypicker.props.onChange' },
      { name: 'onConfirm', type: '(value: (string | number)[]) => void', def: '—', desc: 'citypicker.props.onConfirm' },
      { name: 'onCancel', type: '() => void', def: '—', desc: 'citypicker.props.onCancel' },
      { name: 'placeholder', type: 'string', def: '—', desc: 'citypicker.props.placeholder' },
      { name: 'separator', type: 'string', def: "' / '", desc: 'citypicker.props.separator' },
      { name: 'show', type: 'boolean', def: '—', desc: 'citypicker.props.show' },
      { name: 'onUpdateShow', type: '(show: boolean) => void', def: '—', desc: 'citypicker.props.onUpdateShow' },
      { name: 'title', type: 'string', def: '—', desc: 'citypicker.props.title' },
      { name: 'cancelText', type: 'string', def: '—', desc: 'citypicker.props.cancelText' },
      { name: 'confirmText', type: 'string', def: '—', desc: 'citypicker.props.confirmText' },
      { name: 'visibleItemCount', type: 'number', def: '7', desc: 'citypicker.props.visibleItemCount' },
      { name: 'optionHeight', type: 'number', def: '50', desc: 'citypicker.props.optionHeight' },
      { name: 'teleport', type: 'string | Element', def: 'document.body', desc: 'citypicker.props.teleport' },
      { name: 'zIndex', type: 'number | string', def: '—', desc: 'citypicker.props.zIndex' },
      { name: 'class', type: 'string', def: '—', desc: 'citypicker.props.class' },
      { name: 'style', type: 'Record<string, string>', def: '—', desc: 'citypicker.props.style' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'CityPicker (inherits Picker vars)',
    rows: [
      { name: '--sc-picker-bg', type: 'color', def: '#fff', desc: 'citypicker.cssVars.--sc-picker-bg' },
      { name: '--sc-picker-header-height', type: 'length', def: '50px', desc: 'citypicker.cssVars.--sc-picker-header-height' },
      { name: '--sc-picker-item-height', type: 'length', def: '50px', desc: 'citypicker.cssVars.--sc-picker-item-height' },
      { name: '--sc-picker-visible-height', type: 'length', def: 'calc(7 * 50px)', desc: 'citypicker.cssVars.--sc-picker-visible-height' },
      { name: '--sc-picker-radius', type: 'length', def: '12px', desc: 'citypicker.cssVars.--sc-picker-radius' },
      { name: '--sc-picker-border-color', type: 'color', def: '#e5e7eb', desc: 'citypicker.cssVars.--sc-picker-border-color' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
