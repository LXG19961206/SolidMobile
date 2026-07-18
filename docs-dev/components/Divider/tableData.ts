import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useDividerTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'direction', type: "'horizontal' | 'vertical'", def: "'horizontal'", desc: 'divider.props.direction' },
      { name: 'text', type: 'string', def: '—', desc: 'divider.props.text' },
      { name: 'dashed', type: 'boolean', def: 'false', desc: 'divider.props.dashed' },
      { name: 'color', type: 'string', def: '—', desc: 'divider.props.color' },
      { name: 'size', type: 'string | number', def: '—', desc: 'divider.props.size' },
      { name: 'class', type: 'string', def: '—', desc: 'divider.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'divider.props.style' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Divider',
    rows: [
      { name: '--sc-divider-color', type: 'color', def: '--sc-color-border', desc: 'divider.cssVars.--sc-divider-color' },
      { name: '--sc-divider-size', type: 'length', def: "'1px'", desc: 'divider.cssVars.--sc-divider-size' },
      { name: '--sc-divider-text-color', type: 'color', def: '--sc-color-text-secondary', desc: 'divider.cssVars.--sc-divider-text-color' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
