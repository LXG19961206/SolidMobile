import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useRateTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'value', type: 'number', def: '—', desc: 'rate.props.value' },
      { name: 'onChange', type: '(value: number) => void', def: '—', desc: 'rate.props.onChange' },
      { name: 'count', type: 'number | string', def: '5', desc: 'rate.props.count' },
      { name: 'size', type: 'number | string', def: '20', desc: 'rate.props.size' },
      { name: 'gutter', type: 'number | string', def: '4', desc: 'rate.props.gutter' },
      { name: 'color', type: 'string', def: "'#ee0a24'", desc: 'rate.props.color' },
      { name: 'voidColor', type: 'string', def: "'#c8c9cc'", desc: 'rate.props.voidColor' },
      { name: 'disabledColor', type: 'string', def: "'#c8c9cc'", desc: 'rate.props.disabledColor' },
      { name: 'icon', type: 'string', def: "'star'", desc: 'rate.props.icon' },
      { name: 'voidIcon', type: 'string', def: "'star'", desc: 'rate.props.voidIcon' },
      { name: 'allowHalf', type: 'boolean', def: 'false', desc: 'rate.props.allowHalf' },
      { name: 'clearable', type: 'boolean', def: 'false', desc: 'rate.props.clearable' },
      { name: 'readonly', type: 'boolean', def: 'false', desc: 'rate.props.readonly' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'rate.props.disabled' },
      { name: 'class', type: 'string', def: '—', desc: 'rate.props.class' },
      { name: 'style', type: 'Record<string, string>', def: '—', desc: 'rate.props.style' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Rate',
    rows: [
      { name: '--sc-rate-icon-size', type: 'length', def: '20px', desc: 'rate.cssVars.--sc-rate-icon-size' },
      { name: '--sc-rate-gutter', type: 'length', def: '4px', desc: 'rate.cssVars.--sc-rate-gutter' },
      { name: '--sc-rate-color', type: 'color', def: '#ee0a24', desc: 'rate.cssVars.--sc-rate-color' },
      { name: '--sc-rate-void-color', type: 'color', def: '#c8c9cc', desc: 'rate.cssVars.--sc-rate-void-color' },
      { name: '--sc-rate-disabled-color', type: 'color', def: '#c8c9cc', desc: 'rate.cssVars.--sc-rate-disabled-color' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
