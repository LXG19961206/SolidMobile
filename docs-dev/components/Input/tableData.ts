import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useInputTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'type', type: "'text' | 'number' | 'password' | 'tel' | 'email' | 'url'", def: "'text'", desc: 'input.props.type' },
      { name: 'value', type: 'string | number', def: '—', desc: 'input.props.value' },
      { name: 'onChange', type: '(value: string) => void', def: '—', desc: 'input.props.onChange' },
      { name: 'defaultValue', type: 'string', def: '—', desc: 'input.props.defaultValue' },
      { name: 'placeholder', type: 'string', def: '—', desc: 'input.props.placeholder' },
      { name: 'maxlength', type: 'number', def: '—', desc: 'input.props.maxlength' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'input.props.disabled' },
      { name: 'readonly', type: 'boolean', def: 'false', desc: 'input.props.readonly' },
      { name: 'align', type: "'left' | 'center' | 'right'", def: "'left'", desc: 'input.props.align' },
      { name: 'clearable', type: 'boolean', def: 'false', desc: 'input.props.clearable' },
      { name: 'showPasswordToggle', type: 'boolean', def: 'false', desc: 'input.props.showPasswordToggle' },
      { name: 'showCount', type: 'boolean', def: 'false', desc: 'input.props.showCount' },
      { name: 'prefix', type: 'JSX.Element', def: '—', desc: 'input.props.prefix' },
      { name: 'suffix', type: 'JSX.Element', def: '—', desc: 'input.props.suffix' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", def: "'md'", desc: 'input.props.size' },
      { name: 'height', type: 'string', def: '—', desc: 'input.props.height' },
      { name: 'onBlur', type: '(e: Event) => void', def: '—', desc: 'input.props.onBlur' },
      { name: 'onFocus', type: '(e: Event) => void', def: '—', desc: 'input.props.onFocus' },
      { name: 'onEnter', type: '(e: KeyboardEvent) => void', def: '—', desc: 'input.props.onEnter' },
      { name: 'onClear', type: '() => void', def: '—', desc: 'input.props.onClear' },
      { name: 'error', type: 'boolean', def: 'false', desc: 'input.props.error' },
      { name: 'class', type: 'string', def: '—', desc: 'input.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'input.props.style' },
      { name: 'id', type: 'string', def: '—', desc: 'input.props.id' },
      { name: 'name', type: 'string', def: '—', desc: 'input.props.name' },
      { name: 'autofocus', type: 'boolean', def: 'false', desc: 'input.props.autofocus' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Input',
    rows: [
      { name: '--sc-input-text-color', type: 'color', def: 'var(--sc-color-text, #323233)', desc: 'input.cssVars.--sc-input-text-color' },
      { name: '--sc-input-placeholder-color', type: 'color', def: 'var(--sc-color-text-secondary, #969799)', desc: 'input.cssVars.--sc-input-placeholder-color' },
      { name: '--sc-input-disabled-opacity', type: 'number', def: '0.5', desc: 'input.cssVars.--sc-input-disabled-opacity' },
      { name: '--sc-input-gap', type: 'length', def: '6px', desc: 'input.cssVars.--sc-input-gap' },
      { name: '--sc-input-affix-color', type: 'color', def: 'var(--sc-color-text-secondary)', desc: 'input.cssVars.--sc-input-affix-color' },
      { name: '--sc-input-affix-font-size', type: 'length', def: '0.9rem', desc: 'input.cssVars.--sc-input-affix-font-size' },
      { name: '--sc-input-clear-color', type: 'color', def: 'var(--sc-color-text-tertiary)', desc: 'input.cssVars.--sc-input-clear-color' },
      { name: '--sc-input-clear-hover-color', type: 'color', def: 'var(--sc-color-text-secondary)', desc: 'input.cssVars.--sc-input-clear-hover-color' },
      { name: '--sc-input-count-font-size', type: 'length', def: '0.75rem', desc: 'input.cssVars.--sc-input-count-font-size' },
      { name: '--sc-input-count-color', type: 'color', def: 'var(--sc-color-text-tertiary)', desc: 'input.cssVars.--sc-input-count-color' },
      { name: '--sc-input-error-color', type: 'color', def: '#e01823', desc: 'input.cssVars.--sc-input-error-color' },
      { name: '--sc-input-height-sm', type: 'length', def: '32px', desc: 'input.cssVars.--sc-input-height-sm' },
      { name: '--sc-input-height-md', type: 'length', def: 'var(--sc-form-control-height, 40px)', desc: 'input.cssVars.--sc-input-height-md' },
      { name: '--sc-input-height-lg', type: 'length', def: '48px', desc: 'input.cssVars.--sc-input-height-lg' },
      { name: '--sc-input-font-size', type: 'length', def: '14px', desc: 'input.cssVars.--sc-input-font-size' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
