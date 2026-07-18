import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useFloatingBallTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'inset', type: '{ left?, top?, right?, bottom? }', def: "{ right: 16, bottom: 24 }", desc: 'floatingball.props.inset' },
      { name: 'draggable', type: 'boolean', def: 'true', desc: 'floatingball.props.draggable' },
      { name: 'snapToEdge', type: 'boolean', def: 'true', desc: 'floatingball.props.snapToEdge' },
      { name: 'zIndex', type: 'number', def: '999', desc: 'floatingball.props.zIndex' },
      { name: 'class', type: 'string', def: '—', desc: 'floatingball.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'floatingball.props.style' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'FloatingBall',
    rows: [
      { name: '--sc-floating-ball-size', type: 'length', def: '44px', desc: 'floatingball.cssVars.--sc-floating-ball-size' },
      { name: '--sc-floating-ball-bg', type: 'color', def: '--sc-color-primary', desc: 'floatingball.cssVars.--sc-floating-ball-bg' },
      { name: '--sc-floating-ball-color', type: 'color', def: '#fff', desc: 'floatingball.cssVars.--sc-floating-ball-color' },
      { name: '--sc-floating-ball-shadow', type: 'shadow', def: '0 4px 12px rgba(0,0,0,0.2)', desc: 'floatingball.cssVars.--sc-floating-ball-shadow' },
      { name: '--sc-floating-ball-radius', type: 'length', def: '50%', desc: 'floatingball.cssVars.--sc-floating-ball-radius' },
      { name: '--sc-floating-ball-z-index', type: 'number', def: '999', desc: 'floatingball.cssVars.--sc-floating-ball-z-index' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
