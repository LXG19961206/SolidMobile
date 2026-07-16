import { createSignal } from 'solid-js';


import zhCN from '../../../i18n/ellipsis/zh-CN';
import enUS from '../../../i18n/ellipsis/en-US';
import { registerLocale } from '../../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../../doc-i18n';
import { Ellipsis } from '../../../../src/components/Ellipsis';
import { Icon } from '../../../../src/components/Icon';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import styles from './EllipsisDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'lines', type: 'number', default: '1', required: false, desc: 'componentProps.ellipsis.lines' },
  { name: 'expandable', type: 'boolean', default: 'false', required: false, desc: 'componentProps.ellipsis.expandable' },
  { name: 'expanded', type: 'boolean', default: '—', required: false, desc: 'componentProps.ellipsis.expanded' },
  { name: 'defaultExpanded', type: 'boolean', default: 'false', required: false, desc: 'componentProps.ellipsis.defaultExpanded' },
  { name: 'onExpandChange', type: '(expanded: boolean) => void', default: '—', required: false, desc: 'componentProps.ellipsis.onExpandChange' },
  { name: 'showAction', type: 'boolean', default: 'true', required: false, desc: 'componentProps.ellipsis.showAction' },
  { name: 'expandElement', type: 'JSX.Element', default: "'Expand'", required: false, desc: 'componentProps.ellipsis.expandElement' },
  { name: 'collapseElement', type: 'JSX.Element', default: "'Collapse'", required: false, desc: 'componentProps.ellipsis.collapseElement' },
  { name: 'as', type: 'string', default: "'div'", required: false, desc: 'componentProps.ellipsis.as' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.ellipsis.class' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: 'componentProps.ellipsis.style' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: 'Props' },
  { id: 'css-vars', title: 'CSS Variables' },
  { id: 'basic', title: 'Basic Usage' },
  { id: 'expandable', title: 'Expandable' },
];

const singleLineText =
  'This is a very long piece of text used to demonstrate single-line ellipsis truncation behavior in the component.';

const multiLineText =
  `In software engineering, SOLID is a mnemonic acronym for five design principles ` +
  `intended to make object-oriented designs more understandable, flexible, and maintainable. ` +
  `These principles, introduced by Robert C. Martin, are widely recognized as foundational ` +
  `guidelines for writing clean, robust code. They help developers build systems that are ` +
  `easier to extend and less prone to bugs over time.`;

export const EllipsisDocPage = () => {
  const t = useT();

  // 受控模式演示状态
  const [controlledExpanded, setControlledExpanded] = createSignal(false);

  return (
    <DocLayout>
      <div class={styles.page}>
        <h1 class={styles.h1}>Ellipsis</h1>
        <p class={styles.intro}>
          {t('componentIntro.EllipsisIntro')}
        </p>

        {/* Props */}
        <h2 id="props" class={styles.h2}>{t('common.props')}</h2>
        <PropsTable rows={propsData} />

        {/* CSS Variables */}
        <h2 id="css-vars" class={styles.h2}>{t('common.cssVars')}</h2>
        <PropsTable rows={[
          { name: '--sc-ellipsis-action-color', type: 'color', default: 'var(--sc-color-primary, #1989fa)', required: false, desc: 'cssVars.Ellipsis.__sc_ellipsis_action_color' },
          { name: '--sc-ellipsis-action-hover-opacity', type: 'number', default: '0.8', required: false, desc: 'cssVars.Ellipsis.__sc_ellipsis_action_hover_opacity' },
          { name: '--sc-ellipsis-action-gap', type: 'length', default: '2px', required: false, desc: 'cssVars.Ellipsis.__sc_ellipsis_action_gap' },
          { name: '--sc-ellipsis-action-padding', type: 'length', default: '4px', required: false, desc: 'cssVars.Ellipsis.__sc_ellipsis_action_padding' },
        ]} />

        {/* Basic Usage */}
        <h2 id="basic" class={styles.h2}>{t('section.ellipsisBasic')}</h2>

        <DemoBlock
          title={t('demo.ellipsisSingleLine')}
          desc={t('demoDesc.ellipsis_single_line')}
          code={`<Ellipsis>{text}</Ellipsis>`}
        >
          <div class={styles.demoText}>
            <Ellipsis>{singleLineText}</Ellipsis>
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.ellipsisMultiLine')}
          desc={t('demoDesc.ellipsis_multi_line')}
          code={`<Ellipsis lines={3}>\n  {text}\n</Ellipsis>`}
        >
          <div class={styles.demoText}>
            <Ellipsis lines={3}>{multiLineText}</Ellipsis>
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.ellipsisCustomTag')}
          desc={t('demoDesc.ellipsis_custom_tag')}
          code={`<Ellipsis as="span">{text}</Ellipsis>`}
        >
          <div class={styles.demoText}>
            <Ellipsis as="span">{singleLineText}</Ellipsis>
          </div>
        </DemoBlock>

        {/* Expandable */}
        <h2 id="expandable" class={styles.h2}>{t('section.ellipsisExpandable')}</h2>

        <DemoBlock
          title={t('demo.ellipsisSingleExpand')}
          desc={t('demoDesc.ellipsis_single_expand')}
          code={`<Ellipsis expandable>\n  {text}\n</Ellipsis>`}
        >
          <div class={styles.demoText}>
            <Ellipsis expandable>{singleLineText}</Ellipsis>
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.ellipsisMultiExpand')}
          desc={t('demoDesc.ellipsis_multi_expand')}
          code={`<Ellipsis lines={2} expandable>\n  {text}\n</Ellipsis>`}
        >
          <div class={styles.demoText}>
            <Ellipsis lines={2} expandable>
              {multiLineText}
            </Ellipsis>
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.ellipsisCustomExpand')}
          desc={t('demoDesc.ellipsis_custom_expand')}
          code={`<Ellipsis\n  lines={2}\n  expandable\n  expandElement={<><Icon name="arrow-down" size={14} /> More</>}\n  collapseElement={<><Icon name="arrow-up" size={14} /> Less</>}\n>\n  {text}\n</Ellipsis>`}
        >
          <div class={styles.demoText}>
            <Ellipsis
              lines={2}
              expandable
              expandElement={<span style="color:#1677ff;cursor:pointer;display:inline-flex;align-items:center;gap:2px"><Icon name="arrow-down" size={14} /> More</span>}
              collapseElement={<span style="color:#1677ff;cursor:pointer;display:inline-flex;align-items:center;gap:2px"><Icon name="arrow-up" size={14} /> Less</span>}
            >
              {multiLineText}
            </Ellipsis>
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.ellipsisControlled')}
          desc={t('demoDesc.ellipsis_controlled')}
          code={`const [expanded, setExpanded] = createSignal(false);\n\n<button onClick={() => setExpanded(v => !v)}>\n  {expanded() ? 'Collapse' : 'Expand'}\n</button>\n\n<Ellipsis\n  lines={2}\n  expandable\n  expanded={expanded()}\n  onExpandChange={setExpanded}\n  showAction={false}\n>\n  {text}\n</Ellipsis>`}
        >
          <div style="display:flex;flex-direction:column;gap:8px">
            <button
              onClick={() => setControlledExpanded(v => !v)}
              style="align-self:flex-start;padding:4px 12px;font-size:0.8rem;cursor:pointer;border:1px solid #d1d5db;border-radius:4px;background:#fff;color:#374151"
            >
              {controlledExpanded() ? 'Collapse' : 'Expand'} (external)
            </button>
            <div class={styles.demoText}>
              <Ellipsis
                lines={2}
                expandable
                expanded={controlledExpanded()}
                onExpandChange={setControlledExpanded}
                showAction={false}
              >
                {multiLineText}
              </Ellipsis>
            </div>
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.ellipsisNoOverflow')}
          desc={t('demoDesc.ellipsis_no_overflow')}
          code={`<Ellipsis lines={2} expandable>\n  Short text.\n</Ellipsis>`}
        >
          <div class={styles.demoText}>
            <Ellipsis lines={2} expandable>
              Short text — no overflow, the button will not appear.
            </Ellipsis>
          </div>
        </DemoBlock>

      </div>
    </DocLayout>
  );
};
