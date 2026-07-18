import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useSwipeCellTableData() {
  const t = useT();

  const propsTables: TableSection[] = [
    {
      title: 'SwipeCell',
      rows: [
        { name: 'rightActions', type: 'SwipeAction[]', def: '—', desc: 'swipecell.props.rightActions' },
        { name: 'leftActions', type: 'SwipeAction[]', def: '—', desc: 'swipecell.props.leftActions' },
        { name: 'threshold', type: 'number', def: '30', desc: 'swipecell.props.threshold' },
        { name: 'actionsWidth', type: 'number', def: '—', desc: 'swipecell.props.actionsWidth' },
        { name: 'disabled', type: 'boolean', def: 'false', desc: 'swipecell.props.disabled' },
        { name: 'onOpen', type: '() => void', def: '—', desc: 'swipecell.props.onOpen' },
        { name: 'onClose', type: '() => void', def: '—', desc: 'swipecell.props.onClose' },
        { name: 'children', type: 'JSX.Element', def: '—', desc: 'swipecell.props.children' },
        { name: 'class', type: 'string', def: '—', desc: 'swipecell.props.class' },
        { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'swipecell.props.style' },
      ],
    },
    {
      title: 'SwipeAction',
      rows: [
        { name: 'text', type: 'string', def: '—', desc: 'swipecell.actionProps.text' },
        { name: 'theme', type: "'default' | 'primary' | 'success' | 'warning' | 'danger'", def: "'default'", desc: 'swipecell.actionProps.theme' },
        { name: 'color', type: 'string', def: '—', desc: 'swipecell.actionProps.color' },
        { name: 'onClick', type: '() => void', def: '—', desc: 'swipecell.actionProps.onClick' },
        { name: 'class', type: 'string', def: '—', desc: 'swipecell.actionProps.class' },
      ],
    },
  ];

  const cssVarsTables: TableSection[] = [{
    title: 'SwipeCell',
    rows: [
      { name: '--sc-swipecell-bg', type: 'color', def: '#f8f9fb', desc: 'swipecell.cssVars.--sc-swipecell-bg' },
      { name: '--sc-swipecell-action-font-size', type: 'length', def: '0.9rem', desc: 'swipecell.cssVars.--sc-swipecell-action-font-size' },
      { name: '--sc-swipecell-action-padding', type: 'length', def: '0 16px', desc: 'swipecell.cssVars.--sc-swipecell-action-padding' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
