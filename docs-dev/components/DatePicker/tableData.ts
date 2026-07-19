import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useDatePickerTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'value', type: 'string', def: '—', desc: 'datepicker.props.value' },
      { name: 'onChange', type: '(value: string) => void', def: '—', desc: 'datepicker.props.onChange' },
      { name: 'onConfirm', type: '(value: string) => void', def: '—', desc: 'datepicker.props.onConfirm' },
      { name: 'onCancel', type: '() => void', def: '—', desc: 'datepicker.props.onCancel' },
      { name: 'type', type: "'date' | 'year-month' | 'datetime'", def: "'date'", desc: 'datepicker.props.type' },
      { name: 'startDate', type: 'string', def: "'2014-01-01'", desc: 'datepicker.props.startDate' },
      { name: 'endDate', type: 'string', def: "'2034-12-31'", desc: 'datepicker.props.endDate' },
      { name: 'placeholder', type: 'string', def: '—', desc: 'datepicker.props.placeholder' },
      { name: 'disabledDate', type: '(year: number, month: number, day: number) => boolean', def: '—', desc: 'datepicker.props.disabledDate' },
      { name: 'show', type: 'boolean', def: '—', desc: 'datepicker.props.show' },
      { name: 'onUpdateShow', type: '(show: boolean) => void', def: '—', desc: 'datepicker.props.onUpdateShow' },
      { name: 'title', type: 'string', def: '—', desc: 'datepicker.props.title' },
      { name: 'cancelText', type: 'string', def: '—', desc: 'datepicker.props.cancelText' },
      { name: 'confirmText', type: 'string', def: '—', desc: 'datepicker.props.confirmText' },
      { name: 'visibleItemCount', type: 'number', def: '7', desc: 'datepicker.props.visibleItemCount' },
      { name: 'optionHeight', type: 'number', def: '50', desc: 'datepicker.props.optionHeight' },
      { name: 'teleport', type: 'string | Element', def: 'document.body', desc: 'datepicker.props.teleport' },
      { name: 'zIndex', type: 'number | string', def: '—', desc: 'datepicker.props.zIndex' },
      { name: 'class', type: 'string', def: '—', desc: 'datepicker.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'datepicker.props.style' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'DatePicker (inherits Picker vars)',
    rows: [
      { name: '--sc-picker-bg', type: 'color', def: '#fff', desc: 'datepicker.cssVars.--sc-picker-bg' },
      { name: '--sc-picker-header-height', type: 'length', def: '50px', desc: 'datepicker.cssVars.--sc-picker-header-height' },
      { name: '--sc-picker-item-height', type: 'length', def: '50px', desc: 'datepicker.cssVars.--sc-picker-item-height' },
      { name: '--sc-picker-visible-height', type: 'length', def: 'calc(7 * 50px)', desc: 'datepicker.cssVars.--sc-picker-visible-height' },
      { name: '--sc-picker-radius', type: 'length', def: '12px', desc: 'datepicker.cssVars.--sc-picker-radius' },
      { name: '--sc-picker-border-color', type: 'color', def: '#e5e7eb', desc: 'datepicker.cssVars.--sc-picker-border-color' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
