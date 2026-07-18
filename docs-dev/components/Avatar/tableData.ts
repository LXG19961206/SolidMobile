import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useAvatarTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'src', type: 'string', def: '—', desc: 'avatar.props.src' },
      { name: 'alt', type: 'string', def: '—', desc: 'avatar.props.alt' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number", def: "'md'", desc: 'avatar.props.size' },
      { name: 'round', type: 'boolean', def: 'true', desc: 'avatar.props.round' },
      { name: 'square', type: 'boolean | number', def: 'false', desc: 'avatar.props.square' },
      { name: 'icon', type: 'IconName', def: '—', desc: 'avatar.props.icon' },
      { name: 'text', type: 'string', def: '—', desc: 'avatar.props.text' },
      { name: 'color', type: 'string', def: '—', desc: 'avatar.props.color' },
      { name: 'class', type: 'string', def: '—', desc: 'avatar.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'avatar.props.style' },
    ],
  }];

  return { propsTables };
}
