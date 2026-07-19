import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useCascaderTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'options', type: 'CascaderOption[]', def: '—', desc: 'cascader.props.options' },
      { name: 'value', type: '(string | number)[]', def: '—', desc: 'cascader.props.value' },
      { name: 'onChange', type: '(value: (string | number)[]) => void', def: '—', desc: 'cascader.props.onChange' },
      { name: 'title', type: 'string | JSX.Element', def: '—', desc: 'cascader.props.title' },
      { name: 'placeholder', type: 'string', def: '—', desc: 'cascader.props.placeholder' },
      { name: 'closeable', type: 'boolean', def: 'false', desc: 'cascader.props.closeable' },
      { name: 'show', type: 'boolean', def: '—', desc: 'cascader.props.show' },
      { name: 'onUpdateShow', type: '(show: boolean) => void', def: '—', desc: 'cascader.props.onUpdateShow' },
      { name: 'onClose', type: '() => void', def: '—', desc: 'cascader.props.onClose' },
      { name: 'maxHeight', type: 'number | string', def: "'40vh'", desc: 'cascader.props.maxHeight' },
      { name: 'showCheckmark', type: 'boolean', def: 'true', desc: 'cascader.props.showCheckmark' },
      { name: 'checkmark', type: 'JSX.Element', def: '—', desc: 'cascader.props.checkmark' },
      { name: 'teleport', type: 'string | Element', def: 'document.body', desc: 'cascader.props.teleport' },
      { name: 'zIndex', type: 'number | string', def: '2000', desc: 'cascader.props.zIndex' },
      { name: 'name', type: 'string', def: '—', desc: 'cascader.props.name' },
      { name: 'required', type: 'boolean', def: '—', desc: 'cascader.props.required' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'cascader.props.disabled' },
      { name: 'readonly', type: 'boolean', def: 'false', desc: 'cascader.props.readonly' },
      { name: 'onLoadChildren', type: '(option: CascaderOption) => Promise<CascaderOption[]>', def: '—', desc: 'cascader.props.onLoadChildren' },
      { name: 'loading', type: 'JSX.Element', def: '—', desc: 'cascader.props.loading' },
      { name: 'onFocus', type: '() => void', def: '—', desc: 'cascader.props.onFocus' },
      { name: 'onBlur', type: '() => void', def: '—', desc: 'cascader.props.onBlur' },
      { name: 'class', type: 'string', def: '—', desc: 'cascader.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'cascader.props.style' },
    ],
  }];

  const optionTables: TableSection[] = [{
    title: 'CascaderOption',
    rows: [
      { name: 'text', type: 'string', def: '—', desc: 'cascader.optionProps.text' },
      { name: 'value', type: 'string | number', def: '—', desc: 'cascader.optionProps.value' },
      { name: 'children', type: 'CascaderOption[]', def: '—', desc: 'cascader.optionProps.children' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'cascader.optionProps.disabled' },
      { name: 'isLeaf', type: 'boolean', def: 'false', desc: 'cascader.optionProps.isLeaf' },
      { name: 'render', type: 'JSX.Element', def: '—', desc: 'cascader.optionProps.render' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Cascader',
    rows: [
      { name: '--sc-cascader-bg', type: 'color', def: '#fff', desc: 'cascader.cssVars.--sc-cascader-bg' },
      { name: '--sc-cascader-header-height', type: 'length', def: '48px', desc: 'cascader.cssVars.--sc-cascader-header-height' },
      { name: '--sc-cascader-tab-height', type: 'length', def: '44px', desc: 'cascader.cssVars.--sc-cascader-tab-height' },
      { name: '--sc-cascader-item-height', type: 'length', def: '48px', desc: 'cascader.cssVars.--sc-cascader-item-height' },
      { name: '--sc-cascader-text-color', type: 'color', def: '#1f2937', desc: 'cascader.cssVars.--sc-cascader-text-color' },
      { name: '--sc-cascader-text-secondary', type: 'color', def: '#6b7280', desc: 'cascader.cssVars.--sc-cascader-text-secondary' },
      { name: '--sc-cascader-active-color', type: 'color', def: 'var(--sc-color-primary, #1677ff)', desc: 'cascader.cssVars.--sc-cascader-active-color' },
      { name: '--sc-cascader-border', type: 'color', def: '#f3f4f6', desc: 'cascader.cssVars.--sc-cascader-border' },
      { name: '--sc-cascader-radius', type: 'length', def: '12px', desc: 'cascader.cssVars.--sc-cascader-radius' },
      { name: '--sc-cascader-shadow', type: 'shadow', def: '0 -4px 20px rgba(0,0,0,0.1)', desc: 'cascader.cssVars.--sc-cascader-shadow' },
    ],
  }];

  return { propsTables, optionTables, cssVarsTables };
}
