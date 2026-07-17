import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useButtonTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const ButtonDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useButtonTableData();

  const demos: DemoCode[] = [
    { title: t('button.demo.types'), code: `<Button type="primary">Primary</Button>\n<Button type="success">Success</Button>\n<Button type="danger">Danger</Button>`, desc: t('button.demoDesc.button_types') },
    { title: t('button.demo.sizes'), code: `<Button size="xs">XS</Button>\n<Button size="sm">SM</Button>\n<Button size="md">MD</Button>\n<Button size="lg">LG</Button>`, desc: t('button.demoDesc.button_sizes') },
    { title: t('button.demo.variant'), code: `<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>` },
    { title: t('button.demo.icon'), code: `<Button icon="star">Favorite</Button>\n<Button icon="arrow-right" iconPosition="right">Next</Button>` },
    { title: t('button.demo.loading'), code: `<Button type="primary" loading>Submitting...</Button>\n<Button disabled>Disabled</Button>` },
    { title: t('button.demo.block'), code: `<Button block round type="primary">Block Round</Button>` },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Button</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('button.intro')}</p>
        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
