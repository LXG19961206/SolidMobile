import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useDividerTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const DividerDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useDividerTableData();

  const demos: DemoCode[] = [
    {
      title: t('divider.demo.horizontal'),
      code: '<div>Content above</div>\n<Divider />\n<div>Content below</div>',
      desc: t('divider.demoDesc.horizontal'),
    },
    {
      title: t('divider.demo.text'),
      code: '<Divider text="I am a divider" />\n<Divider text="Or like this" />\n<Divider text="No more content" />',
      desc: t('divider.demoDesc.text'),
    },
    {
      title: t('divider.demo.dashed'),
      code: '<Divider dashed />\n<Divider dashed text="Dashed text" />',
      desc: t('divider.demoDesc.dashed'),
    },
    {
      title: t('divider.demo.color'),
      code: '<Divider color="var(--sc-color-primary, #1677ff)" size={2} />\n<Divider color="#ef4444" text="Red warning" size={2} />\n<Divider color="#22c55e" dashed text="Green dashed" />',
      desc: t('divider.demoDesc.color'),
    },
    {
      title: t('divider.demo.vertical'),
      code: '<div style={{ display: "flex", gap: "12px", "align-items": "center" }}>\n  <span>One</span>\n  <Divider direction="vertical" />\n  <span>Two</span>\n  <Divider direction="vertical" dashed color="var(--sc-color-primary)" />\n  <span>Three</span>\n  <Divider direction="vertical" color="#ef4444" size={2} />\n  <span>Four</span>\n</div>',
      desc: t('divider.demoDesc.vertical'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Divider</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('divider.intro')}</p>

        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
