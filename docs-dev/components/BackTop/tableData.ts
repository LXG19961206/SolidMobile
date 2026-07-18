import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useBackTopTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'threshold', type: 'number', def: '200', desc: 'backtop.props.threshold' },
      { name: 'target', type: 'HTMLElement', def: '—', desc: 'backtop.props.target' },
      { name: 'children', type: 'JSX.Element', def: '—', desc: 'backtop.props.children' },
      { name: 'class', type: 'string', def: '—', desc: 'backtop.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'backtop.props.style' },
    ],
  }];

  return { propsTables };
}
