import { For, Show } from 'solid-js';
import { useT } from '../doc-i18n';
import { Card } from '../../src/components/Card';
import type { TableSection } from './ComponentDocLayout';

interface PropsAttrsProps {
  propsTables?: TableSection[];
  cssVarsTables?: TableSection[];
  /** 移动端紧凑模式：隐藏 desc 列，默认 false */
  compact?: boolean;
}

/**
 * 属性 + CSS 变量表格。
 * 可在桌面和移动端复用，compact 模式下隐藏 Description 列。
 */
export function PropsAttrs(props: PropsAttrsProps) {
  const t = useT();

  return (
    <div style={{ padding: '12px' }}>
      <Show when={props.propsTables && props.propsTables!.length > 0}>
        <h2 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '0 0 8px' }}>{t('common.props')}</h2>
        <For each={props.propsTables}>
          {(section) => (
            <div style={{ 'margin-bottom': '12px' }}>
              <Show when={section.title}>
                <div style={{ 'font-size': '0.8rem', 'font-weight': 600, color: '#6b7280', 'margin-bottom': '4px' }}>{section.title}</div>
              </Show>
              <SimpleTable compact={props.compact} rows={section.rows} />
            </div>
          )}
        </For>
      </Show>

      <Show when={props.cssVarsTables && props.cssVarsTables!.length > 0}>
        <h2 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '20px 0 8px' }}>{t('common.cssVars')}</h2>
        <For each={props.cssVarsTables}>
          {(section) => (
            <div style={{ 'margin-bottom': '12px' }}>
              <Show when={section.title}>
                <div style={{ 'font-size': '0.8rem', 'font-weight': 600, color: '#6b7280', 'margin-bottom': '4px' }}>{section.title}</div>
              </Show>
              <SimpleTable compact={props.compact} rows={section.rows} />
            </div>
          )}
        </For>
      </Show>
    </div>
  );
}

/* ── Simple Table ── */

function SimpleTable(props: { rows: { name: string; type?: string; def?: string; desc: string }[]; compact?: boolean }) {
  const t = useT();
  const hasTypes = () => props.rows.some(r => r.type != null);
  const hasDefaults = () => props.rows.some(r => r.def != null);

  return (
    <table style={{ width: '100%', 'border-collapse': 'collapse', 'font-size': '0.8rem', border: '1px solid #e5e7eb', 'border-radius': '6px', overflow: 'hidden' }}>
      <thead>
        <tr style={{ background: '#fafafa' }}>
          <th style={{ padding: '6px 8px', 'text-align': 'left', 'border-bottom': '2px solid #e5e7eb', 'font-weight': 600, 'font-size': '0.75rem', color: '#6b7280' }}>Name</th>
          <Show when={hasTypes()}><th style={{ padding: '6px 8px', 'text-align': 'left', 'border-bottom': '2px solid #e5e7eb', 'font-weight': 600, 'font-size': '0.75rem', color: '#6b7280' }}>Type</th></Show>
          <Show when={hasDefaults()}><th style={{ padding: '6px 8px', 'text-align': 'left', 'border-bottom': '2px solid #e5e7eb', 'font-weight': 600, 'font-size': '0.75rem', color: '#6b7280' }}>Default</th></Show>
          <Show when={!props.compact}>
            <th style={{ padding: '6px 8px', 'text-align': 'left', 'border-bottom': '2px solid #e5e7eb', 'font-weight': 600, 'font-size': '0.75rem', color: '#6b7280' }}>Description</th>
          </Show>
        </tr>
      </thead>
      <tbody>
        <For each={props.rows}>
          {(row) => (
            <tr>
              <td style={{ padding: '6px 8px', 'border-bottom': '1px solid #f3f4f6' }}><code style={{ 'font-size': '0.78rem', color: '#6366f1', 'font-weight': 500 }}>{row.name}</code></td>
              <Show when={hasTypes()}><td style={{ padding: '6px 8px', 'border-bottom': '1px solid #f3f4f6', 'font-size': '0.75rem', color: '#0891b2', 'font-family': 'monospace' }}>{row.type ?? '—'}</td></Show>
              <Show when={hasDefaults()}><td style={{ padding: '6px 8px', 'border-bottom': '1px solid #f3f4f6', 'font-size': '0.75rem', color: '#9ca3af' }}>{row.def ?? '—'}</td></Show>
              <Show when={!props.compact}>
                <td style={{ padding: '6px 8px', 'border-bottom': '1px solid #f3f4f6', 'font-size': '0.78rem' }}>{t(row.desc)}</td>
              </Show>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
}
