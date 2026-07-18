import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useBadgeTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'content', type: 'string | number', def: '—', desc: 'badge.props.content' },
      { name: 'dot', type: 'boolean', def: 'false', desc: 'badge.props.dot' },
      { name: 'max', type: 'number', def: '—', desc: 'badge.props.max' },
      { name: 'position', type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'", def: "'top-right'", desc: 'badge.props.position' },
      { name: 'color', type: 'string', def: '—', desc: 'badge.props.color' },
      { name: 'class', type: 'string', def: '—', desc: 'badge.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'badge.props.style' },
    ],
  }];

  return { propsTables };
}
