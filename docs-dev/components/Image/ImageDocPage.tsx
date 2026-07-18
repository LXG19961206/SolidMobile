import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useImageTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const ImageDocPage = () => {
  const t = useT();
  const { propsTables } = useImageTableData();

  const demos: DemoCode[] = [
    {
      title: t('image.demo.basic'),
      code: '<Image src="./logo.jpg" width={100} height={100} fit="cover" radius={16} />\n<Image src="./photo.jpg" width={300} height={200} />',
      desc: t('image.demoDesc.basic'),
    },
    {
      title: t('image.demo.fit'),
      code: '<Image src="./demo-photo.jpg" width={100} height={100} fit="cover" />\n<Image src="./demo-photo.jpg" width={100} height={100} fit="contain" />\n<Image src="./demo-photo.jpg" width={100} height={100} fit="fill" />',
      desc: t('image.demoDesc.fit'),
    },
    {
      title: t('image.demo.shape'),
      code: '<Image src="./react-logo.png" width={60} height={60} radius={4} />\n<Image src="./react-logo.png" width={60} height={60} radius={12} />\n<Image src="./react-logo.png" width={60} height={60} round />',
      desc: t('image.demoDesc.shape'),
    },
    {
      title: t('image.demo.block'),
      code: '<Image src="./vue-logo.png" block fit="cover" radius={8} />',
      desc: t('image.demoDesc.block'),
    },
    {
      title: t('image.demo.state'),
      code: '<Image src="./photo.jpg" width={200} height={150}\n  placeholder={<div>Loading...</div>} />\n<Image src="invalid.jpg" width={200} height={150}\n  fallback={<div>Load failed</div>} />',
      desc: t('image.demoDesc.state'),
    },
    {
      title: t('image.demo.preview'),
      code: '<Image src="./solid-logo.png" width={80} height={80} round preview />\n<Image src="./vue-logo.png" width={80} height={80} round preview />',
      desc: t('image.demoDesc.preview'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Image</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('image.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
