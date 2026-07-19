import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useCascaderTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const CascaderDocPage = () => {
  const t = useT();
  const { propsTables, optionTables, cssVarsTables } = useCascaderTableData();

  const demos: DemoCode[] = [
    {
      title: t('cascader.demo.region'),
      code: 'const options: CascaderOption[] = [\n  { text: \'Beijing\', value: \'bj\', children: [\n    { text: \'Chaoyang\', value: \'cy\', children: [\n      { text: \'Wangjing\', value: \'wj\' },\n    ]},\n  ]},\n  { text: \'Shanghai\', value: \'sh\', children: [...] },\n];\n\n<CellGroup card>\n  <Cell title="Region" value={val().join(" / ") || "Select"}\n    clickable onClick={() => setShow(true)} />\n</CellGroup>\n\n<Cascader\n  options={options}\n  show={show()}\n  onUpdateShow={setShow}\n  value={val()}\n  onChange={setVal}\n  title="Select Region"\n  closeable\n/>',
      desc: t('cascader.demoDesc.region'),
    },
    {
      title: t('cascader.demo.disabledOption'),
      code: 'const options = [\n  { text: \'Beijing\', value: \'bj\' },\n  { text: \'Shanghai\', value: \'sh\', disabled: true },\n  { text: \'Guangdong\', value: \'gd\' },\n  { text: \'Jiangsu\', value: \'js\', disabled: true },\n];\n\n<CellGroup card>\n  <Cell title="City" value={val().join(" / ") || "Select"}\n    clickable onClick={() => setShow(true)} />\n</CellGroup>\n\n<Cascader\n  options={options}\n  show={show()}\n  onUpdateShow={setShow}\n  title="Cities"\n/>',
      desc: t('cascader.demoDesc.disabledOption'),
    },
    {
      title: t('cascader.demo.customRender'),
      code: 'const options = [\n  { text: \'Beijing\', value: \'bj\',\n    render: (\n      <span style={{ display: \'flex\', gap: \'10px\', \'align-items\': \'center\' }}>\n        <span style={{ \'font-size\': \'1.3rem\' }}>🏯</span>\n        <span style={{ flex: 1 }}>\n          <span style={{ \'font-weight\': 600 }}>Beijing</span>\n          <span style={{ \'font-size\': \'0.7rem\', color: \'#9ca3af\', display: \'block\' }}>\n            Capital · Pop 21.5M\n          </span>\n        </span>\n        <span style={{\n          background: \'#fef3c7\', color: \'#d97706\',\n          padding: \'2px 8px\', \'border-radius\': \'10px\',\n          \'font-size\': \'0.7rem\', \'font-weight\': 600\n        }}>N China</span>\n      </span>\n    ),\n  },\n  // ...\n];\n\n<CellGroup card>\n  <Cell title="Province" value={val().join(" / ") || "Select"}\n    clickable onClick={() => setShow(true)} />\n</CellGroup>\n\n<Cascader\n  options={options}\n  show={show()}\n  onUpdateShow={setShow}\n  checkmark={<Icon name="check" size={16} color="var(--sc-color-primary)" />}\n/>',
      desc: t('cascader.demoDesc.customRender'),
    },
    {
      title: t('cascader.demo.asyncLoad'),
      code: 'const loadChildren = async (option: CascaderOption) => {\n  await new Promise(r => setTimeout(r, 1000));\n  const map: Record<string, CascaderOption[]> = {\n    __root__: [\n      { text: \'Beijing\', value: \'bj\' },\n      { text: \'Shanghai\', value: \'sh\' },\n    ],\n    bj: [{ text: \'Chaoyang\', value: \'cy\' }],\n  };\n  return map[String(option.value)] || [];\n};\n\n<CellGroup card>\n  <Cell title="Region" value={val().join(" → ") || "Select"}\n    clickable onClick={() => setShow(true)} />\n</CellGroup>\n\n<Cascader\n  options={[]}\n  onLoadChildren={loadChildren}\n  show={show()}\n  onUpdateShow={setShow}\n  title="Async Load Region"\n  closeable\n  loading={<div style="text-align:center;padding:32px">\n    <Loading size={24} />\n    <div>Loading...</div>\n  </div>}\n/>',
      desc: t('cascader.demo.asyncLoad'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Cascader</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('cascader.intro')}</p>
        <PropsAttrs propsTables={[...propsTables, ...optionTables]} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
