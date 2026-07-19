import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useCardTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const CardDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useCardTableData();

  const demos: DemoCode[] = [
    {
      title: t('card.demo.basic'),
      code: '<Card title="Basic Usage" subtitle="Default card with shadow & border" divider>\n  <div style={{ padding: \'12px\', color: \'#6b7280\' }}>\n    Some content here\n  </div>\n</Card>',
      desc: t('card.demoDesc.basic'),
    },
    {
      title: t('card.demo.noShadow'),
      code: '<Card title="No Shadow" subtitle="Flat style" shadow={false}>\n  <div style={{ padding: \'12px\', color: \'#6b7280\' }}>\n    Flat card\n  </div>\n</Card>',
      desc: t('card.demoDesc.noShadow'),
    },
    {
      title: t('card.demo.noBorder'),
      code: '<Card title="No Border" subtitle="Borderless card" border={false}>\n  <div style={{ padding: \'12px\', color: \'#6b7280\' }}>\n    Borderless card\n  </div>\n</Card>',
      desc: t('card.demoDesc.noBorder'),
    },
    {
      title: t('card.demo.inset'),
      code: '// Parent Card provides the visual frame\n<Card title="Inset Mode" subtitle="Parent controls spacing & style" shadow={false}>\n  {/* Inset Card: transparent, no padding, embedded inside */}\n  <Card inset title="Shipping Info" subtitle="Recipient & address">\n    <div style={{ color: \'#6b7280\', \'font-size\': \'0.85rem\' }}>\n      Name: Zhang San\n      Address: 123 Some Street\n    </div>\n  </Card>\n</Card>',
      desc: t('card.demoDesc.inset'),
    },
    {
      title: t('card.demo.customPadding'),
      code: '<Card title="Custom Padding" subtitle="24px padding" padding={24}>\n  <div style={{ color: \'#6b7280\' }}>\n    Extra-spacious card\n  </div>\n</Card>',
      desc: t('card.demoDesc.customPadding'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Card</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('card.intro')}</p>
        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
