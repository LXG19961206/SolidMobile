import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useIconTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'name', type: 'IconName', def: '—', desc: 'icon.props.name' },
      { name: 'variant', type: "'line' | 'fill'", def: "'line'", desc: 'icon.props.variant' },
      { name: 'size', type: 'string | number', def: "'1em'", desc: 'icon.props.size' },
      { name: 'color', type: 'string', def: '—', desc: 'icon.props.color' },
      { name: 'aria-label', type: 'string', def: '—', desc: 'icon.props.aria-label' },
      { name: 'class', type: 'string', def: '—', desc: 'icon.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'icon.props.style' },
      { name: 'onClick', type: '(e: MouseEvent) => void', def: '—', desc: 'icon.props.onClick' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Icon',
    rows: [
      { name: '--sc-icon-size', type: 'length', def: "'1em'", desc: 'icon.cssVars.--sc-icon-size' },
      { name: '--sc-icon-color', type: 'color', def: 'inherit', desc: 'icon.cssVars.--sc-icon-color' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
