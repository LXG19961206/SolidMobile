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
  { label: 'East', value: 'east', children: [
    { label: 'Shanghai', value: 'sh' },
    { label: 'Zhejiang', value: 'zj' },
    { label: 'Jiangsu', value: 'js' },
    { label: 'Anhui', value: 'ah' },
  ]},
  { label: 'South', value: 'south', children: [
    { label: 'Guangdong', value: 'gd' },
    { label: 'Shenzhen', value: 'sz' },
    { label: 'Fujian', value: 'fj' },
  ]},
  { label: 'North', value: 'north', children: [
    { label: 'Beijing', value: 'bj' },
    { label: 'Tianjin', value: 'tj' },
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
    {
      title: t('treeselect.demo.modeExpand'),
      code: '<TreeSelect options={opts}\n  mode="expand"\n/>',
      desc: t('treeselect.demoDesc.modeExpand'),
    },
    {
      title: t('treeselect.demo.customRender'),
      code: `<TreeSelect options={opts}
  renderItem={(node, selected, expand, toggle) => (
    <div onClick={() => toggle?.()}
      style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', cursor: 'pointer' }}>
      <span style={{ flex: 1 }}>{selected ? '✓ ' : ''}{node.label}</span>
      {node.children && (
        <span onClick={(e) => { e.stopPropagation(); expand(); }}
          style={{ padding: '4px 12px', background: '#eee', borderRadius: 4 }}>›</span>
      )}
    </div>
  )}
/>`,
      desc: t('treeselect.demoDesc.customRender'),
    },
    {
      title: t('treeselect.demo.asyncLoad'),
      code: `const loadChildren = (node) => new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      { label: node.label + '-A', value: node.value + '-a' },
      { label: node.label + '-B', value: node.value + '-b' },
    ]);
  }, 800);
});

<TreeSelect options={opts} onLoadChildren={loadChildren} />`,
      desc: t('treeselect.demoDesc.asyncLoad'),
    },
    {
      title: t('treeselect.demo.bigData'),
      code: `// 30 regions × 60 cities = 1,800 options
const bigOpts = Array.from({ length: 30 }, (_, i) => ({
  label: 'Region ' + String.fromCharCode(65 + i),
  value: 'r' + i,
  children: Array.from({ length: 60 }, (_, j) => ({
    label: 'City ' + String.fromCharCode(65 + i) + '-' + (j + 1),
    value: 'c' + i + '-' + (j + 1),
  })),
}));

<TreeSelect options={bigOpts} searchable searchMode="global" placeholder="Type to search" />`,
      desc: t('treeselect.demoDesc.bigData'),
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
