import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useTabBarTableData() {
  const t = useT();

  const propsTables: TableSection[] = [
    {
      title: 'TabBar',
      rows: [
        { name: 'value', type: 'number | string', def: '—', desc: 'tabbar.props.value' },
        { name: 'defaultValue', type: 'number | string', def: '0', desc: 'tabbar.props.defaultValue' },
        { name: 'onChange', type: '(name) => void', def: '—', desc: 'tabbar.props.onChange' },
        { name: 'fixed', type: 'boolean', def: 'true', desc: 'tabbar.props.fixed' },
        { name: 'border', type: 'boolean', def: 'true', desc: 'tabbar.props.border' },
        { name: 'zIndex', type: 'number | string', def: '1', desc: 'tabbar.props.zIndex' },
        { name: 'height', type: 'number | string', def: "'50px'", desc: 'tabbar.props.height' },
        { name: 'activeColor', type: 'string', def: "'#1989fa'", desc: 'tabbar.props.activeColor' },
        { name: 'inactiveColor', type: 'string', def: "'#7d7e80'", desc: 'tabbar.props.inactiveColor' },
        { name: 'safeArea', type: 'boolean', def: 'false', desc: 'tabbar.props.safeArea' },
        { name: 'bgColor', type: 'string', def: '—', desc: 'tabbar.props.bgColor' },
        { name: 'placeholder', type: 'boolean', def: 'false', desc: 'tabbar.props.placeholder' },
        { name: 'beforeChange', type: '(name) => boolean | Promise<boolean>', def: '—', desc: 'tabbar.props.beforeChange' },
        { name: 'class', type: 'string', def: '—', desc: 'tabbar.props.class' },
        { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'tabbar.props.style' },
      ],
    },
    {
      title: 'TabBarItem',
      rows: [
        { name: 'name', type: 'number | string', def: '—', desc: 'tabbar.itemProps.name' },
        { name: 'icon', type: 'string | JSX.Element | (props: {active}) => JSX', def: '—', desc: 'tabbar.itemProps.icon' },
        { name: 'label', type: 'string', def: '—', desc: 'tabbar.itemProps.label' },
        { name: 'dot', type: 'boolean', def: 'false', desc: 'tabbar.itemProps.dot' },
        { name: 'badge', type: 'number | string', def: '—', desc: 'tabbar.itemProps.badge' },
        { name: 'badgeProps', type: 'Record<string, unknown>', def: '—', desc: 'tabbar.itemProps.badgeProps' },
        { name: 'class', type: 'string', def: '—', desc: 'tabbar.itemProps.class' },
        { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'tabbar.itemProps.style' },
      ],
    },
  ];

  return { propsTables };
}
