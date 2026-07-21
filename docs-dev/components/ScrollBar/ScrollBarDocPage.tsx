import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useScrollBarTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const ScrollBarDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useScrollBarTableData();

  const demos: DemoCode[] = [
    { title: t('scrollbar.demo.basic'), code: '<ScrollBar height={200}>\n  <div>Long content that overflows...</div>\n</ScrollBar>', desc: t('scrollbar.demoDesc.basic') },
    { title: t('scrollbar.demo.color'), code: '<ScrollBar height={200} color="#1677ff" width={8}>\n  <div>Blue scrollbar</div>\n</ScrollBar>', desc: t('scrollbar.demoDesc.color') },
    { title: t('scrollbar.demo.width'), code: '<ScrollBar height={200} width={4}>\n  <div>Thinner scrollbar</div>\n</ScrollBar>', desc: t('scrollbar.demoDesc.width') },
    { title: t('scrollbar.demo.list'), code: '<ScrollBar height={380}>\n  <List virtual itemHeight={56} data={genItems(0, 1000)} finished>\n    {(item) => <Cell title={item.name} />}\n  </List>\n</ScrollBar>', desc: t('scrollbar.demoDesc.list') },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>ScrollBar</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('scrollbar.intro')}</p>
        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
