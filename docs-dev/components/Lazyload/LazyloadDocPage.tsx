import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useLazyloadTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const LazyloadDocPage = () => {
  const t = useT();
  const { propsTables } = useLazyloadTableData();

  const demos: DemoCode[] = [
    {
      title: t('lazyload.demo.list'),
      code: '<Lazyload rootMargin="100px" placeholder={<div>Loading...</div>}>\n  <div>Actual content</div>\n</Lazyload>',
      desc: t('lazyload.demoDesc.list'),
    },
    {
      title: t('lazyload.demo.gallery'),
      code: '<div style={{ display: "grid", "grid-template-columns": "1fr 1fr", gap: "8px" }}>\n  <For each={items}>{(item) =>\n    <Lazyload height={100} placeholder={<Skeleton />}>\n      <GalleryCard item={item} />\n    </Lazyload>\n  }</For>\n</div>',
      desc: t('lazyload.demoDesc.gallery'),
    },
    {
      title: t('lazyload.demo.controlled'),
      code: '<Button onClick={() => setLoaded(true)}>Load</Button>\n<Lazyload active={loaded()} placeholder={<Skeleton />}>\n  <div>Loaded content</div>\n</Lazyload>',
      desc: t('lazyload.demoDesc.controlled'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Lazyload</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('lazyload.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
