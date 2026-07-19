import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useCityPickerTableData } from './tableData';
import { CityPickerDesign } from './CityPickerDesign';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const CityPickerDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useCityPickerTableData();

  const demos: DemoCode[] = [
    {
      title: t('citypicker.demo.region'),
      code: 'const cityTree: PickerOption[] = [\n  { text: \'Guangdong\', value: \'gd\', children: [\n    { text: \'Guangzhou\', value: \'gz\', children: [\n      { text: \'Tianhe\', value: \'gz-th\' },\n      { text: \'Yuexiu\', value: \'gz-yx\' },\n    ]},\n    { text: \'Shenzhen\', value: \'sz\', children: [\n      { text: \'Nanshan\', value: \'sz-ns\' },\n      { text: \'Futian\', value: \'sz-ft\' },\n    ]},\n  ]},\n  { text: \'Zhejiang\', value: \'zj\', children: [\n    { text: \'Hangzhou\', value: \'hz\', children: [\n      { text: \'Xihu\', value: \'hz-xh\' },\n    ]},\n  ]},\n];\n\nconst [open, setOpen] = createSignal(false);\nconst [val, setVal] = createSignal<(string | number)[]>([]);\nconst [label, setLabel] = createSignal(\'Select\');\n\n<CellGroup card>\n  <Cell title="Region" value={label()} clickable\n    onClick={() => setOpen(true)} />\n</CellGroup>\n\n<CityPicker\n  columns={cityTree}\n  show={open()}\n  onUpdateShow={setOpen}\n  onConfirm={(v) => {\n    setVal(v);\n    setLabel(v.join(\' / \'));\n    setOpen(false);\n  }}\n  title="Select Region"\n/>',
      desc: t('citypicker.demoDesc.region'),
    },
    {
      title: t('citypicker.demo.autoMode'),
      code: 'const cityTree: PickerOption[] = [/* ... */];\nconst [val, setVal] = createSignal<(string | number)[]>([]);\n\n// Auto mode — no show prop, CityPicker renders its own Cell\n<CellGroup card>\n  <CityPicker\n    columns={cityTree}\n    value={val()}\n    onChange={setVal}\n    placeholder="Please select city"\n  />\n</CellGroup>',
      desc: t('citypicker.demoDesc.autoMode'),
    },
    {
      title: t('citypicker.demo.deepCascade'),
      code: '// 4-level tree: province → city → district → street\nconst deepTree: PickerOption[] = [\n  { text: \'Guangdong\', value: \'gd\', children: [\n    { text: \'Guangzhou\', value: \'gz\', children: [\n      { text: \'Tianhe\', value: \'gz-th\', children: [\n        { text: \'Shipai Street\', value: \'sp\' },\n        { text: \'Liede Street\', value: \'ld\' },\n  ]}]}]}];\n\nconst [open, setOpen] = createSignal(false);\nconst [val, setVal] = createSignal<(string | number)[]>([]);\n\n<CellGroup card>\n  <Cell title="Address" value={val().join(\' / \') || \'Select\'}\n    clickable onClick={() => setOpen(true)} />\n</CellGroup>\n\n<CityPicker\n  columns={deepTree}\n  show={open()}\n  onUpdateShow={setOpen}\n  onConfirm={(v) => { setVal(v); setOpen(false); }}\n  title="Select Address"\n/>',
      desc: t('citypicker.demoDesc.deepCascade'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>CityPicker</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('citypicker.intro')}</p>
        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>

        <CityPickerDesign />
      </div>
    </DocLayout>
  );
};
