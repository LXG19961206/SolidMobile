import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useLoadingTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'text', type: 'string', def: '—', desc: 'loading.props.text' },
      { name: 'children', type: 'JSX.Element', def: '—', desc: 'loading.props.children' },
      { name: 'type', type: "'spinner' | 'circular' | 'dots'", def: "'spinner'", desc: 'loading.props.type' },
      { name: 'size', type: 'string | number', def: '—', desc: 'loading.props.size' },
      { name: 'color', type: 'string', def: '—', desc: 'loading.props.color' },
      { name: 'textColor', type: 'string', def: '—', desc: 'loading.props.textColor' },
      { name: 'vertical', type: 'boolean', def: 'false', desc: 'loading.props.vertical' },
      { name: 'overlay', type: 'boolean', def: 'false', desc: 'loading.props.overlay' },
      { name: 'icon', type: 'JSX.Element', def: '—', desc: 'loading.props.icon' },
      { name: 'class', type: 'string', def: '—', desc: 'loading.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'loading.props.style' },
    ],
  }];

  return { propsTables };
}
