import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useMarqueeTableData() {
  const t = useT();
  const propsTables: TableSection[] = [{
    rows: [
      { name: 'duration', type: 'number', def: '10', desc: 'marquee.props.duration' },
      { name: 'direction', type: "'left' | 'right'", def: "'left'", desc: 'marquee.props.direction' },
      { name: 'pauseOnHover', type: 'boolean', def: 'true', desc: 'marquee.props.pauseOnHover' },
      { name: 'gap', type: 'string | number', def: '—', desc: 'marquee.props.gap' },
      { name: 'class', type: 'string', def: '—', desc: 'marquee.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'marquee.props.style' },
      { name: 'children', type: 'JSX.Element', def: '—', desc: 'marquee.props.children' },
    ],
  }];
  const cssVarsTables: TableSection[] = [{
    title: 'Marquee',
    rows: [
      { name: '--mq-duration', type: 'time', def: '10s', desc: 'marquee.cssVars.--mq-duration' },
      { name: '--mq-direction', type: 'string', def: 'normal', desc: 'marquee.cssVars.--mq-direction' },
      { name: '--mq-gap', type: 'length', def: '0', desc: 'marquee.cssVars.--mq-gap' },
    ],
  }];
  return { propsTables, cssVarsTables };
}
