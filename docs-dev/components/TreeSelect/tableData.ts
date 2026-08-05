import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useTreeSelectTableData() {
  const t = useT();

  const propsTables: TableSection[] = [
    {
      rows: [
        { name: 'options', type: 'TreeSelectOption[]', def: '—', desc: 'treeselect.props.options' },
        { name: 'value', type: '(string | number)[]', def: '—', desc: 'treeselect.props.value' },
        {
          name: 'defaultValue',
          type: '(string | number)[]',
          def: '—',
          desc: 'treeselect.props.defaultValue',
        },
        {
          name: 'onChange',
          type: '(value: (string | number)[]) => void',
          def: '—',
          desc: 'treeselect.props.onChange',
        },
        { name: 'max', type: 'number', def: '0', desc: 'treeselect.props.max' },
        {
          name: 'mode',
          type: "'select' | 'expand'",
          def: "'select'",
          desc: 'treeselect.props.mode',
        },
        { name: 'searchable', type: 'boolean', def: 'false', desc: 'treeselect.props.searchable' },
        {
          name: 'searchMode',
          type: "'local' | 'global'",
          def: "'local'",
          desc: 'treeselect.props.searchMode',
        },
        {
          name: 'renderItem',
          type: '(node, selected, expand, toggle) => JSX.Element',
          def: '—',
          desc: 'treeselect.props.renderItem',
        },
        {
          name: 'onSearch',
          type: '(keyword, options) => Promise<TreeSelectOption[]> | TreeSelectOption[]',
          def: '—',
          desc: 'treeselect.props.onSearch',
        },
        { name: 'placeholder', type: 'string', def: '—', desc: 'treeselect.props.placeholder' },
        { name: 'title', type: 'string', def: '—', desc: 'treeselect.props.title' },
        { name: 'disabled', type: 'boolean', def: 'false', desc: 'treeselect.props.disabled' },
        {
          name: 'onLoadChildren',
          type: '(option) => Promise<TreeSelectOption[]>',
          def: '—',
          desc: 'treeselect.props.onLoadChildren',
        },
        { name: 'show', type: 'boolean', def: '—', desc: 'treeselect.props.show' },
        {
          name: 'onUpdateShow',
          type: '(show: boolean) => void',
          def: '—',
          desc: 'treeselect.props.onUpdateShow',
        },
        { name: 'onClose', type: '() => void', def: '—', desc: 'treeselect.props.onClose' },
        { name: 'closeable', type: 'boolean', def: 'false', desc: 'treeselect.props.closeable' },
        { name: 'swipeable', type: 'boolean', def: 'false', desc: 'treeselect.props.swipeable' },
        {
          name: 'checkboxPosition',
          type: "'left' | 'right'",
          def: "'right'",
          desc: 'treeselect.props.checkboxPosition',
        },
        { name: 'teleport', type: 'string | Element', def: '—', desc: 'treeselect.props.teleport' },
        { name: 'zIndex', type: 'number | string', def: '—', desc: 'treeselect.props.zIndex' },
        {
          name: 'maxHeight',
          type: 'number | string',
          def: "'80vh'",
          desc: 'treeselect.props.maxHeight',
        },
        { name: 'class', type: 'string', def: '—', desc: 'treeselect.props.class' },
        { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'treeselect.props.style' },
      ],
    },
  ];

  const cssVarsTables: TableSection[] = [
    {
      title: 'CSS Custom Properties',
      rows: [
        {
          name: '--sc-treeselect-trigger-padding',
          type: 'padding',
          def: '8px 12px',
          desc: 'treeselect.cssVars.triggerPadding',
        },
        {
          name: '--sc-treeselect-trigger-height',
          type: 'length',
          def: '44px',
          desc: 'treeselect.cssVars.triggerHeight',
        },
        {
          name: '--sc-treeselect-zindex',
          type: 'number',
          def: '1100',
          desc: 'treeselect.cssVars.zIndex',
        },
        { name: '--sc-treeselect-bg', type: 'color', def: '#fff', desc: 'treeselect.cssVars.bg' },
        {
          name: '--sc-treeselect-item-padding',
          type: 'padding',
          def: '12px 16px',
          desc: 'treeselect.cssVars.itemPadding',
        },
        {
          name: '--sc-treeselect-checkbox-left-margin',
          type: 'length',
          def: '8px',
          desc: 'treeselect.cssVars.checkboxLeftMargin',
        },
      ],
    },
  ];

  return { propsTables, cssVarsTables };
}
