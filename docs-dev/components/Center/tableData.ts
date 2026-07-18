import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useCenterTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'flexX', type: 'boolean', def: '—', desc: 'center.props.flexX' },
      { name: 'flexY', type: 'boolean', def: '—', desc: 'center.props.flexY' },
      { name: 'text', type: 'boolean', def: '—', desc: 'center.props.text' },
      { name: 'vertical', type: 'boolean', def: '—', desc: 'center.props.vertical' },
      { name: 'position', type: 'boolean', def: '—', desc: 'center.props.position' },
      { name: 'inline', type: 'boolean', def: 'false', desc: 'center.props.inline' },
      { name: 'as', type: 'string', def: "'div'", desc: 'center.props.as' },
      { name: 'class', type: 'string', def: '—', desc: 'center.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'center.props.style' },
    ],
  }];

  return { propsTables };
}
