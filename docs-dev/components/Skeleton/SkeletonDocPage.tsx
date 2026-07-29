import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useSkeletonTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const SkeletonDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useSkeletonTableData();

  const demos: DemoCode[] = [
    {
      title: t('skeleton.demo.basic'),
      code: '<Skeleton loading={loading} rows={2}>\n  <div>Real content after loading...</div>\n</Skeleton>',
      desc: t('skeleton.demoDesc.basic'),
    },
    {
      title: t('skeleton.demo.animated'),
      code: '<Skeleton loading animated rows={3} />',
      desc: t('skeleton.demoDesc.animated'),
    },
    {
      title: t('skeleton.demo.rows'),
      code: '<Skeleton loading rows={5} />',
      desc: t('skeleton.demoDesc.rows'),
    },
    {
      title: t('skeleton.demo.shapes'),
      code: '<Skeleton loading shape="round" style={{ marginBottom: 12 }} />\n<Skeleton loading shape="square" style={{ marginBottom: 12 }} />\n<Skeleton loading shape="circle" width={48} height={48} />',
      desc: t('skeleton.demoDesc.shapes'),
    },
    {
      title: t('skeleton.demo.sizes'),
      code: '<Skeleton loading size="small" style={{ marginBottom: 8 }} />\n<Skeleton loading size="normal" style={{ marginBottom: 8 }} />\n<Skeleton loading size="large" />',
      desc: t('skeleton.demoDesc.sizes'),
    },
    {
      title: t('skeleton.demo.custom'),
      code: '<Skeleton loading width={300} height={24} rows={2} style={{ marginBottom: 12 }} />\n<Skeleton loading width="80%" height={16} rows={3} animated />',
      desc: t('skeleton.demoDesc.custom'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Skeleton</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('skeleton.intro')}</p>
        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
