import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useCardTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'title', type: 'string', def: '—', desc: 'card.props.title' },
      { name: 'subtitle', type: 'string', def: '—', desc: 'card.props.subtitle' },
      { name: 'shadow', type: 'boolean', def: 'true', desc: 'card.props.shadow' },
      { name: 'border', type: 'boolean', def: 'true', desc: 'card.props.border' },
      { name: 'inset', type: 'boolean', def: 'false', desc: 'card.props.inset' },
      { name: 'divider', type: 'boolean', def: 'false', desc: 'card.props.divider' },
      { name: 'padding', type: 'string | number', def: '16', desc: 'card.props.padding' },
      { name: 'class', type: 'string', def: '—', desc: 'card.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'card.props.style' },
      { name: 'children', type: 'JSX.Element', def: '—', desc: 'card.props.children' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Card',
    rows: [
      { name: '--sc-card-bg', type: 'color', def: '#fff', desc: 'card.cssVars.--sc-card-bg' },
      { name: '--sc-card-border', type: 'color', def: '#ebedf0', desc: 'card.cssVars.--sc-card-border' },
      { name: '--sc-card-radius', type: 'length', def: '10px', desc: 'card.cssVars.--sc-card-radius' },
      { name: '--sc-card-padding', type: 'length', def: '16px', desc: 'card.cssVars.--sc-card-padding' },
      { name: '--sc-card-title', type: 'color', def: '#1f2937', desc: 'card.cssVars.--sc-card-title' },
      { name: '--sc-card-subtitle', type: 'color', def: '#6b7280', desc: 'card.cssVars.--sc-card-subtitle' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
