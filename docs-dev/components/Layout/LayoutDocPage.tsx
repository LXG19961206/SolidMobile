import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useLayoutTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const LayoutDocPage = () => {
  const t = useT();
  const { propsTables } = useLayoutTableData();

  const demos: DemoCode[] = [
    {
      title: t('layout.demo.grid'),
      code: '<Row gap={8}>\n  <Col span={12}><div>span=12</div></Col>\n  <Col span={12}><div>span=12</div></Col>\n</Row>\n<Row gap={8}>\n  <Col span={8}><div>span=8</div></Col>\n  <Col span={8}><div>span=8</div></Col>\n  <Col span={8}><div>span=8</div></Col>\n</Row>',
      desc: t('layout.demoDesc.grid'),
    },
    {
      title: t('layout.demo.offset'),
      code: '<Row gap={8}>\n  <Col span={8}><div>span=8</div></Col>\n  <Col span={8} offset={8}><div>span=8 offset=8</div></Col>\n</Row>',
      desc: t('layout.demoDesc.offset'),
    },
    {
      title: t('layout.demo.align'),
      code: '<Row gap={16} justify="between">\n  <Col span={4}><div>Left</div></Col>\n  <Col span={4}><div>Right</div></Col>\n</Row>\n<Row gap={8} justify="center">\n  <Col span={5}><div>Center</div></Col>\n  <Col span={5}><div>Center</div></Col>\n</Row>',
      desc: t('layout.demoDesc.align'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Layout</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('layout.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
