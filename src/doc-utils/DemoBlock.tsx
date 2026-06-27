import { useContext } from 'solid-js';
import { Portal } from 'solid-js/web';
import { useT } from '../i18n';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism.css';
import { PhoneTargetContext, IsMobileContext } from './DocLayout';
import styles from './DemoBlock.module.css';

export interface DemoBlockProps {
  title: string;
  desc?: string;
  code: string;
  children: any;
  /** 隐藏 Demo 区块自身的标题（Tabs 自带标题时用） */
  hideTitle?: boolean;
  /** 设为 false 可强制不进入手机模拟器（如 Toast 等全局 Portal 组件） */
  phone?: boolean;
  /** 去掉手机模拟器内的上下 padding，适合 NavBar 等需要贴顶的组件 */
  flush?: boolean;
}

/**
 * 文档 Demo 区块。
 *
 * 当外层有 DocLayout 时：标题/描述/代码在左侧，组件预览通过 Portal 进入右侧手机模拟器。
 * 无 DocLayout 时：全部原地渲染（兼容独立使用）。
 */
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

  return (
    <section class={styles.section}>
      {!props.hideTitle && <h3 class={styles.title}>{props.title}</h3>}
      {props.desc && <p class={styles.desc}>{props.desc}</p>}

      {/* Demo preview: in-phone on desktop, inline on mobile */}
      {usePhone() ? (
        <Portal mount={phoneTarget?.()!}>
          <div class={styles.phoneDemo} classList={{ [styles.flush!]: props.flush }}>
            {!props.hideTitle && <div class={styles.phoneDemoTitle}>{props.title}</div>}
            <div class={styles.phoneDemoBody}>{props.children}</div>
          </div>
        </Portal>
      ) : (
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
