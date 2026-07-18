import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useLazyloadTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'active', type: 'boolean', def: '—', desc: 'lazyload.props.active' },
      { name: 'placeholder', type: 'JSX.Element', def: '—', desc: 'lazyload.props.placeholder' },
      { name: 'children', type: 'JSX.Element', def: '—', desc: 'lazyload.props.children' },
      { name: 'rootMargin', type: 'string', def: "'50px'", desc: 'lazyload.props.rootMargin' },
      { name: 'height', type: 'number | string', def: '—', desc: 'lazyload.props.height' },
      { name: 'threshold', type: 'number | number[]', def: '0', desc: 'lazyload.props.threshold' },
      { name: 'once', type: 'boolean', def: 'true', desc: 'lazyload.props.once' },
      { name: 'class', type: 'string', def: '—', desc: 'lazyload.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'lazyload.props.style' },
    ],
  }];

  return { propsTables };
}
