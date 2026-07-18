import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useEmptyTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const EmptyDocPage = () => {
  const t = useT();
  const { propsTables } = useEmptyTableData();

  const demos: DemoCode[] = [
    {
      title: t('empty.demo.preset'),
      code: '<Empty description="No data" />\n<Empty description="Network error" image="network" />\n<Empty description="No results found" image="search" />',
      desc: t('empty.demoDesc.preset'),
    },
    {
      title: t('empty.demo.custom'),
      code: '<Empty\n  image={<div style={{ fontSize: "3rem" }}>📭</div>}\n  description="Your cart is empty"\n>\n  <Button type="primary" size="sm">Go shopping</Button>\n</Empty>',
      desc: t('empty.demoDesc.custom'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Empty</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('empty.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
