import { useT } from '../../doc-i18n'; import type { TableSection } from '../../doc-utils';
export function useTextareaTableData() {
  const t = useT();
  const p: TableSection[] = [{ rows: [
    { name: 'value', type: 'string', def: '—', desc: 'textarea.props.value' },
    { name: 'onChange', type: '(value: string) => void', def: '—', desc: 'textarea.props.onChange' },
    { name: 'defaultValue', type: 'string', def: '—', desc: 'textarea.props.defaultValue' },
    { name: 'placeholder', type: 'string', def: '—', desc: 'textarea.props.placeholder' },
    { name: 'maxlength', type: 'number', def: '—', desc: 'textarea.props.maxlength' },
    { name: 'rows', type: 'number', def: '3', desc: 'textarea.props.rows' },
    { name: 'autoSize', type: 'boolean | { minRows?, maxRows? }', def: 'false', desc: 'textarea.props.autoSize' },
    { name: 'clearable', type: 'boolean', def: 'false', desc: 'textarea.props.clearable' },
    { name: 'disabled', type: 'boolean', def: 'false', desc: 'textarea.props.disabled' },
    { name: 'readonly', type: 'boolean', def: 'false', desc: 'textarea.props.readonly' },
    { name: 'showCount', type: 'boolean', def: 'false', desc: 'textarea.props.showCount' },
    { name: 'error', type: 'boolean', def: 'false', desc: 'textarea.props.error' },
    { name: 'height', type: 'string', def: '—', desc: 'textarea.props.height' },
    { name: 'onBlur', type: '(e: Event) => void', def: '—', desc: 'textarea.props.onBlur' },
    { name: 'onFocus', type: '(e: Event) => void', def: '—', desc: 'textarea.props.onFocus' },
    { name: 'onEnter', type: '(e: KeyboardEvent) => void', def: '—', desc: 'textarea.props.onEnter' },
    { name: 'onClear', type: '() => void', def: '—', desc: 'textarea.props.onClear' },
    { name: 'autofocus', type: 'boolean', def: 'false', desc: 'textarea.props.autofocus' },
    { name: 'class', type: 'string', def: '—', desc: 'textarea.props.class' },
    { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'textarea.props.style' },
    { name: 'id', type: 'string', def: '—', desc: 'textarea.props.id' },
    { name: 'name', type: 'string', def: '—', desc: 'textarea.props.name' },
  ]}];
  const c: TableSection[] = [{ title: 'Textarea', rows: [
    { name: '--sc-textarea-text-color', type: 'color', def: 'var(--sc-color-text)', desc: 'textarea.cssVars.--sc-textarea-text-color' },
    { name: '--sc-textarea-placeholder-color', type: 'color', def: 'var(--sc-color-text-secondary)', desc: 'textarea.cssVars.--sc-textarea-placeholder-color' },
    { name: '--sc-textarea-border-color', type: 'color', def: 'var(--sc-color-border)', desc: 'textarea.cssVars.--sc-textarea-border-color' },
    { name: '--sc-textarea-border-focus-color', type: 'color', def: 'var(--sc-color-primary)', desc: 'textarea.cssVars.--sc-textarea-border-focus-color' },
    { name: '--sc-textarea-disabled-opacity', type: 'number', def: '0.5', desc: 'textarea.cssVars.--sc-textarea-disabled-opacity' },
    { name: '--sc-textarea-count-font-size', type: 'length', def: '0.75rem', desc: 'textarea.cssVars.--sc-textarea-count-font-size' },
    { name: '--sc-textarea-count-color', type: 'color', def: 'var(--sc-color-text-tertiary)', desc: 'textarea.cssVars.--sc-textarea-count-color' },
    { name: '--sc-textarea-error-color', type: 'color', def: '#e01823', desc: 'textarea.cssVars.--sc-textarea-error-color' },
  ]}];
  return { propsTables: p, cssVarsTables: c };
}
