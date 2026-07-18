import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useTabsTableData() {
  const t = useT();

  const propsTables: TableSection[] = [
    {
      title: 'Tabs',
      rows: [
        { name: 'active', type: 'number | string', def: '—', desc: 'tabs.props.active' },
        { name: 'defaultActive', type: 'number | string', def: '—', desc: 'tabs.props.defaultActive' },
        { name: 'onChange', type: '(name) => void', def: '—', desc: 'tabs.props.onChange' },
        { name: 'type', type: "'line' | 'card'", def: "'line'", desc: 'tabs.props.type' },
        { name: 'color', type: 'string', def: '—', desc: 'tabs.props.color' },
        { name: 'background', type: 'string', def: '—', desc: 'tabs.props.background' },
        { name: 'duration', type: 'number', def: '0.3', desc: 'tabs.props.duration' },
        { name: 'animated', type: 'boolean', def: 'false', desc: 'tabs.props.animated' },
        { name: 'border', type: 'boolean', def: 'false', desc: 'tabs.props.border' },
        { name: 'sticky', type: 'boolean', def: 'false', desc: 'tabs.props.sticky' },
        { name: 'lazyRender', type: 'boolean', def: 'true', desc: 'tabs.props.lazyRender' },
        { name: 'titleActiveColor', type: 'string', def: '—', desc: 'tabs.props.titleActiveColor' },
        { name: 'titleInactiveColor', type: 'string', def: '—', desc: 'tabs.props.titleInactiveColor' },
        { name: 'centered', type: 'boolean', def: 'false', desc: 'tabs.props.centered' },
      { name: 'beforeChange', type: '(name) => boolean | Promise<boolean>', def: '—', desc: 'tabs.props.beforeChange' },
        { name: 'class', type: 'string', def: '—', desc: 'tabs.props.class' },
        { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'tabs.props.style' },
      ],
    },
    {
      title: 'Tab',
      rows: [
        { name: 'title', type: 'string | JSX.Element', def: '—', desc: 'tabs.tabProps.title' },
        { name: 'name', type: 'number | string', def: '—', desc: 'tabs.tabProps.name' },
        { name: 'disabled', type: 'boolean', def: 'false', desc: 'tabs.tabProps.disabled' },
        { name: 'children', type: 'JSX.Element', def: '—', desc: 'tabs.tabProps.children' },
      ],
    },
  ];

  return { propsTables };
}
