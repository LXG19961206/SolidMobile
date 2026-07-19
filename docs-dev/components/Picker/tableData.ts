import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function usePickerTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'columns', type: 'PickerOption[] | PickerOption[][]', def: '—', desc: 'picker.props.columns' },
      { name: 'value', type: '(string | number)[]', def: '—', desc: 'picker.props.value' },
      { name: 'onChange', type: '(values) => void', def: '—', desc: 'picker.props.onChange' },
      { name: 'onConfirm', type: '(items, values) => void', def: '—', desc: 'picker.props.onConfirm' },
      { name: 'onCancel', type: '() => void', def: '—', desc: 'picker.props.onCancel' },
      { name: 'show', type: 'boolean', def: '—', desc: 'picker.props.show' },
      { name: 'onUpdateShow', type: '(show) => void', def: '—', desc: 'picker.props.onUpdateShow' },
      { name: 'title', type: 'string', def: '—', desc: 'picker.props.title' },
      { name: 'cancelText', type: 'string', def: '—', desc: 'picker.props.cancelText' },
      { name: 'confirmText', type: 'string', def: '—', desc: 'picker.props.confirmText' },
      { name: 'visibleItemCount', type: 'number', def: '7', desc: 'picker.props.visibleItemCount' },
      { name: 'optionHeight', type: 'number', def: '50', desc: 'picker.props.optionHeight' },
      { name: 'ratio', type: 'number', def: '1.5', desc: 'picker.props.ratio' },
      { name: 'swipeDuration', type: 'number', def: '1', desc: 'picker.props.swipeDuration' },
      { name: 'teleport', type: 'string | Element', def: '—', desc: 'picker.props.teleport' },
      { name: 'zIndex', type: 'number | string', def: '—', desc: 'picker.props.zIndex' },
      { name: 'placeholders', type: 'string | string[]', def: '—', desc: 'picker.props.placeholders' },
      { name: 'class', type: 'string', def: '—', desc: 'picker.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'picker.props.style' },
    ],
  }];

  const optionTables: TableSection[] = [{
    title: 'PickerOption',
    rows: [
      { name: 'text', type: 'string | number', def: '—', desc: 'picker.optionProps.text' },
      { name: 'value', type: 'string | number', def: '—', desc: 'picker.optionProps.value' },
      { name: 'children', type: 'PickerOption[]', def: '—', desc: 'picker.optionProps.children' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'picker.optionProps.disabled' },
      { name: 'className', type: 'string', def: '—', desc: 'picker.optionProps.className' },
      { name: 'render', type: 'JSX.Element', def: '—', desc: 'picker.optionProps.render' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Picker',
    rows: [
      { name: '--sc-picker-bg', type: 'color', def: '#fff', desc: 'picker.cssVars.--sc-picker-bg' },
      { name: '--sc-picker-header-height', type: 'length', def: '50px', desc: 'picker.cssVars.--sc-picker-header-height' },
      { name: '--sc-picker-item-height', type: 'length', def: '50px', desc: 'picker.cssVars.--sc-picker-item-height' },
      { name: '--sc-picker-visible-height', type: 'length', def: 'calc(7 * 50px)', desc: 'picker.cssVars.--sc-picker-visible-height' },
      { name: '--sc-picker-radius', type: 'length', def: '12px', desc: 'picker.cssVars.--sc-picker-radius' },
      { name: '--sc-picker-border-color', type: 'color', def: '#e5e7eb', desc: 'picker.cssVars.--sc-picker-border-color' },
    ],
  }];

  return { propsTables, optionTables, cssVarsTables };
}
