import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useCellTableData() {
  const t = useT();

  const propsTables: TableSection[] = [
    {
      title: 'Cell',
      rows: [
        { name: 'title', type: 'string | JSX.Element', def: '—', desc: 'cell.props.title' },
        { name: 'value', type: 'string | JSX.Element', def: '—', desc: 'cell.props.value' },
        { name: 'description', type: 'string', def: '—', desc: 'cell.props.description' },
        { name: 'children', type: 'JSX.Element', def: '—', desc: 'cell.props.children' },
        { name: 'icon', type: 'IconName | JSX.Element', def: '—', desc: 'cell.props.icon' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", def: "'md'", desc: 'cell.props.size' },
        { name: 'required', type: 'boolean', def: 'false', desc: 'cell.props.required' },
        { name: 'center', type: 'boolean', def: 'false', desc: 'cell.props.center' },
        { name: 'clickable', type: 'boolean', def: 'false', desc: 'cell.props.clickable' },
        { name: 'onClick', type: '() => void', def: '—', desc: 'cell.props.onClick' },
        { name: 'class', type: 'string', def: '—', desc: 'cell.props.class' },
        { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'cell.props.style' },
      ],
    },
    {
      title: 'CellGroup',
      rows: [
        { name: 'title', type: 'string', def: '—', desc: 'cell.groupProps.title' },
        { name: 'card', type: 'boolean', def: 'false', desc: 'cell.groupProps.card' },
        { name: 'border', type: 'boolean', def: 'true', desc: 'cell.groupProps.border' },
        { name: 'children', type: 'JSX.Element', def: '—', desc: 'cell.groupProps.children' },
        { name: 'class', type: 'string', def: '—', desc: 'cell.groupProps.class' },
        { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'cell.groupProps.style' },
      ],
    },
  ];

  const cssVarsTables: TableSection[] = [{
    title: 'Cell',
    rows: [
      { name: '--sc-cell-min-height', type: 'length', def: '48px', desc: 'cell.cssVars.--sc-cell-min-height' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
