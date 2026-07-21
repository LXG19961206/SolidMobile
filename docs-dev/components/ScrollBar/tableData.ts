import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useScrollBarTableData() {
  const t = useT();
  const propsTables: TableSection[] = [{
    rows: [
      { name: 'width', type: 'string | number', def: '6', desc: 'scrollbar.props.width' },
      { name: 'color', type: 'string', def: "'#d1d5db'", desc: 'scrollbar.props.color' },
      { name: 'trackColor', type: 'string', def: 'transparent', desc: 'scrollbar.props.trackColor' },
      { name: 'direction', type: "'vertical' | 'horizontal' | 'both'", def: "'vertical'", desc: 'scrollbar.props.direction' },
      { name: 'children', type: 'JSX.Element', def: '—', desc: 'scrollbar.props.children' },
    ],
  }];
  const cssVarsTables: TableSection[] = [{
    title: 'ScrollBar',
    rows: [
      { name: '--sc-scrollbar-width', type: 'length', def: '6px', desc: 'scrollbar.cssVars.--sc-scrollbar-width' },
      { name: '--sc-scrollbar-color', type: 'color', def: '#d1d5db', desc: 'scrollbar.cssVars.--sc-scrollbar-color' },
      { name: '--sc-scrollbar-track', type: 'color', def: 'transparent', desc: 'scrollbar.cssVars.--sc-scrollbar-track' },
    ],
  }];
  return { propsTables, cssVarsTables };
}
