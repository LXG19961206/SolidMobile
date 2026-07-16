import { useContext, createContext, createSignal, onMount, For, onCleanup, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { useT } from '../../src/i18n';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism.css';
import { PhoneTargetContext, IsMobileContext } from './DocLayout';
import type { JSX } from 'solid-js';
import rawStyles from './DemoBlock.module.css';
import { scopedStyle } from '../../src/utils';
const styles = scopedStyle(rawStyles, 'sc-doc-demo-block');

/* ── GroupCode Context ── */

interface GroupEntry {
  title: string;      // Cell 标题 (from DemoBlock title)
  children: JSX.Element; // DemoBlock children → Cell 内容
}

// keyed by groupCode string
const GroupCodeCtx = createContext<{
  register: (code: string, entry: GroupEntry) => void;
  unregister: (code: string, title: string) => void;
}>();

// Internal: stores all registered groups
const groupStore: Record<string, GroupEntry[]> = {};
const [groupSignal, setGroupSignal] = createSignal<Record<string, GroupEntry[]>>({});

function touchSignal() {
  setGroupSignal({ ...groupStore });
}

function registerGroup(code: string, entry: GroupEntry) {
  if (!groupStore[code]) groupStore[code] = [];
  // avoid duplicate titles
  if (!groupStore[code].find(e => e.title === entry.title)) {
    groupStore[code].push(entry);
    touchSignal();
  }
}

function unregisterGroup(code: string, title: string) {
  if (groupStore[code]) {
    groupStore[code] = groupStore[code].filter(e => e.title !== title);
    if (groupStore[code].length === 0) delete groupStore[code];
    touchSignal();
  }
}

/**
 * 放在 DocLayout 内（所有 DemoBlock 下方）即可。
 * 自动收集所有带 groupCode 的 DemoBlock，按组渲染为 CellGroup。
 */
export function GroupCodePhone() {
  const phoneTarget = useContext(PhoneTargetContext);
  const isMobile = useContext(IsMobileContext);
  const groups = () => groupSignal();
  const entries = () => Object.entries(groups());

  const content = () => (
    <For each={entries()}>
      {([code, items]) => (
        <div style={{ 'margin-bottom': '1rem' }}>
          <div class={styles.phoneDemoTitle}>{code}</div>
          <div style={{ background: 'var(--sc-color-background, #fff)', 'border-radius': '8px', overflow: 'hidden', border: '1px solid var(--sc-color-border, #ebedf0)' }}>
            <For each={items}>
              {item => item.children}
            </For>
          </div>
        </div>
      )}
    </For>
  );

  const target = () => (isMobile?.() ? undefined : phoneTarget?.());

  return (
    <Show when={target()} fallback={<>{content()}</>}>
      <Portal mount={target()!}>
        <div class={styles.phoneDemo}>
          <div class={styles.phoneDemoBody}>{content()}</div>
        </div>
      </Portal>
    </Show>
  );
}

/* ── DemoBlock ── */

export interface DemoBlockProps {
  title: string;
  desc?: string;
  code: string;
  children: any;
  /** 隐藏标题 */
  hideTitle?: boolean;
  /** 仅展示左侧文档，不渲染 demo */
  codeOnly?: boolean;
  /** 设为 false 强制不进入模拟器 */
  phone?: boolean;
  /** 去掉模拟器内上下 padding */
  flush?: boolean;
  /**
   * 分组码。多个 DemoBlock 指定同一个 groupCode 时，
   * 它们在模拟器里会合并为一个 CellGroup，title 作为 Cell 标题。
   */
  groupCode?: string;
}

export function DemoBlock(props: DemoBlockProps) {
  let copyBtn!: HTMLButtonElement;
  const phoneTarget = useContext(PhoneTargetContext);
  const t = useT();

  const highlighted = () =>
    props.code ? Prism.highlight(props.code, Prism.languages.jsx, 'jsx') : '';

  const copyCode = () => {
    navigator.clipboard.writeText(props.code).then(() => {
      if (copyBtn) {
        copyBtn.textContent = t('common.copied');
        setTimeout(() => { copyBtn.textContent = t('common.copyCode'); }, 1500);
      }
    });
  };

  const isMobile = useContext(IsMobileContext);
  const usePhone = () => props.phone !== false && !!phoneTarget?.() && !isMobile?.();

  // 注册 groupCode
  onMount(() => {
    if (props.groupCode) {
      registerGroup(props.groupCode, {
        title: props.title,
        children: props.children,
      });
    }
  });

  onCleanup(() => {
    if (props.groupCode) {
      unregisterGroup(props.groupCode, props.title);
    }
  });

  const inGroup = () => !!props.groupCode;

  return (
    <section class={styles.section}>
      {!props.hideTitle && <h3 class={styles.title}>{props.title}</h3>}
      {props.desc && <p class={styles.desc}>{props.desc}</p>}

      {/* Demo: always render inline. Phone simulator shows mobile page via iframe. */}
      {!props.codeOnly && !inGroup() && (
        <div class={styles.demo}>{props.children}</div>
      )}

      <details class={styles.codeDetails} open>
        <summary class={styles.codeSummary}>
          {t('common.viewCode')}
          <button
            ref={copyBtn}
            class={styles.copyButton}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); copyCode(); }}
          >
            {t('common.copyCode')}
          </button>
        </summary>
        <pre class={styles.codePre}><code><span innerHTML={highlighted()} /></code></pre>
      </details>
    </section>
  );
}
