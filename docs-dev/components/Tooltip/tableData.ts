import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useTooltipTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'content', type: 'JSX.Element', def: '—', desc: 'tooltip.props.content' },
      { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", def: "'top'", desc: 'tooltip.props.placement' },
      { name: 'trigger', type: "'hover' | 'click' | 'focus' | 'manual'", def: "'hover'", desc: 'tooltip.props.trigger' },
      { name: 'open', type: 'boolean', def: '—', desc: 'tooltip.props.open' },
      { name: 'defaultOpen', type: 'boolean', def: 'false', desc: 'tooltip.props.defaultOpen' },
      { name: 'onOpenChange', type: '(open: boolean) => void', def: '—', desc: 'tooltip.props.onOpenChange' },
      { name: 'showArrow', type: 'boolean', def: 'true', desc: 'tooltip.props.showArrow' },
      { name: 'delay', type: 'number | { show, hide }', def: '200', desc: 'tooltip.props.delay' },
      { name: 'arrowSize', type: 'number', def: '5', desc: 'tooltip.props.arrowSize' },
      { name: 'offset', type: 'number', def: '6', desc: 'tooltip.props.offset' },
      { name: 'maxWidth', type: 'number | string', def: '—', desc: 'tooltip.props.maxWidth' },
      { name: 'closeable', type: 'boolean', def: 'false', desc: 'tooltip.props.closeable' },
      { name: 'teleport', type: 'Node | string', def: 'document.body', desc: 'tooltip.props.teleport' },
      { name: 'zIndex', type: 'number', def: '1000', desc: 'tooltip.props.zIndex' },
      { name: 'class', type: 'string', def: '—', desc: 'tooltip.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'tooltip.props.style' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Tooltip',
    rows: [
      { name: '--sc-tooltip-bg', type: 'color', def: '#1f2937', desc: 'tooltip.cssVars.--sc-tooltip-bg' },
      { name: '--sc-tooltip-color', type: 'color', def: '#fff', desc: 'tooltip.cssVars.--sc-tooltip-color' },
      { name: '--sc-tooltip-font-size', type: 'length', def: '0.8rem', desc: 'tooltip.cssVars.--sc-tooltip-font-size' },
      { name: '--sc-tooltip-padding', type: 'length', def: '6px 10px', desc: 'tooltip.cssVars.--sc-tooltip-padding' },
      { name: '--sc-tooltip-radius', type: 'length', def: '6px', desc: 'tooltip.cssVars.--sc-tooltip-radius' },
      { name: '--sc-tooltip-max-width', type: 'length', def: '240px', desc: 'tooltip.cssVars.--sc-tooltip-max-width' },
      { name: '--sc-tooltip-arrow-size', type: 'length', def: '5px', desc: 'tooltip.cssVars.--sc-tooltip-arrow-size' },
      { name: '--sc-tooltip-z-index', type: 'number', def: '1000', desc: 'tooltip.cssVars.--sc-tooltip-z-index' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
