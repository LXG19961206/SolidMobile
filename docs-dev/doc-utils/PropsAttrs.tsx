import { For, Show } from 'solid-js';
import { useT } from '../doc-i18n';
import { scopedStyle } from '../../src/utils';
import type { TableSection } from './ComponentDocLayout';
import rawStyles from './PropsAttrs.module.css';

const styles = scopedStyle(rawStyles, 'sc-props-attrs');

interface PropsAttrsProps {
  propsTables?: TableSection[];
  cssVarsTables?: TableSection[];
  compact?: boolean;
}

export function PropsAttrs(props: PropsAttrsProps) {
  const t = useT();

  const section = (sec: TableSection) => (
    <div style={{ 'margin-bottom': '12px' }}>
      <Show when={sec.title}>
        <div style={{ 'font-size': '0.8rem', 'font-weight': 600, color: '#6b7280', 'margin-bottom': '4px', padding: '0 4px' }}>{sec.title}</div>
      </Show>
      <div class={styles.scrollWrap}>
        <table class={styles.table}>
          <thead>
            <tr>
              <th class={styles.th}>Name</th>
              <Show when={hasTypes(sec.rows)}><th class={styles.th}>Type</th></Show>
              <Show when={hasDefaults(sec.rows)}><th class={styles.th}>Default</th></Show>
              <Show when={!props.compact}><th class={styles.th}>Description</th></Show>
            </tr>
          </thead>
          <tbody>
            <For each={sec.rows}>
              {(row) => (
                <tr>
                  <td class={styles.td}><span class={styles.propName}>{row.name}</span></td>
                  <Show when={hasTypes(sec.rows)}><td class={`${styles.td} ${styles.typeCell}`}>{row.type ?? '—'}</td></Show>
                  <Show when={hasDefaults(sec.rows)}><td class={`${styles.td} ${styles.defCell}`}>{row.def ?? '—'}</td></Show>
                  <Show when={!props.compact}><td class={`${styles.td} ${styles.descCell}`}>{t(row.desc)}</td></Show>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <Show when={props.propsTables && props.propsTables!.length > 0}>
        <h2 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '0 0 8px' }}>{t('common.props')}</h2>
        <For each={props.propsTables}>{(sec) => section(sec)}</For>
      </Show>

      <Show when={props.cssVarsTables && props.cssVarsTables!.length > 0}>
        <h2 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '20px 0 8px' }}>{t('common.cssVars')}</h2>
        <For each={props.cssVarsTables}>{(sec) => section(sec)}</For>
      </Show>
    </div>
  );
}

function hasTypes(rows: { type?: string }[]) { return rows.some(r => r.type != null); }
function hasDefaults(rows: { def?: string }[]) { return rows.some(r => r.def != null); }
