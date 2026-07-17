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

export function DemoCodeBlock(props: { demo: DemoCode }) {
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

