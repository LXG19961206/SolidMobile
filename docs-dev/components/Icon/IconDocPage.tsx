import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import { IconLibrary } from './IconLibrary';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useIconTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const IconDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useIconTableData();

  const demos: DemoCode[] = [
    {
      title: t('icon.demo.basic'),
      code: `<Icon name="star" variant="fill" color="#1677ff" />\n<Icon name="heart" variant="fill" color="#fc000a" />\n<Icon name="sun" variant="fill" color="#f59e0b" />`,
      desc: t('icon.demoDesc.basic'),
    },
    {
      title: t('icon.demo.size'),
      code: `<Icon name="star" variant="fill" color="#1677ff" size={16} />\n<Icon name="star" variant="fill" color="#1677ff" size={24} />\n<Icon name="star" variant="fill" color="#1677ff" size={36} />`,
      desc: t('icon.demoDesc.size'),
    },
    {
      title: t('icon.demo.color'),
      code: `<Icon name="heart" variant="fill" size={24} color="#fc000a" />\n<Icon name="heart" variant="fill" size={24} color="#22c55e" />\n<Icon name="heart" variant="fill" size={24} color="#1677ff" />`,
      desc: t('icon.demoDesc.color'),
    },
    {
      title: t('icon.demo.line'),
      code: `<Icon name="star" size={24} color="#f59e0b" variant="line" />\n<Icon name="star" size={24} color="#f59e0b" variant="fill" />`,
      desc: t('icon.demoDesc.line'),
    },
    {
      title: t('icon.demo.clickable'),
      code: `<Icon name="close" aria-label="Close" size={24} style={{ cursor: 'pointer', color: '#6b7280' }} />\n<Icon name="settings" aria-label="Settings" size={24} style={{ cursor: 'pointer', color: '#1677ff' }} />`,
      desc: t('icon.demoDesc.clickable'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Icon</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('icon.intro')}</p>

        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('icon.library.title')}</h2>
        <p style={{ 'font-size': '0.85rem', color: '#6b7280', margin: '0 0 16px' }}>{t('icon.library.desc')}</p>
        <IconLibrary />
      </div>
    </DocLayout>
  );
};
