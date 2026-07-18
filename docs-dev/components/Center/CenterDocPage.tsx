import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useCenterTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const CenterDocPage = () => {
  const t = useT();
  const { propsTables } = useCenterTableData();

  const demos: DemoCode[] = [
    {
      title: t('center.demo.default'),
      code: '<Center>\n  <span>Full center</span>\n</Center>',
      desc: t('center.demoDesc.default'),
    },
    {
      title: t('center.demo.flexX'),
      code: '<Center flexX>\n  <span>Horizontal only</span>\n</Center>',
      desc: t('center.demoDesc.flexX'),
    },
    {
      title: t('center.demo.flexY'),
      code: '<div style={{ height: 80 }}>\n  <Center flexY>\n    <span>Vertical center</span>\n  </Center>\n</div>',
      desc: t('center.demoDesc.flexY'),
    },
    {
      title: t('center.demo.inline'),
      code: 'Before <Center flexX inline>\n  <span>Inline Center</span>\n</Center> After',
      desc: t('center.demoDesc.inline'),
    },
    {
      title: t('center.demo.text'),
      code: '<Center text>\n  <div>Centered Title</div>\n  <div>Subtitle text</div>\n</Center>',
      desc: t('center.demoDesc.text'),
    },
    {
      title: t('center.demo.vertical'),
      code: 'Left <Center vertical inline>\n  <span>⭐</span>\n</Center>\nMiddle <Center vertical inline>\n  <span>❤️</span>\n</Center> Right',
      desc: t('center.demoDesc.vertical'),
    },
    {
      title: t('center.demo.position'),
      code: '<div style={{ height: 100 }}>\n  <Center position>\n    <span>Overlay center</span>\n  </Center>\n</div>',
      desc: t('center.demoDesc.position'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Center</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('center.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
