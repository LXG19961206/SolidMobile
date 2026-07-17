import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useButtonTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'text', type: 'string', def: '—', desc: 'button.props.text' },
      { name: 'children', type: 'JSX.Element', def: '—', desc: 'button.props.children' },
      { name: 'type', type: 'string', def: '—', desc: 'button.props.type' },
      { name: 'variant', type: "'solid' | 'outline' | 'ghost'", def: "'solid'", desc: 'button.props.variant' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", def: "'md'", desc: 'button.props.size' },
      { name: 'block', type: 'boolean', def: 'false', desc: 'button.props.block' },
      { name: 'round', type: 'boolean', def: 'false', desc: 'button.props.round' },
      { name: 'hairline', type: 'boolean', def: 'false', desc: 'button.props.hairline' },
      { name: 'color', type: 'string', def: '—', desc: 'button.props.color' },
      { name: 'textColor', type: 'string', def: '—', desc: 'button.props.textColor' },
      { name: 'icon', type: 'string | JSX.Element', def: '—', desc: 'button.props.icon' },
      { name: 'iconPosition', type: "'left' | 'right'", def: "'left'", desc: 'button.props.iconPosition' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'button.props.disabled' },
      { name: 'loading', type: 'boolean', def: 'false', desc: 'button.props.loading' },
      { name: 'loadingText', type: 'string', def: '—', desc: 'button.props.loadingText' },
      { name: 'nativeType', type: "'button' | 'submit' | 'reset'", def: "'button'", desc: 'button.props.nativeType' },
      { name: 'href', type: 'string', def: '—', desc: 'button.props.href' },
      { name: 'target', type: 'string', def: '—', desc: 'button.props.target' },
      { name: 'onClick', type: '(e: MouseEvent) => void', def: '—', desc: 'button.props.onClick' },
      { name: 'class', type: 'string', def: '—', desc: 'button.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'button.props.style' },
      { name: 'aria-label', type: 'string', def: '—', desc: 'button.props.aria-label' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Button',
    rows: [
      { name: '--sc-color-primary', type: 'color', def: '#1677ff', desc: 'button.cssVars.--sc-color-primary' },
      { name: '--sc-color-primary-hover', type: 'color', def: '#4995ff', desc: 'button.cssVars.--sc-color-primary-hover' },
      { name: '--sc-color-primary-active', type: 'color', def: '#005ee2', desc: 'button.cssVars.--sc-color-primary-active' },
      { name: '--sc-border-radius-sm', type: 'length', def: '4px', desc: 'button.cssVars.--sc-border-radius-sm' },
      { name: '--sc-border-radius-md', type: 'length', def: '8px', desc: 'button.cssVars.--sc-border-radius-md' },
      { name: '--sc-border-radius-lg', type: 'length', def: '12px', desc: 'button.cssVars.--sc-border-radius-lg' },
      { name: '--sc-border-radius-full', type: 'length', def: '999px', desc: 'button.cssVars.--sc-border-radius-full' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
