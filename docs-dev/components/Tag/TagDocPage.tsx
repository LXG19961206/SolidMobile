import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useTagTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const TagDocPage = () => {
  const t = useT();
  const { propsTables } = useTagTableData();

  const demos: DemoCode[] = [
    {
      title: t('tag.demo.types'),
      code: '<Tag type="primary">Primary</Tag>\n<Tag type="success">Success</Tag>\n<Tag type="warning">Warning</Tag>\n<Tag type="danger">Danger</Tag>\n<Tag type="info">Info</Tag>',
      desc: t('tag.demoDesc.types'),
    },
    {
      title: t('tag.demo.variant'),
      code: '<Tag variant="outline" round>Outline</Tag>\n<Tag type="danger" variant="outline" round>Danger</Tag>\n<Tag size="sm">Small</Tag>\n<Tag size="md">Medium</Tag>',
      desc: t('tag.demoDesc.variant'),
    },
    {
      title: t('tag.demo.size'),
      code: '<Tag size="sm" round type="danger">Small Capsule</Tag>\n<Tag round type="primary">Capsule</Tag>',
      desc: t('tag.demoDesc.size'),
    },
    {
      title: t('tag.demo.closeable'),
      code: '<Tag closeable onClose={() => {}}>Closable</Tag>\n<Tag closeable type="success">Tag 1</Tag>\n<Tag closeable type="danger">Tag 2</Tag>',
      desc: t('tag.demoDesc.closeable'),
    },
    {
      title: t('tag.demo.scenes'),
      code: '<div style="display:flex;flex-wrap:wrap;gap:6px">\n  <Tag round>Frontend</Tag>\n  <Tag type="success" round>React</Tag>\n  <Tag type="warning" round>TypeScript</Tag>\n  <Tag closeable type="primary">Beijing</Tag>\n  <Tag closeable type="primary">Frontend</Tag>\n</div>',
      desc: t('tag.demoDesc.scenes'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Tag</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('tag.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
