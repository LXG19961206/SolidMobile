import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useEllipsisTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const EllipsisDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useEllipsisTableData();

  const demos: DemoCode[] = [
    {
      title: t('ellipsis.demo.basic'),
      code: '<Ellipsis>Long text that needs to be truncated...</Ellipsis>',
      desc: t('ellipsis.demoDesc.basic'),
    },
    {
      title: t('ellipsis.demo.multi'),
      code: '<Ellipsis lines={3}>\n  Multi-line text content that will be\n  truncated after the third line...\n</Ellipsis>',
      desc: t('ellipsis.demoDesc.multi'),
    },
    {
      title: t('ellipsis.demo.expand'),
      code: '<Ellipsis lines={2} expandable>\n  Long text that can be expanded\n  to show full content\n</Ellipsis>',
      desc: t('ellipsis.demoDesc.expand'),
    },
    {
      title: t('ellipsis.demo.custom'),
      code: '<Ellipsis\n  lines={2}\n  expandable\n  expandElement={<span>▼ More</span>}\n  collapseElement={<span>▲ Less</span>}\n>\n  Text with custom expand/collapse\n  button content\n</Ellipsis>',
      desc: t('ellipsis.demoDesc.custom'),
    },
    {
      title: t('ellipsis.demo.controlled'),
      code: 'const [expanded, setExpanded] = createSignal(false);\n\n<Button onClick={() => setExpanded(v => !v)}>\n  {expanded() ? "Collapse" : "Expand"}\n</Button>\n\n<Ellipsis\n  lines={2}\n  expandable\n  expanded={expanded()}\n  onExpandChange={setExpanded}\n  showAction={false}\n>\n  {longText}\n</Ellipsis>',
      desc: t('ellipsis.demoDesc.controlled'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Ellipsis</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('ellipsis.intro')}</p>

        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
