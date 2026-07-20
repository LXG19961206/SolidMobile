import { For } from 'solid-js'; import { useT, registerLocale } from '../../doc-i18n'; import { DocLayout, PropsAttrs } from '../../doc-utils'; import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout'; import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN'; import enUS from './en-US'; import { useSelectTableData } from './tableData';
import { SelectDesign } from './SelectDesign';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
export const SelectDocPage = () => {
  const t = useT(); const { propsTables, cssVarsTables } = useSelectTableData();
  const demos: DemoCode[] = [
    { title: t('select.demo.basic'), code: 'const opts = [\n  { text: \'Beijing\', value: \'bj\' },\n  { text: \'Shanghai\', value: \'sh\' },\n  { text: \'Guangzhou\', value: \'gz\' },\n];\nconst [show, setShow] = createSignal(false);\nconst [val, setVal] = createSignal<string | number>(\'\');\n\n<CellGroup card>\n  <Cell title="City" value={val() || \'Select\'}\n    clickable onClick={() => setShow(true)} />\n</CellGroup>\n\n<Select show={show()} onUpdateShow={setShow}\n  options={opts} value={val()} onChange={setVal}\n  onConfirm={(v) => { setVal(v); setShow(false); }}\n  title="Select City"\n/>', desc: t('select.demoDesc.basic') },
    { title: t('select.demo.customRender'), code: 'const opts = [\n  { text: \'SolidJS\', value: \'solid\',\n    render: <span style={{display:\'flex\',gap:\'8px\'}}>◈ SolidJS</span> },\n  { text: \'React\', value: \'react\',\n    render: <span style={{display:\'flex\',gap:\'8px\'}}>◇ React</span> },\n];\n\n<Select show={show()} onUpdateShow={setShow}\n  options={opts}\n  onConfirm={(v) => { setVal(v); setShow(false); }}\n  title="Framework"\n/>', desc: t('select.demoDesc.customRender') },
    { title: t('select.demo.form'), code: '<Form controlAlign="right" onSubmit={(v) => console.log(v)}>\n  <FormItem name="city" label="City">\n    <Select options={[\n      { text: \'Beijing\', value: \'bj\' },\n      { text: \'Shanghai\', value: \'sh\' },\n    ]} />\n  </FormItem>\n  <div style={{ padding: \'12px 1rem\' }}><Button type="primary" block nativeType="submit" text="Submit" /></div>\n</Form>', desc: t('select.demoDesc.form') },
  ];
  return (<DocLayout><div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
    <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Select</h1>
    <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('select.intro')}</p>
    <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
    <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
    <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
    <SelectDesign />
  </div></DocLayout>);
};
