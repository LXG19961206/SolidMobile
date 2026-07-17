import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useIconTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const IconDocPage = () => {
  const t = useT();
  const { propsTables } = useIconTableData();

  const demos: DemoCode[] = [
    {
      title: t('icon.demo.basic'),
      code: `<Icon name="arrow-up" />\n<Icon name="star" variant="fill" />`,
      desc: t('icon.demoDesc.basic'),
    },
    {
      title: t('icon.demo.size'),
      code: `<Icon name="star" size={16} />\n<Icon name="star" size={24} />\n<Icon name="star" size="2rem" />`,
      desc: t('icon.demoDesc.size'),
    },
    {
      title: t('icon.demo.color'),
      code: `<Icon name="heart" color="#fc000a" />\n<Icon name="heart" color="#22c55e" />`,
      desc: t('icon.demoDesc.color'),
    },
    {
      title: t('icon.demo.line'),
      code: `<Icon name="star" variant="line" />\n<Icon name="star" variant="fill" />`,
      desc: t('icon.demoDesc.line'),
    },
    {
      title: t('icon.demo.clickable'),
      code: `<Icon name="search" aria-label="Search" style={{ cursor: 'pointer' }} onClick={() => {}} />`,
      desc: t('icon.demoDesc.clickable'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Icon</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('icon.intro')}</p>
        <PropsAttrs propsTables={propsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
