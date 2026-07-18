import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useBackTopTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const BackTopDocPage = () => {
  const t = useT();
  const { propsTables } = useBackTopTableData();

  const demos: DemoCode[] = [
    {
      title: t('backtop.demo.basic'),
      code: '<BackTop threshold={200} />\n\n<CellGroup>\n  <For each={items}>{(item) =>\n    <Cell title={item.name} />\n  }</For>\n</CellGroup>',
      desc: t('backtop.demoDesc.basic'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>BackTop</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('backtop.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
