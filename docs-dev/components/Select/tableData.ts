import { useT } from '../../doc-i18n'; import type { TableSection } from '../../doc-utils';
export function useSelectTableData() {
  const t = useT();
  const p: TableSection[] = [{ rows: [
    { name: 'options', type: '{ text, value, render? }[]', def: '—', desc: 'select.props.options' },
    { name: 'value', type: 'string | number', def: '—', desc: 'select.props.value' },
    { name: 'onChange', type: '(v: string|number) => void', def: '—', desc: 'select.props.onChange' },
    { name: 'onConfirm', type: '(v: string|number) => void', def: '—', desc: 'select.props.onConfirm' },
    { name: 'onCancel', type: '() => void', def: '—', desc: 'select.props.onCancel' },
    { name: 'show', type: 'boolean', def: '—', desc: 'select.props.show' },
    { name: 'onUpdateShow', type: '(show: boolean) => void', def: '—', desc: 'select.props.onUpdateShow' },
    { name: 'title', type: 'string', def: '—', desc: 'select.props.title' },
    { name: 'placeholder', type: 'string', def: '—', desc: 'select.props.placeholder' },
    { name: 'cancelText', type: 'string', def: '—', desc: 'select.props.cancelText' },
    { name: 'confirmText', type: 'string', def: '—', desc: 'select.props.confirmText' },
    { name: 'visibleItemCount', type: 'number', def: '7', desc: 'select.props.visibleItemCount' },
    { name: 'optionHeight', type: 'number', def: '50', desc: 'select.props.optionHeight' },
    { name: 'teleport', type: 'string | Element', def: 'document.body', desc: 'select.props.teleport' },
    { name: 'zIndex', type: 'number | string', def: '—', desc: 'select.props.zIndex' },
    { name: 'class', type: 'string', def: '—', desc: 'select.props.class' },
    { name: 'style', type: 'Record<string, string>', def: '—', desc: 'select.props.style' },
  ]}];
  const c: TableSection[] = [{ title: 'Select (inherits Picker vars)', rows: [
    { name: '--sc-picker-bg', type: 'color', def: '#fff', desc: 'select.cssVars.--sc-picker-bg' },
    { name: '--sc-picker-header-height', type: 'length', def: '50px', desc: 'select.cssVars.--sc-picker-header-height' },
    { name: '--sc-picker-item-height', type: 'length', def: '50px', desc: 'select.cssVars.--sc-picker-item-height' },
    { name: '--sc-picker-visible-height', type: 'length', def: 'calc(7*50px)', desc: 'select.cssVars.--sc-picker-visible-height' },
    { name: '--sc-picker-radius', type: 'length', def: '12px', desc: 'select.cssVars.--sc-picker-radius' },
    { name: '--sc-picker-border-color', type: 'color', def: '#e5e7eb', desc: 'select.cssVars.--sc-picker-border-color' },
  ]}];
  return { propsTables: p, cssVarsTables: c };
}
