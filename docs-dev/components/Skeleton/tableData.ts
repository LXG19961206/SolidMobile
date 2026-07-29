import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useSkeletonTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'loading', type: 'boolean', def: 'false', desc: 'skeleton.props.loading' },
      { name: 'animated', type: 'boolean', def: 'false', desc: 'skeleton.props.animated' },
      { name: 'size', type: "'small' | 'normal' | 'large'", def: "'normal'", desc: 'skeleton.props.size' },
      { name: 'shape', type: "'square' | 'round' | 'circle'", def: "'round'", desc: 'skeleton.props.shape' },
      { name: 'duration', type: 'number', def: '0.6', desc: 'skeleton.props.duration' },
      { name: 'rows', type: 'number', def: '1', desc: 'skeleton.props.rows' },
      { name: 'width', type: 'string | number', def: '—', desc: 'skeleton.props.width' },
      { name: 'height', type: 'string | number', def: '—', desc: 'skeleton.props.height' },
      { name: 'children', type: 'JSX.Element', def: '—', desc: 'skeleton.props.children' },
      { name: 'class', type: 'string', def: '—', desc: 'skeleton.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'skeleton.props.style' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'CSS Custom Properties',
    rows: [
      { name: '--sc-skeleton-bg', type: 'color', def: '#e5e7eb', desc: 'skeleton.cssVars.bg' },
      { name: '--sc-skeleton-bg-dark', type: 'color', def: '#2a2d33', desc: 'skeleton.cssVars.bgDark' },
      { name: '--sc-skeleton-gap', type: 'length', def: '8px', desc: 'skeleton.cssVars.gap' },
      { name: '--sc-skeleton-duration', type: 'time', def: '0.6s', desc: 'skeleton.cssVars.duration' },
      { name: '--sc-skeleton-small-h', type: 'length', def: '12px', desc: 'skeleton.cssVars.smallH' },
      { name: '--sc-skeleton-normal-h', type: 'length', def: '18px', desc: 'skeleton.cssVars.normalH' },
      { name: '--sc-skeleton-large-h', type: 'length', def: '28px', desc: 'skeleton.cssVars.largeH' },
      { name: '--sc-skeleton-last-width', type: 'percentage', def: '60%', desc: 'skeleton.cssVars.lastWidth' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
