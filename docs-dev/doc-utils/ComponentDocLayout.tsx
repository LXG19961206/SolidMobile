import { For, Show, createSignal, type JSX } from 'solid-js';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism.css';
import { Card } from '../../src/components/Card';
import { useT } from '../doc-i18n';
import styles from './ComponentDocLayout.module.css';

/* ── Types ── */

export interface TableRow {
  name: string;
  type?: string;
  def?: string;
  desc: string;
}

export interface TableSection {
  title?: string;
  rows: TableRow[];
}

export interface DemoCode {
  title: string;
  code: string;
  desc?: string;
}

export interface ComponentDocLayoutProps {
  title: string;
  intro?: string;
  propsTables?: TableSection[];
  eventsTables?: TableSection[];
  cssVarsTables?: TableSection[];
  design?: JSX.Element;
  demos?: DemoCode[];
}

/* ── Component ── */

export function ComponentDocLayout(props: ComponentDocLayoutProps) {
  const t = useT();

  return (
    <div class={styles.page}>
      <h1 class={styles.h1}>{props.title}</h1>
      <Show when={props.intro}>
        <p class={styles.intro}>{props.intro}</p>
      </Show>

      <Show when={props.propsTables && props.propsTables!.length > 0}>
        <h2 class={styles.h2}>{t('common.props')}</h2>
        <For each={props.propsTables}>
          {(section) => <SimpleTable title={section.title} rows={section.rows} />}
        </For>
      </Show>

      <Show when={props.eventsTables && props.eventsTables!.length > 0}>
        <h2 class={styles.h2}>{t('common.events')}</h2>
        <For each={props.eventsTables}>
          {(section) => <SimpleTable title={section.title} rows={section.rows} />}
        </For>
      </Show>

      <Show when={props.cssVarsTables && props.cssVarsTables!.length > 0}>
        <h2 class={styles.h2}>{t('common.cssVars')}</h2>
        <For each={props.cssVarsTables}>
          {(section) => <SimpleTable title={section.title} rows={section.rows} />}
        </For>
      </Show>

      <Show when={props.design}>
        <h2 class={styles.h2}>Design</h2>
        <div class={styles.design}>{props.design}</div>
      </Show>

      <Show when={props.demos && props.demos!.length > 0}>
        <For each={props.demos}>
          {(demo) => <DemoCodeBlock demo={demo} />}
        </For>
      </Show>
    </div>
  );
}

/* ── Demo Card + Code Block ── */

function DemoCodeBlock(props: { demo: DemoCode }) {
  const [copied, setCopied] = createSignal(false);
  const copy = () => {
    navigator.clipboard.writeText(props.demo.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <div class={styles.demoBlock}>
      <Card title={props.demo.title} subtitle={props.demo.desc}>
        <div class={styles.codeWrap}>
          <div class={styles.codeHeader}>
            <button class={styles.copyBtn} onClick={copy}>{copied() ? 'Copied!' : 'Copy Code'}</button>
          </div>
          <pre class={styles.codePre}><code innerHTML={Prism.highlight(props.demo.code, Prism.languages.jsx, 'jsx')} /></pre>
        </div>
      </Card>
    </div>
  );
}

/* ── Simple Table ── */

function SimpleTable(props: { title?: string; rows: TableRow[] }) {
  const t = useT();
  const hasTypes = () => props.rows.some(r => r.type != null);
  const hasDefaults = () => props.rows.some(r => r.def != null);

  return (
    <div class={styles.tableWrap}>
      <Show when={props.title}>
        <h4 class={styles.tableTitle}>{props.title}</h4>
      </Show>
      <table class={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <Show when={hasTypes()}><th>Type</th></Show>
            <Show when={hasDefaults()}><th>Default</th></Show>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.rows}>
            {(row) => (
              <tr>
                <td class={styles.propNameCell}><code>{row.name}</code></td>
                <Show when={hasTypes()}><td class={styles.typeCell}>{row.type ?? '—'}</td></Show>
                <Show when={hasDefaults()}><td class={styles.defaultCell}>{row.def ?? '—'}</td></Show>
                <td class={styles.descCell}>{t(row.desc)}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
