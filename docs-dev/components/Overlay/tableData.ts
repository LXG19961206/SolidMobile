import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useOverlayTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'open', type: 'boolean', def: '—', desc: 'overlay.props.open' },
      { name: 'onClose', type: '() => void', def: '—', desc: 'overlay.props.onClose' },
      { name: 'zIndex', type: 'number', def: '999', desc: 'overlay.props.zIndex' },
      { name: 'lockScroll', type: 'boolean', def: 'true', desc: 'overlay.props.lockScroll' },
      { name: 'mount', type: 'Node', def: 'document.body', desc: 'overlay.props.mount' },
      { name: 'duration', type: 'number', def: '200', desc: 'overlay.props.duration' },
      { name: 'class', type: 'string', def: '—', desc: 'overlay.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'overlay.props.style' },
    ],
  }];

  return { propsTables };
}
