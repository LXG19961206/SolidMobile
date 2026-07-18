import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useEllipsisTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'lines', type: 'number', def: '1', desc: 'ellipsis.props.lines' },
      { name: 'expandable', type: 'boolean', def: 'false', desc: 'ellipsis.props.expandable' },
      { name: 'expanded', type: 'boolean', def: '—', desc: 'ellipsis.props.expanded' },
      { name: 'defaultExpanded', type: 'boolean', def: 'false', desc: 'ellipsis.props.defaultExpanded' },
      { name: 'onExpandChange', type: '(expanded: boolean) => void', def: '—', desc: 'ellipsis.props.onExpandChange' },
      { name: 'showAction', type: 'boolean', def: 'true', desc: 'ellipsis.props.showAction' },
      { name: 'expandElement', type: 'JSX.Element', def: '—', desc: 'ellipsis.props.expandElement' },
      { name: 'collapseElement', type: 'JSX.Element', def: '—', desc: 'ellipsis.props.collapseElement' },
      { name: 'as', type: 'string', def: "'div'", desc: 'ellipsis.props.as' },
      { name: 'class', type: 'string', def: '—', desc: 'ellipsis.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'ellipsis.props.style' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Ellipsis',
    rows: [
      { name: '--sc-ellipsis-action-color', type: 'color', def: '--sc-color-primary', desc: 'ellipsis.cssVars.--sc-ellipsis-action-color' },
      { name: '--sc-ellipsis-action-hover-opacity', type: 'number', def: '0.8', desc: 'ellipsis.cssVars.--sc-ellipsis-action-hover-opacity' },
      { name: '--sc-ellipsis-action-gap', type: 'length', def: '2px', desc: 'ellipsis.cssVars.--sc-ellipsis-action-gap' },
      { name: '--sc-ellipsis-action-padding', type: 'length', def: '4px', desc: 'ellipsis.cssVars.--sc-ellipsis-action-padding' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
