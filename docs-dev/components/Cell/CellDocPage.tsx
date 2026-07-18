import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useCellTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const CellDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useCellTableData();

  const demos: DemoCode[] = [
    {
      title: t('cell.demo.basic'),
      code: '<CellGroup title="Basic Info">\n  <Cell title="Username" value="John" />\n  <Cell title="Phone" value="138****8888" />\n  <Cell title="Bio" description="A brief description" />\n</CellGroup>',
      desc: t('cell.demoDesc.basic'),
    },
    {
      title: t('cell.demo.clickable'),
      code: '<CellGroup title="Settings">\n  <Cell title="Profile" icon="user" clickable />\n  <Cell title="Notifications" icon="bell" clickable value="Enabled" />\n  <Cell title="Security" icon="shield" clickable />\n</CellGroup>',
      desc: t('cell.demoDesc.clickable'),
    },
    {
      title: t('cell.demo.form'),
      code: '<Cell title="Username" required value="John" description="6-20 characters" />\n<Cell title="Password" required value="Enter password" description="At least 8 chars" />',
      desc: t('cell.demoDesc.form'),
    },
    {
      title: t('cell.demo.card'),
      code: '<CellGroup title="About" card>\n  <Cell title="Version" value="1.0.0" />\n  <Cell title="License" value="MIT" clickable />\n</CellGroup>',
      desc: t('cell.demoDesc.card'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Cell / CellGroup</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('cell.intro')}</p>

        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
