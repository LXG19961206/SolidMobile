import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { usePullRefreshTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const PullRefreshDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = usePullRefreshTableData();

  const demos: DemoCode[] = [
    {
      title: t('pullrefresh.demo.basic'),
      code: '<PullRefresh onRefresh={async () => {\n  await fetch("/api/refresh");\n}}>\n  <div>Content area</div>\n</PullRefresh>',
      desc: t('pullrefresh.demoDesc.basic'),
    },
    {
      title: t('pullrefresh.demo.customText'),
      code: '<PullRefresh\n  onRefresh={handleRefresh}\n  pullingText="Pull harder..."\n  loosingText="Release to refresh"\n  loadingText="Loading..."\n  successText="Done!"\n>\n  <div>Content</div>\n</PullRefresh>',
      desc: t('pullrefresh.demoDesc.customText'),
    },
    {
      title: t('pullrefresh.demo.withList'),
      code: '<List\n  data={items()}\n  pullRefresh\n  onRefresh={handleRefresh}\n>\n  {(item) => <Cell title={item} />}\n</List>',
      desc: t('pullrefresh.demoDesc.withList'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>PullRefresh</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('pullrefresh.intro')}</p>

        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
