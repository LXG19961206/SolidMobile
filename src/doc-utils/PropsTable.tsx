import { For } from 'solid-js';
import { useT } from '../i18n';
import rawStyles from './PropsTable.module.css';
import { scopedStyle } from '../utils';
const styles = scopedStyle(rawStyles, 'sc-doc-props-table');

export interface PropRow {
  name: string;
  type: string;
  default: string;
  required: boolean;
  desc: string;
}

export interface PropsTableProps {
  rows: PropRow[];
}

/**
 * 可复用的属性表组件。desc 字段支持 i18n key（如 `component.image.props.src`），
 * 普通文本也能正常显示（翻译缺失时原样返回）。
 */
export function PropsTable(props: PropsTableProps) {
  const t = useT();

  return (
    <div class={styles.tableWrap}>
      <table class={styles.table}>
        <thead>
          <tr>
            <th>{t('common.propsTable.name')}</th>
            <th>{t('common.propsTable.type')}</th>
            <th>{t('common.propsTable.default')}</th>
            <th>{t('common.propsTable.desc')}</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.rows}>
            {(row) => (
              <tr>
                <td><code class={styles.propName}>{row.name}</code></td>
                <td><code class={styles.propType}>{row.type}</code></td>
                <td><span class={styles.propDefault}>{row.default}</span></td>
                <td>{t(row.desc)}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
