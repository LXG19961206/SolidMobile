import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useSidebarTableData() {
  const t = useT();
  const p: TableSection[] = [{ rows: [
    { name: 'items', type: '{ key: string, title: string | JSX.Element }[]', def: '—', desc: 'sidebar.props.items' },
    { name: 'activeKey', type: 'string', def: '—', desc: 'sidebar.props.activeKey' },
    { name: 'onChange', type: '(key: string) => void', def: '—', desc: 'sidebar.props.onChange' },
    { name: 'width', type: 'string | number', def: '90', desc: 'sidebar.props.width' },
    { name: 'class', type: 'string', def: '—', desc: 'sidebar.props.class' },
    { name: 'style', type: 'Record<string, string>', def: '—', desc: 'sidebar.props.style' },
  ]}];
  const c: TableSection[] = [{ title: 'Sidebar', rows: [
    { name: '--sc-color-border', type: 'color', def: '#e5e7eb', desc: 'sidebar.cssVars.--sc-color-border' },
    { name: '--sc-color-background-secondary', type: 'color', def: '#f9fafb', desc: 'sidebar.cssVars.--sc-color-background-secondary' },
    { name: '--sc-card-bg', type: 'color', def: '#fff', desc: 'sidebar.cssVars.--sc-card-bg' },
    { name: '--sc-color-primary', type: 'color', def: '#1677ff', desc: 'sidebar.cssVars.--sc-color-primary' },
    { name: '--sc-color-text-secondary', type: 'color', def: '#6b7280', desc: 'sidebar.cssVars.--sc-color-text-secondary' },
  ]}];
  return { propsTables: p, cssVarsTables: c };
}
