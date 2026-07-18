import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useSafeAreaTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'position', type: "'top' | 'bottom'", def: "'bottom'", desc: 'safearea.props.position' },
      { name: 'class', type: 'string', def: '—', desc: 'safearea.props.class' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'SafeArea',
    rows: [
      { name: '--sc-safe-area-top', type: 'length', def: 'env(safe-area-inset-top, 0px)', desc: 'safearea.cssVars.--sc-safe-area-top' },
      { name: '--sc-safe-area-bottom', type: 'length', def: 'env(safe-area-inset-bottom, 0px)', desc: 'safearea.cssVars.--sc-safe-area-bottom' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
