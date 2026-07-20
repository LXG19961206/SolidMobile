import { useT } from '../../doc-i18n'; import type { TableSection } from '../../doc-utils';
export function useSliderTableData() {
  const t = useT();
  const p: TableSection[] = [{ rows: [
    { name: 'value', type: 'number | number[]', def: '—', desc: 'slider.props.value' },
    { name: 'onChange', type: '(v: number | number[]) => void', def: '—', desc: 'slider.props.onChange' },
    { name: 'min', type: 'number', def: '0', desc: 'slider.props.min' },
    { name: 'max', type: 'number', def: '100', desc: 'slider.props.max' },
    { name: 'step', type: 'number', def: '1', desc: 'slider.props.step' },
    { name: 'count', type: 'number', def: '1', desc: 'slider.props.count' },
    { name: 'barHeight', type: 'number | string', def: '4', desc: 'slider.props.barHeight' },
    { name: 'buttonSize', type: 'number | string', def: '24', desc: 'slider.props.buttonSize' },
    { name: 'activeColor', type: 'string', def: '—', desc: 'slider.props.activeColor' },
    { name: 'inactiveColor', type: 'string', def: '—', desc: 'slider.props.inactiveColor' },
    { name: 'reverse', type: 'boolean', def: 'false', desc: 'slider.props.reverse' },
    { name: 'disabled', type: 'boolean', def: 'false', desc: 'slider.props.disabled' },
    { name: 'readonly', type: 'boolean', def: 'false', desc: 'slider.props.readonly' },
    { name: 'thumbRender', type: '(v: number, i: number) => JSX|null', def: '—', desc: 'slider.props.thumbRender' },
    { name: 'class', type: 'string', def: '—', desc: 'slider.props.class' },
    { name: 'style', type: 'Record<string, string>', def: '—', desc: 'slider.props.style' },
  ]}];
  const c: TableSection[] = [{ title: 'Slider', rows: [
    { name: '--sc-slider-bar-height', type: 'length', def: '4px', desc: 'slider.cssVars.--sc-slider-bar-height' },
    { name: '--sc-slider-button-size', type: 'length', def: '24px', desc: 'slider.cssVars.--sc-slider-button-size' },
    { name: '--sc-slider-active-color', type: 'color', def: '—', desc: 'slider.cssVars.--sc-slider-active-color' },
    { name: '--sc-slider-inactive-color', type: 'color', def: '—', desc: 'slider.cssVars.--sc-slider-inactive-color' },
    { name: '--sc-slider-disabled-opacity', type: 'number', def: '0.4', desc: 'slider.cssVars.--sc-slider-disabled-opacity' },
  ]}];
  return { propsTables: p, cssVarsTables: c };
}
