import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useEmptyTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'description', type: 'string', def: '—', desc: 'empty.props.description' },
      { name: 'image', type: "'default' | 'network' | 'search' | JSX.Element", def: "'default'", desc: 'empty.props.image' },
      { name: 'children', type: 'JSX.Element', def: '—', desc: 'empty.props.children' },
      { name: 'class', type: 'string', def: '—', desc: 'empty.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'empty.props.style' },
    ],
  }];

  return { propsTables };
}
