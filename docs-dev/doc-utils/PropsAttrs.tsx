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
  /** 隐藏 section 标题（Props / CSS Variables），由外部 Tab 控制时使用 */
  hideTitle?: boolean;
}

export function PropsAttrs(props: PropsAttrsProps) {
  const t = useT();

  const section = (sec: TableSection) => (
    <div style={{ 'margin-bottom': '12px' }}>
      <Show when={sec.title}>
        <div style={{ 'font-size': '0.8rem', 'font-weight': 600, color: '#6b7280', 'margin-bottom': '4px', padding: '0 4px' }}>{sec.title}</div>
      </Show>
      <div class={`${styles.scrollWrap}${props.compact ? ` ${styles.compact}` : ''}`}>
        <table class={styles.table}>
          <thead>
            <tr>
              <th class={styles.th}>Name</th>
              <Show when={!props.compact && hasTypes(sec.rows)}><th class={styles.th}>Type</th></Show>
              <Show when={!props.compact && hasDefaults(sec.rows)}><th class={styles.th}>Default</th></Show>
              <th class={styles.th}>Description</th>
            </tr>
          </thead>
          <tbody>
            <For each={sec.rows}>
              {(row) => (
                <tr>
                  <td class={styles.td}><span class={styles.propName}>{row.name}</span></td>
                  <Show when={!props.compact && hasTypes(sec.rows)}><td class={`${styles.td} ${styles.typeCell}`}>{row.type ?? '—'}</td></Show>
                  <Show when={!props.compact && hasDefaults(sec.rows)}><td class={`${styles.td} ${styles.defCell}`}>{row.def ?? '—'}</td></Show>
                  <td class={`${styles.td} ${styles.descCell}`}>{t(row.desc)}</td>
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
        <Show when={!props.hideTitle}>
          <h2 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '0 0 8px' }}>{t('common.props')}</h2>
        </Show>
        <For each={props.propsTables}>{(sec) => section(sec)}</For>
      </Show>

      <Show when={props.cssVarsTables && props.cssVarsTables!.length > 0}>
        <Show when={!props.hideTitle}>
          <h2 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '20px 0 8px' }}>{t('common.cssVars')}</h2>
        </Show>
        <For each={props.cssVarsTables}>{(sec) => section(sec)}</For>
      </Show>
    </div>
  );
}

function hasTypes(rows: { type?: string }[]) { return rows.some(r => r.type != null); }
function hasDefaults(rows: { def?: string }[]) { return rows.some(r => r.def != null); }
