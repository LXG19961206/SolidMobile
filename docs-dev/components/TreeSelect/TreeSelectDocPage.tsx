import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useTreeSelectTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const opts = [
  { label: '华东', value: 'east', children: [
    { label: '上海', value: 'sh' },
    { label: '浙江', value: 'zj' },
    { label: '江苏', value: 'js' },
    { label: '安徽', value: 'ah' },
  ]},
  { label: '华南', value: 'south', children: [
    { label: '广东', value: 'gd' },
    { label: '深圳', value: 'sz' },
    { label: '福建', value: 'fj' },
  ]},
  { label: '华北', value: 'north', children: [
    { label: '北京', value: 'bj' },
    { label: '天津', value: 'tj' },
  ]},
];

export const TreeSelectDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useTreeSelectTableData();

  const demos: DemoCode[] = [
    {
      title: t('treeselect.demo.basic'),
      code: `const opts = [
  { label: 'East', value: 'east', children: [
    { label: 'Shanghai', value: 'sh' },
    { label: 'Zhejiang', value: 'zj' },
  ]},
  { label: 'South', value: 'south', children: [...] },
];

<TreeSelect options={opts} value={sel} onChange={setSel} />`,
      desc: t('treeselect.demoDesc.basic'),
    },
    {
      title: t('treeselect.demo.maxLimit'),
      code: '<TreeSelect options={opts} max={3} />',
      desc: t('treeselect.demoDesc.maxLimit'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>TreeSelect</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('treeselect.intro')}</p>
        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
