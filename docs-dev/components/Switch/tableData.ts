import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useSwitchTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'checked', type: 'boolean', def: '—', desc: 'switch.props.checked' },
      { name: 'value', type: 'boolean', def: '—', desc: 'switch.props.value' },
      { name: 'defaultChecked', type: 'boolean', def: 'false', desc: 'switch.props.defaultChecked' },
      { name: 'onChange', type: '(checked: boolean) => void', def: '—', desc: 'switch.props.onChange' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'switch.props.disabled' },
      { name: 'size', type: 'string | number', def: '28', desc: 'switch.props.size' },
      { name: 'activeColor', type: 'string', def: '—', desc: 'switch.props.activeColor' },
      { name: 'inactiveColor', type: 'string', def: '—', desc: 'switch.props.inactiveColor' },
      { name: 'activeText', type: 'string', def: '—', desc: 'switch.props.activeText' },
      { name: 'inactiveText', type: 'string', def: '—', desc: 'switch.props.inactiveText' },
      { name: 'class', type: 'string', def: '—', desc: 'switch.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'switch.props.style' },
      { name: 'id', type: 'string', def: '—', desc: 'switch.props.id' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Switch',
    rows: [
      { name: '--sc-switch-width', type: 'length', def: '2em', desc: 'switch.cssVars.--sc-switch-width' },
      { name: '--sc-switch-height', type: 'length', def: '1em', desc: 'switch.cssVars.--sc-switch-height' },
      { name: '--sc-switch-node-size', type: 'length', def: '0.8em', desc: 'switch.cssVars.--sc-switch-node-size' },
      { name: '--sc-switch-bg', type: 'color', def: '—', desc: 'switch.cssVars.--sc-switch-bg' },
      { name: '--sc-switch-checked-bg', type: 'color', def: '—', desc: 'switch.cssVars.--sc-switch-checked-bg' },
      { name: '--sc-switch-node-bg', type: 'color', def: '#fff', desc: 'switch.cssVars.--sc-switch-node-bg' },
      { name: '--sc-switch-disabled-opacity', type: 'number', def: '0.5', desc: 'switch.cssVars.--sc-switch-disabled-opacity' },
      { name: '--sc-switch-transition', type: 'time', def: '0.3s', desc: 'switch.cssVars.--sc-switch-transition' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
