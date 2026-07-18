import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useTagTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'type', type: "'primary' | 'success' | 'warning' | 'danger' | 'info'", def: "'primary'", desc: 'tag.props.type' },
      { name: 'variant', type: "'solid' | 'outline'", def: "'solid'", desc: 'tag.props.variant' },
      { name: 'size', type: "'sm' | 'md'", def: "'md'", desc: 'tag.props.size' },
      { name: 'round', type: 'boolean', def: 'false', desc: 'tag.props.round' },
      { name: 'closeable', type: 'boolean', def: 'false', desc: 'tag.props.closeable' },
      { name: 'onClose', type: '() => void', def: '—', desc: 'tag.props.onClose' },
      { name: 'color', type: 'string', def: '—', desc: 'tag.props.color' },
      { name: 'class', type: 'string', def: '—', desc: 'tag.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'tag.props.style' },
    ],
  }];

  return { propsTables };
}
