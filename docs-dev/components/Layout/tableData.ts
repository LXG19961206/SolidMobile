import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useLayoutTableData() {
  const t = useT();

  const propsTables: TableSection[] = [
    {
      title: 'Row',
      rows: [
        { name: 'gap', type: 'string | number', def: '—', desc: 'layout.props.rowGap' },
        { name: 'align', type: "'start' | 'center' | 'end' | 'stretch' | 'baseline'", def: '—', desc: 'layout.props.rowAlign' },
        { name: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'", def: '—', desc: 'layout.props.rowJustify' },
        { name: 'wrap', type: 'boolean', def: 'false', desc: 'layout.props.rowWrap' },
        { name: 'class', type: 'string', def: '—', desc: 'layout.props.class' },
        { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'layout.props.style' },
      ],
    },
    {
      title: 'Col',
      rows: [
        { name: 'span', type: 'number (1-24)', def: '—', desc: 'layout.props.colSpan' },
        { name: 'offset', type: 'number (1-24)', def: '—', desc: 'layout.props.colOffset' },
        { name: 'class', type: 'string', def: '—', desc: 'layout.props.class' },
        { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'layout.props.style' },
      ],
    },
  ];

  return { propsTables };
}
